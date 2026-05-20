import LeadsTable from '@/components/admin/LeadsTable';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin · OmniBooking CRM',
  description: 'Panel de gestión de leads y base de datos SQLite',
};

export default function AdminPage() {
  return <LeadsTable />;
}
