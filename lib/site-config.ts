export const siteConfig = {
  name: 'Automation Consulting Services',
  shortName: 'ACS',
  domain: 'automationconsultingservices.org',
  url: 'https://automationconsultingservices.org',

  predicate: 'operations infrastructure built with engineering discipline for $1M-$10M operators',
  tagline: 'Engineering discipline. Applied to your operations.',

  founder: {
    name: 'Matthew Piwko',
    shortName: 'Matt Piwko',
    role: 'Founder & Lead Automation Architect',
    background: '10+ years software development',
    location: 'United States',
    linkedin: 'https://www.linkedin.com/in/matthew-piwko-6159b1122',
    email: '[email protected]',
  },

  stats: {
    workflows: '500+',
    hoursReclaimed: '10,000+',
    clientSavings: '$2M+',
    industries: '8',
  },

  nav: [
    { label: 'Services', href: '/services' },
    { label: 'CRM', href: '/crm' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/blog' },
    { label: 'About', href: '/about' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
