import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VehicleFormProps {
    vehicle?: {
        id?: number;
        plate_number: string;
        color: string;
        brand: string;
        model: string;
        category?: Category;
        customer?: Customer;
    } | null;
    categories?: Category[];
    customers?: Customer[];
    onSuccess: () => void;
    onCancel: () => void;
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

export function VehicleForm({ vehicle, categories, customers, onSuccess, onCancel }: VehicleFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        plate_number: vehicle?.plate_number || '',
        color: vehicle?.color || '',
        brand: vehicle?.brand || '',
        model: vehicle?.model || '',
        category_id: vehicle?.category?.id || '',
        customer_id: vehicle?.customer?.id || '',
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                <Label htmlFor="plate_number">Plate Number</Label>
                <Input
                    id="plate_number"
                    value={data.plate_number as string}
                    onChange={(e) => setData('plate_number', e.target.value)}
                    required
                />
                {errors.plate_number && <p className="text-sm text-red-500">{errors.plate_number}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                    id="color"
                    value={data.color as string}
                    onChange={(e) => setData('color', e.target.value)}
                    required
                />
                {errors.color && <p className="text-sm text-red-500">{errors.color}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                    id="brand"
                    value={data.brand as string}
                    onChange={(e) => setData('brand', e.target.value)}
                />
                {errors.brand && <p className="text-sm text-red-500">{errors.brand}</p>}
            </div>

             <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                    id="model"
                    value={data.model as string}
                    onChange={(e) => setData('model', e.target.value)}
                />
                {errors.model && <p className="text-sm text-red-500">{errors.model}</p>}
            </div>

            <div className="space-y-2">
                <Label>Category</Label>
                {categories && categories.length > 0 && (
                    <Select
                        value={String(data.category_id ?? '')}
                        onValueChange={(value) => setData('category_id', Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={String(cat.id)}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) }
                {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
            </div>

            <div className="space-y-2">
                <Label>Customer</Label>
                {customers && customers.length > 0 && (
                    <Select
                        value={String(data.customer_id ?? '')}
                        onValueChange={(value) => setData('customer_id', Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a customer" />
                        </SelectTrigger>
                        <SelectContent>
                            {customers.map((cust) => (
                                <SelectItem key={cust.id} value={String(cust.id)}>
                                    {cust.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) }
                {errors.customer_id && <p className="text-sm text-red-500">{errors.customer_id}</p>}
            </div>

           


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