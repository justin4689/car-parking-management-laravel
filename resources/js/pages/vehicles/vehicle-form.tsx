import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VehicleFormProps {
    vehicle?: {
        id?: number;
        name: string;
        plate_number: string;
        color: string;
        brand: string;
        model: string;
        category_id: Category;
        customer_id: Customer;
    } | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export function VehicleForm({ vehicle, onSuccess, onCancel }: VehicleFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: vehicle?.name || '',
        plate_number: vehicle?.plate_number || '',
        color: vehicle?.color || '',
        brand: vehicle?.brand || '',
        model: vehicle?.model || '',
        category_id: vehicle?.category_id || '',
        customer_id: vehicle?.customer_id || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = vehicle?.id 
            ? `/vehicles/${vehicle.id}`
            : '/vehicles';
            
        const method = vehicle?.id ? 'put' : 'post';
        
        (method === 'post' ? post : put)(url, {
            preserveScroll: true,
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

           

            <div className="space-y-2">
                <Label htmlFor="price_per_hour">Price per hour</Label>
                <Input
                    id="price_per_hour"
                    type="number"
                    value={data.price_per_hour}
                    onChange={(e) => setData('price_per_hour', e.target.value)}
                    required
                />
                {errors.price_per_hour && <p className="text-sm text-red-500">{errors.price_per_hour}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="price_per_day">Price per day</Label>
                <Input
                    id="price_per_day"
                    type="number"
                    value={data.price_per_day}
                    onChange={(e) => setData('price_per_day', e.target.value)}
                />
                {errors.price_per_day && <p className="text-sm text-red-500">{errors.price_per_day}</p>}
            </div>

        

            <div className="flex justify-end gap-2 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    );
}