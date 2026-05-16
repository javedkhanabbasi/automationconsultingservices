import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ServiceDetailPage from '@/components/ServiceDetailPage';
import { getService } from '@/content/services';

const service = getService('sales-automation')!;

export const metadata: Metadata = buildMetadata({
  title: `${service.name} | Automation Consulting Services`,
  description: service.shortDesc,
  path: `/services/sales-automation`,
});

export default function Page() {
  return <ServiceDetailPage service={service} />;
}
