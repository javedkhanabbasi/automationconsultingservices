import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ServiceDetailPage from '@/components/ServiceDetailPage';
import { getService } from '@/content/services';

const service = getService('admin-workflows')!;

export const metadata: Metadata = buildMetadata({
  title: `${service.name} | Automation Consulting Services`,
  description: service.shortDesc,
  path: `/services/admin-workflows`,
});

export default function Page() {
  return <ServiceDetailPage service={service} />;
}
