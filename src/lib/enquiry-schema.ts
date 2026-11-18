import { z } from "zod";
import { publishedServices } from "@/data/services";

/** Service choices offered in the enquiry form. "not-sure" is always available. */
export const serviceOptions = [
  ...publishedServices.map((s) => ({ value: s.slug, label: s.title })),
  { value: "not-sure", label: "Not sure yet" },
] as const;

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

/**
 * Shared by the browser form (instant feedback) and the API route (authoritative check).
 * PRD §12: client-side validation is never relied on alone.
 */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100, "Keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your work email.")
    .max(200)
    .pipe(z.email("Enter a valid email address, like name@company.com.")),
  service: z.enum(serviceValues, { error: "Choose the service you’re interested in." }),
  company: z.string().trim().max(200, "Keep this under 200 characters.").optional().default(""),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(4000, "Keep your summary under 4,000 characters."),
  consent: z.literal(true, { error: "Please confirm so we can reply to your enquiry." }),
  /** Honeypot, real users never see or fill this. */
  nickname: z.string().max(200).optional().default(""),
  /** Epoch ms when the form first rendered; submissions faster than a human can type are rejected. */
  startedAt: z.number().int().optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryData, string>>;

export function flattenErrors(error: z.ZodError): EnquiryFieldErrors {
  const out: EnquiryFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof EnquiryData | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
