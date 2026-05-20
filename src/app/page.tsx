// src/app/admin/page.tsx
import LeadsTable from '@/components/admin/LeadsTable';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin · OmniBooking CRM',
  description: 'Panel de gestión de leads y base de datos SQLite',
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#0B132B] p-6">
      <LeadsTable />
    </div>
  );
}
