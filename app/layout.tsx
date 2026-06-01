import type { Metadata } from 'next';
import '@/styles/globals.css';
import { siteConfig } from '@/lib/site-config';
import { JsonLd } from '@/components/JsonLd';
import { organizationSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.tagline} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.name} builds ${siteConfig.predicate}. Zapier Certified Solutions Partner and Attio Expert Partner.`,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder.name }],
  creator: siteConfig.founder.name,
  publisher: siteConfig.name,
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
  },


    icons: {
    icon: '/images/icon.png',
    apple: '/images/favicon.png',
  },


};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-black">
        <JsonLd data={organizationSchema()} />
        {children}
      </body>
    </html>
  );
}