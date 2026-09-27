import { NextRequest, NextResponse } from "next/server";
import type { ClaimApiResponse, ClaimPayload } from "@/types/campaign";

// In-memory duplicate prevention (tracks normalized 10-digit phone numbers)
const claimedPhones = new Set<string>();

// In-memory rate limiting map: ip -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Generate unique alphanumeric claim code (e.g., MORROW-7F2K)
function generateClaimCode(): string {
  // Avoid visually ambiguous characters like 0/O, 1/I
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let randomCode = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomCode += chars[randomIndex];
  }
  return `MORROW-${randomCode}`;
}

export async function POST(request: NextRequest): Promise<NextResponse<ClaimApiResponse>> {
  try {
    // 1. Rate Limiting Check
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const now = Date.now();
    const rateLimit = rateLimitMap.get(ip);

    if (rateLimit && now < rateLimit.resetTime) {
      if (rateLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            success: false,
            message: "Too many requests. Please wait a moment before trying again.",
          },
          { status: 429 }
        );
      }
      rateLimit.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    // 2. Parse Request Body
    let body: Partial<ClaimPayload>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to process your request. Invalid request format.",
        },
        { status: 400 }
      );
    }

    const { name, phone } = body;

    // 3. Server-side Validation
    const trimmedName = typeof name === "string" ? name.trim() : "";
    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 60) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid name (between 2 and 60 characters).",
        },
        { status: 400 }
      );
    }

    const rawPhone = typeof phone === "string" ? phone.trim() : "";
    const cleanDigits = rawPhone.replace(/\D/g, "");
    let tenDigits = cleanDigits;
    if (cleanDigits.length === 12 && cleanDigits.startsWith("91")) {
      tenDigits = cleanDigits.slice(2);
    }

    if (tenDigits.length !== 10 || !/^[6-9]\d{9}$/.test(tenDigits)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid 10-digit mobile number.",
        },
        { status: 400 }
      );
    }

    // 4. Duplicate Claims Check (Product Thinking Decision 2)
    if (claimedPhones.has(tenDigits)) {
      return NextResponse.json(
        {
          success: false,
          message: "This phone number has already claimed the offer.",
        },
        { status: 400 }
      );
    }

    // 5. Successful Claim Generation
    claimedPhones.add(tenDigits);
    const claimCode = generateClaimCode();

    return NextResponse.json(
      {
        success: true,
        claimCode,
        message: "Your offer has been claimed.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing claim:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to process your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
