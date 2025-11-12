import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useForm } from '@inertiajs/react';

interface Vehicle {
    id: number;
    plate_number: string;
}

interface Customer {
    id: number;
    name: string;
}

interface VehicleInFormProps {
    vehicleIn?: {
        id?: number;
        entry_time: string;
        vehicle: Vehicle;
        customer: Customer;
        parking_spot: string;
    } | null;
   
    customers?: Customer[];
    vehicles?: Vehicle[];
    onSuccess: () => void;
    onCancel: () => void;
}

export function VehicleInForm({
    vehicleIn,
    customers = [],
    vehicles = [],
    onSuccess,
    onCancel,
}: VehicleInFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        vehicle_id: vehicleIn?.vehicle.id || '',
        customer_id: vehicleIn?.customer.id || '',
        parking_spot: vehicleIn?.parking_spot || '',
        entry_time: vehicleIn?.entry_time || new Date().toISOString().slice(0, 16),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = vehicleIn?.id ? `/vehicleIns/${vehicleIn.id}` : '/vehicleIns';
        const method = vehicleIn?.id ? put : post;

        method(url, {
            ...data,
            preserveScroll: true,
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="vehicle_id">Véhicule</Label>
                    <Select
                        value={String(data.vehicle_id || '')}
                        onValueChange={(value) => setData('vehicle_id', Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un véhicule" />
                        </SelectTrigger>
                        <SelectContent>
                            {vehicles.map((vehicle) => (
                                <SelectItem key={vehicle.id} value={String(vehicle.id)}>
                                    {vehicle.plate_number}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.vehicle_id && (
                        <p className="text-sm text-red-500">
                            {errors.vehicle_id}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="customer_id">Client</Label>
                    <Select
                        value={String(data.customer_id || '')}
                        onValueChange={(value) => setData('customer_id', Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un client" />
                        </SelectTrigger>
                        <SelectContent>
                            {customers.map((customer) => (
                                <SelectItem key={customer.id} value={String(customer.id)}>
                                    {customer.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.customer_id && (
                        <p className="text-sm text-red-500">
                            {errors.customer_id}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="parking_spot">Emplacement de stationnement</Label>
                    <Input
                        id="parking_spot"
                        value={data.parking_spot as string}
                        onChange={(e) => setData('parking_spot', e.target.value)}
                        required
                    />
                    {errors.parking_spot && (
                        <p className="text-sm text-red-500">
                            {errors.parking_spot}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="entry_time">Date et heure d'entrée</Label>
                    <Input
                        id="entry_time"
                        type="datetime-local"
                        value={data.entry_time as string}
                        onChange={(e) => setData('entry_time', e.target.value)}
                        required
                    />
                    {errors.entry_time && (
                        <p className="text-sm text-red-500">
                            {errors.entry_time}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Annuler
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
            </div>
        </form>
    );
}
