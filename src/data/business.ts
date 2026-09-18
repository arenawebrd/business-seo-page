import { siteConfig } from '../config/site';

export const business = {
  name: siteConfig.businessName,
  legalName: siteConfig.legalName,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  founded: siteConfig.founded,
  jobsCompleted: siteConfig.jobsCompleted,
  licenseNumber: siteConfig.licenseNumber,
  address: siteConfig.address,
  phone: siteConfig.contact.phoneDisplay,
  phoneE164: siteConfig.contact.phoneE164,
  email: siteConfig.contact.email,
  hours: siteConfig.hours,
  serviceAreas: siteConfig.serviceAreas,
  socials: siteConfig.social,
  review: siteConfig.review,
  siteUrl: siteConfig.siteUrl,
} as const;

export type Business = typeof business;
