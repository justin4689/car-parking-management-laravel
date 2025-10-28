import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CustomerFormProps {
    customer?: {
        id?: number;
        name: string;
        email: string;
        address: string;
        phone: string;
    } | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export function CustomerForm({ customer, onSuccess, onCancel }: CustomerFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: customer?.name || '',
        email: customer?.email || '',
        address: customer?.address || '',
        phone: customer?.phone || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = customer?.id 
            ? `/customers/${customer.id}`
            : '/customers';
            
        const method = customer?.id ? 'put' : 'post';
        
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
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
             <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                    id="address"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    required
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
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