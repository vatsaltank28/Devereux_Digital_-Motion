import type { Testimonial } from "./types";

/**
 * TESTIMONIALS, intentionally empty.
 *
 * Publish only genuine, written-permission feedback (PRD §9 S07). Components render nothing
 * while this list has no approved entries, so no section appears with fabricated quotes.
 */
export const testimonials: Testimonial[] = [];

export const approvedTestimonials = testimonials
  .filter((t) => t.approvedForPublication)
  .sort((a, b) => a.sortOrder - b.sortOrder);

export function getTestimonialsForService(serviceSlug: string): Testimonial[] {
  return approvedTestimonials.filter((t) => !t.serviceSlugs || t.serviceSlugs.includes(serviceSlug));
}
