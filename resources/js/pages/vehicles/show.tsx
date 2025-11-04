import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface VehicleShowProps {
  vehicle: {
    id: number;
    plate_number: string;
    color: string;
    brand: string;
    model: string;
    category: Category;
    customer: Customer;
    created_at?: string | null;
    updated_at?: string | null;
  };
  
}


  
interface Category {
    id: number;
    name: string;
}

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}


  


export default function VehicleShow({ vehicle }: VehicleShowProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Vehicles', href: '/vehicles' },
    { title: `Vehicle #${vehicle.id}`, href: `/vehicles/${vehicle.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Vehicle: ${vehicle.plate_number}`} />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Vehicle Details</h1>
          <Button asChild variant="outline">
            <Link href="/vehicles">Back</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-2">
       
          <div>
            <div className="text-xs text-gray-500">Plate Number</div>
            <div className="text-sm font-medium">{vehicle.plate_number}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Color</div>
            <div className="text-sm font-medium">{vehicle.color}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Brand</div>
            <div className="text-sm font-medium">{vehicle.brand}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Model</div>
            <div className="text-sm font-medium">{vehicle.model}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Category</div>
            <div className="text-sm font-medium">{vehicle.category.name}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Customer</div>
            <div className="text-sm font-medium">{vehicle.customer.name}</div>
          </div>
       
          {vehicle.created_at && (
            <div>
              <div className="text-xs text-gray-500">Created</div>
              <div className="text-sm font-medium">{vehicle.created_at}</div>
            </div>
          )}
          {vehicle.updated_at && (
            <div>
              <div className="text-xs text-gray-500">Updated</div>
              <div className="text-sm font-medium">{vehicle.updated_at}</div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
