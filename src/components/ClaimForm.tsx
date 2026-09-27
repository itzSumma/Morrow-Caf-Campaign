"use client";

import { useState, useRef, FormEvent, ChangeEvent, FocusEvent } from "react";
import { CAMPAIGN_DETAILS } from "@/lib/constants";

interface FormErrors {
  name?: string;
  phone?: string;
}

type ValidationStatus = "idle" | "error" | "valid";

export default function ClaimForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ name: boolean; phone: boolean }>({
    name: false,
    phone: false,
  });
  const [status, setStatus] = useState<ValidationStatus>("idle");

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
    // Check for letters, spaces, hyphens, and apostrophes
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

    // Strip non-digits
    const cleanDigits = trimmed.replace(/\D/g, "");

    // Must be 10 digits (or 12 digits if includes +91 country code)
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

    // Standard mobile number prefix validation (6-9)
    if (!/^[6-9]\d{9}$/.test(tenDigits)) {
      return "Please enter a valid 10-digit mobile number (e.g. 9876543210).";
    }

    // Reject obviously invalid repeating digits like 0000000000 or 9999999999
    if (/^(\d)\1{9}$/.test(tenDigits)) {
      return "Please enter a genuine phone number.";
    }

    return undefined;
  };

  // Handle Input Changes
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (status === "valid") setStatus("idle");
    if (touched.name) {
      const error = validateName(value);
      setErrors((prev) => ({ ...prev, name: error }));
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (status === "valid") setStatus("idle");
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

  // Handle Form Submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({ name: true, phone: true });

    const nameError = validateName(name);
    const phoneError = validatePhone(phone);

    if (nameError || phoneError) {
      setErrors({ name: nameError, phone: phoneError });
      setStatus("error");

      // Set focus to the first invalid field for keyboard & screen reader accessibility
      if (nameError) {
        nameInputRef.current?.focus();
      } else if (phoneError) {
        phoneInputRef.current?.focus();
      }
      return;
    }

    // Valid inputs
    setErrors({});
    setStatus("valid");

    // Phase 4 will handle the actual API dispatch (/api/claim)
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-surface-md border border-cream-border/80 bg-cream p-5 sm:p-6 transition-all"
      aria-label="Claim Offer Form"
    >
      {/* Live Region for Screen Readers */}
      <div aria-live="polite" className="sr-only">
        {status === "error" && "The form has errors. Please check the highlighted fields below."}
        {status === "valid" && "Form validation passed. Ready for submission."}
      </div>

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
            placeholder="e.g. Rahul Sharma"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full rounded-surface-sm border bg-cream-light px-3.5 py-2.5 text-base sm:text-sm text-espresso placeholder:text-latte-light transition-all focus:outline-none focus:ring-2 ${
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
            placeholder="e.g. 9876543210"
            value={phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
            className={`w-full rounded-surface-sm border bg-cream-light px-3.5 py-2.5 text-base sm:text-sm text-espresso placeholder:text-latte-light transition-all focus:outline-none focus:ring-2 ${
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

      {/* Validation Success Indicator (Phase 3 validation confirmation before Phase 4 API) */}
      {status === "valid" && (
        <div
          role="status"
          className="rounded-surface-sm border border-emerald-200 bg-emerald-50/80 p-3 text-xs text-emerald-800 flex items-center gap-2"
        >
          <svg className="h-4 w-4 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            Inputs validated successfully. (Ready for Phase 4 API submission)
          </span>
        </div>
      )}

      {/* Submit Action Button */}
      <button
        type="submit"
        className="w-full rounded-full bg-caramel py-3.5 text-sm font-semibold text-white shadow-md shadow-caramel/20 transition-all hover:bg-caramel-hover hover:shadow-lg active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-caramel/30 cursor-pointer mt-2"
      >
        {CAMPAIGN_DETAILS.primaryCtaText}
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
          One voucher per guest • Valid at Sector 104, Noida
        </p>
      </div>
    </form>
  );
}
