import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ServiceDetailPage from '@/components/ServiceDetailPage';
import { getService } from '@/content/services';

const service = getService('integration-builds')!;

export const metadata: Metadata = buildMetadata({
  title: `${service.name} | Automation Consulting Services`,
  description: service.shortDesc,
  path: `/services/integration-builds`,
});

export default function Page() {
  return <ServiceDetailPage service={service} />;
}
