export interface ClaimPayload {
  name: string;
  phone: string;
}

export interface ClaimSuccessResponse {
  success: true;
  claimCode: string;
  message: string;
}

export interface ClaimErrorResponse {
  success: false;
  message: string;
}

export type ClaimApiResponse = ClaimSuccessResponse | ClaimErrorResponse;

export interface CampaignStep {
  step: number;
  title: string;
  description: string;
}

export interface CampaignDetails {
  title: string;
  location: string;
  discountAmount: number;
  discountDisplay: string;
  primaryCtaText: string;
  tagline: string;
  valueProposition: string;
}
