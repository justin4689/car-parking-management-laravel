import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface CustomerShowProps {
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    created_at?: string | null;
    updated_at?: string | null;
  };
}

export default function CustomerShow({ customer }: CustomerShowProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Customers', href: '/customers' },
    { title: `Customer #${customer.id}`, href: `/customers/${customer.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Customer: ${customer.name}`} />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Customer Details</h1>
          <Button asChild variant="outline">
            <Link href="/customers">Back</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-2">
          <div>
            <div className="text-xs text-gray-500">Name</div>
            <div className="text-sm font-medium">{customer.name}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Email</div>
            <div className="text-sm font-medium">{customer.email}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Phone</div>
            <div className="text-sm font-medium">{customer.phone}</div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-xs text-gray-500">Address</div>
            <div className="text-sm font-medium">{customer.address}</div>
          </div>
          {customer.created_at && (
            <div>
              <div className="text-xs text-gray-500">Created</div>
              <div className="text-sm font-medium">{customer.created_at}</div>
            </div>
          )}
          {customer.updated_at && (
            <div>
              <div className="text-xs text-gray-500">Updated</div>
              <div className="text-sm font-medium">{customer.updated_at}</div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
