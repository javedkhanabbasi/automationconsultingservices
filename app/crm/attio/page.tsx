import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import CrmPlatformPage from '@/components/CrmPlatformPage';
import { getCrm } from '@/content/crm';

const platform = getCrm('attio')!;

export const metadata: Metadata = buildMetadata({
  title: `${platform.name} Implementation | Automation Consulting Services`,
  description: `${platform.name} implementation, migration, and architecture. ${platform.tagline}`,
  path: `/crm/attio`,
});

export default function Page() {
  return <CrmPlatformPage platform={platform} />;
}
