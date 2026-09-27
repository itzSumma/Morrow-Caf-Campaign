"use client";

import { useState, useRef, FormEvent, ChangeEvent, FocusEvent } from "react";
import { CAMPAIGN_DETAILS } from "@/lib/constants";
import type { ClaimApiResponse, ClaimPayload } from "@/types/campaign";

interface FormErrors {
  name?: string;
  phone?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function ClaimForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ name: boolean; phone: boolean }>({
    name: false,
    phone: false,
  });

  const [formState, setFormState] = useState<FormState>("idle");
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [claimCode, setClaimCode] = useState("");
  const [copied, setCopied] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Validate Name
  const validateName = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "Please enter your full name.";
    }
    if (trimmed.length < 2) {
      return "Name must be at least 2 characters long.";
    }
    if (trimmed.length > 60) {
      return "Name cannot exceed 60 characters.";
    }
    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    if (!nameRegex.test(trimmed)) {
      return "Name should only contain letters and standard punctuation.";
    }
    return undefined;
  };

  // Validate Phone Number
  const validatePhone = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "Please enter your phone number.";
    }

    const cleanDigits = trimmed.replace(/\D/g, "");
    let tenDigits = cleanDigits;
    if (cleanDigits.length === 12 && cleanDigits.startsWith("91")) {
      tenDigits = cleanDigits.slice(2);
    }

    if (tenDigits.length < 10) {
      return "Please enter a complete 10-digit phone number.";
    }
    if (tenDigits.length > 10) {
      return "Phone number should not exceed 10 digits.";
    }

    if (!/^[6-9]\d{9}$/.test(tenDigits)) {
      return "Please enter a valid 10-digit mobile number (e.g. 9876543210).";
    }

    if (/^(\d)\1{9}$/.test(tenDigits)) {
      return "Please enter a genuine phone number.";
    }

    return undefined;
  };

  // Handle Input Changes
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (formState === "error") {
      setFormState("idle");
      setApiErrorMessage("");
    }
    if (touched.name) {
      const error = validateName(value);
      setErrors((prev) => ({ ...prev, name: error }));
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (formState === "error") {
      setFormState("idle");
      setApiErrorMessage("");
    }
    if (touched.phone) {
      const error = validatePhone(value);
      setErrors((prev) => ({ ...prev, phone: error }));
    }
  };

  // Handle Input Blur for progressive validation
  const handleNameBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, name: true }));
    const error = validateName(e.target.value);
    setErrors((prev) => ({ ...prev, name: error }));
  };

  const handlePhoneBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, phone: true }));
    const error = validatePhone(e.target.value);
    setErrors((prev) => ({ ...prev, phone: error }));
  };

  // Handle Form Submission & API Integration (POST /api/claim)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent duplicate submissions while in-flight
    if (formState === "submitting") return;

    setTouched({ name: true, phone: true });
    setApiErrorMessage("");

    const nameError = validateName(name);
    const phoneError = validatePhone(phone);

    if (nameError || phoneError) {
      setErrors({ name: nameError, phone: phoneError });
      setFormState("idle");

      if (nameError) {
        nameInputRef.current?.focus();
      } else if (phoneError) {
        phoneInputRef.current?.focus();
      }
      return;
    }

    // Begin Submitting State
    setErrors({});
    setFormState("submitting");

    try {
      const payload: ClaimPayload = {
        name: name.trim(),
        phone: phone.trim(),
      };

      const response = await fetch("/api/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ClaimApiResponse;

      if (response.ok && data.success) {
        setClaimCode(data.claimCode);
        setFormState("success");
      } else {
        setApiErrorMessage(
          data.message || "Unable to process your request. Please try again."
        );
        setFormState("error");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setApiErrorMessage(
        "Network connection error. Please check your internet and try again."
      );
      setFormState("error");
    }
  };

  // Copy Claim Code to Clipboard
  const handleCopyCode = async () => {
    if (!claimCode) return;
    try {
      await navigator.clipboard.writeText(claimCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Reset Form
  const handleReset = () => {
    setName("");
    setPhone("");
    setErrors({});
    setTouched({ name: false, phone: false });
    setFormState("idle");
    setApiErrorMessage("");
    setClaimCode("");
    setCopied(false);
  };

  // ==========================================
  // SUCCESS UI (Phase 4 Deliverable)
  // ==========================================
  if (formState === "success") {
    return (
      <div
        className="rounded-surface-md border border-cream-border/80 bg-cream p-6 sm:p-8 text-center animate-fadeIn"
        role="region"
        aria-label="Claim Confirmation"
      >
        {/* Live Region for Screen Readers */}
        <div aria-live="polite" className="sr-only">
          Your offer has been claimed successfully. Your claim code is {claimCode}.
        </div>

        {/* Success Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        {/* Offer Claimed Heading */}
        <span className="inline-block rounded-full bg-caramel-light px-3 py-1 text-xs font-semibold text-caramel mb-2">
          {CAMPAIGN_DETAILS.discountDisplay} Claimed
        </span>
        <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-espresso tracking-tight">
          Your Offer is Ready!
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-latte max-w-sm mx-auto leading-relaxed">
          Show this unique code to our barista upon ordering at Morrow Café in Sector 104, Noida.
        </p>

        {/* Unique Claim Code Display */}
        <div className="mt-6 rounded-surface-sm border border-dashed border-caramel/50 bg-cream-light p-4 max-w-xs mx-auto">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-latte mb-1">
            Your Exclusive Claim Code
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-wider text-caramel select-all">
            {claimCode}
          </span>
        </div>

        {/* Copy Code Button */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleCopyCode}
            aria-label="Copy claim code to clipboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-6 py-2.5 text-xs sm:text-sm font-semibold text-cream-light shadow-sm transition-all hover:bg-mocha hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-caramel/40"
          >
            {copied ? (
              <>
                <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Code Copied!</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4 text-cream-subtle" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                <span>Copy Code</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-cream-border bg-cream-light px-5 py-2.5 text-xs sm:text-sm font-medium text-latte hover:text-espresso hover:bg-cream-border/40 transition-colors"
          >
            Claim Another
          </button>
        </div>

        {/* Location Notice */}
        <p className="mt-6 text-[11px] text-latte border-t border-cream-border/60 pt-4">
          📍 Morrow Café • Sector 104, Noida
        </p>
      </div>
    );
  }

  // ==========================================
  // IDLE / SUBMITTING / ERROR FORM UI
  // ==========================================
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-surface-md border border-cream-border/80 bg-cream p-5 sm:p-6 transition-all"
      aria-label="Claim Offer Form"
    >
      {/* Live Region for Screen Readers */}
      <div aria-live="polite" className="sr-only">
        {formState === "error" && apiErrorMessage}
        {formState === "submitting" && "Submitting your claim request, please wait..."}
      </div>

      {/* Global Server/API Error Alert */}
      {formState === "error" && apiErrorMessage && (
        <div
          role="alert"
          className="rounded-surface-sm border border-rose-200 bg-rose-50/90 p-3.5 text-xs text-rose-800 flex items-start gap-2.5 animate-fadeIn"
        >
          <svg className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1 font-medium leading-relaxed">
            {apiErrorMessage}
          </div>
        </div>
      )}

      {/* Full Name Field */}
      <div>
        <label
          htmlFor="claim-name"
          className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1.5"
        >
          Full Name <span aria-hidden="true" className="text-caramel font-bold">*</span>
        </label>
        <div className="relative">
          <input
            ref={nameInputRef}
            id="claim-name"
            name="name"
            type="text"
            autoComplete="name"
            disabled={formState === "submitting"}
            placeholder="e.g. Rahul Sharma"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full rounded-surface-sm border bg-cream-light px-3.5 py-2.5 text-base sm:text-sm text-espresso placeholder:text-latte-light transition-all focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.name
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
                : "border-cream-border focus:border-caramel focus:ring-caramel/20"
            }`}
          />
        </div>
        {errors.name && (
          <p
            id="name-error"
            role="alert"
            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 font-medium animate-fadeIn"
          >
            <svg
              className="h-3.5 w-3.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.name}
          </p>
        )}
      </div>

      {/* Phone Number Field */}
      <div>
        <label
          htmlFor="claim-phone"
          className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1.5"
        >
          Phone Number <span aria-hidden="true" className="text-caramel font-bold">*</span>
        </label>
        <div className="relative">
          <input
            ref={phoneInputRef}
            id="claim-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            disabled={formState === "submitting"}
            placeholder="e.g. 9876543210"
            value={phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
            className={`w-full rounded-surface-sm border bg-cream-light px-3.5 py-2.5 text-base sm:text-sm text-espresso placeholder:text-latte-light transition-all focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.phone
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
                : "border-cream-border focus:border-caramel focus:ring-caramel/20"
            }`}
          />
        </div>
        {errors.phone ? (
          <p
            id="phone-error"
            role="alert"
            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 font-medium animate-fadeIn"
          >
            <svg
              className="h-3.5 w-3.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.phone}
          </p>
        ) : (
          <p id="phone-hint" className="mt-1 text-[11px] text-latte">
            We’ll display your voucher code instantly on screen.
          </p>
        )}
      </div>

      {/* Submit Action Button */}
      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full rounded-full bg-caramel py-3.5 text-sm font-semibold text-white shadow-md shadow-caramel/20 transition-all hover:bg-caramel-hover hover:shadow-lg active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-caramel/30 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
      >
        {formState === "submitting" ? (
          <>
            <svg
              className="h-4 w-4 animate-spin text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>Claiming Offer...</span>
          </>
        ) : (
          <span>{CAMPAIGN_DETAILS.primaryCtaText}</span>
        )}
      </button>

      {/* Trust & Guarantee Note */}
      <div className="pt-2 text-center">
        <p className="text-[11px] text-latte flex items-center justify-center gap-1.5">
          <svg className="h-3.5 w-3.5 text-caramel flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          One claim per phone number • Valid at Sector 104, Noida
        </p>
      </div>
    </form>
  );
}
