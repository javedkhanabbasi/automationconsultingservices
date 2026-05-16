import type { Metadata } from 'next';
import { siteConfig } from './site-config';

export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${siteConfig.url}${input.path}`;
  const images = input.image ? [{ url: input.image }] : undefined;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      ...(images && { images }),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      ...(input.image && { images: [input.image] }),
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    founder: {
      '@type': 'Person',
      name: siteConfig.founder.name,
    },
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.role,
    worksFor: { '@id': `${siteConfig.url}#organization` },
    url: siteConfig.founder.linkedin,
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.publishedTime,
    dateModified: input.modifiedTime || input.publishedTime,
    author: {
      '@type': 'Person',
      name: input.author || siteConfig.founder.name,
    },
    publisher: { '@id': `${siteConfig.url}#organization` },
    mainEntityOfPage: `${siteConfig.url}/blog/${input.slug}`,
  };
}

export function serviceSchema(input: { name: string; description: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: input.name,
    name: input.name,
    description: input.description,
    provider: { '@id': `${siteConfig.url}#organization` },
    url: `${siteConfig.url}/${input.slug}`,
  };
}
