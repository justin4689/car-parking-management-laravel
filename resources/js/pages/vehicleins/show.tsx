import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface VehicleInShowProps {
  vehicleIn: {
    id: number;
    plate_number: string;
    vehicle: Vehicle;
    customer: Customer;
    parking_spot: string;
    entry_time: string;
    created_at?: string | null;
    updated_at?: string | null;
  };
  
}


  
interface Vehicle {
    id: number;
    plate_number: string;

}

interface Customer {
    id: number;
    name: string;
   
}


  


export default function VehicleShow({ vehicleIn }: VehicleInShowProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Vehicles In', href: '/vehicleins' },
    { title: `Vehicle #${vehicleIn.id}`, href: `/vehicleins/${vehicleIn.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Vehicle In: ${vehicleIn.plate_number}`} />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Vehicle In Details</h1>
          <Button asChild variant="outline">
            <Link href="/vehicleins">Back</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-2">
       
          <div>
            <div className="text-xs text-gray-500">Plate Number</div>
            <div className="text-sm font-medium">{vehicleIn.vehicle.plate_number}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Customer</div>
            <div className="text-sm font-medium">{vehicleIn.customer.name}</div>
          </div> 
          <div>
            <div className="text-xs text-gray-500">Parking Spot</div>
            <div className="text-sm font-medium">{vehicleIn.parking_spot}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Entry Time</div>
            <div className="text-sm font-medium">{vehicleIn.entry_time}</div>
          </div>

       
          {vehicleIn.created_at && (
            <div>
              <div className="text-xs text-gray-500">Created</div>
              <div className="text-sm font-medium">{vehicleIn.created_at}</div>
            </div>
          )}
          {vehicleIn.updated_at && (
            <div>
              <div className="text-xs text-gray-500">Updated</div>
              <div className="text-sm font-medium">{vehicleIn.updated_at}</div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
