import { CustomTable, TableRow } from '@/components/custom-table';
import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { VehicleTableConfig } from '@/config/tables/vehicle-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { VehicleForm } from './vehicle-form';

import { toast } from 'sonner';
import { CirclePlusIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Vehicles',
        href: '/vehicles',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
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

  interface Vehicle {
    id: number;
    plate_number: string;
    color: string;
    brand: string;
    model: string;
    category: Category;
    customer: Customer;
    created_at: string;
}

interface VehiclePagination {
    data: Vehicle[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface FilterProps {
    search: string;
    perPage: string;
}

interface IndexProps {
    vehicles: VehiclePagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
    categories: Category[];
    customers: Customer[];
}

export default function Index({
    vehicles,
    filters,
    totalCount,
    filteredCount,
    categories,
    customers,
}: IndexProps) {
    const { flash } = usePage<{
        flash?: { success?: string; error?: string };
    }>().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(
        null,
    );

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const { data, setData } = useForm({
        search: filters.search || '',
        perPage: filters.perPage || '10',
    });

    // Handle Change for the Search Input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('search', value);

        const queryString = {
            ...(value && { search: value }),
            ...(data.perPage && { perPage: data.perPage }),
        };

        router.get('/vehicles', queryString, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['vehicles', 'filters', 'totalCount', 'filteredCount', 'categories', 'customers'],
        });
    };

    // To Reset Applied Filter
    const handleReset = () => {
        setData('search', '');
        setData('perPage', '10');

        router.visit('/vehicles', {
            preserveState: true,
            preserveScroll: true,
            only: ['vehicles', 'filters', 'totalCount', 'filteredCount', 'categories', 'customers'],
        });
    };

    // Handle Per Page Change
    const handlePerPageChange = (value: string) => {
        setData('perPage', value);

        const queryString = {
            ...(data.search && { search: data.search }),
            ...(value && { perPage: value }),
        };

        router.get('/vehicles', queryString, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['vehicles', 'filters', 'totalCount', 'filteredCount', 'categories', 'customers'],
        });
    };

    // Fonction pour ouvrir la modale en mode édition
    const handleEdit = (row: TableRow) => {
        setEditingVehicle(row as Vehicle);
        setIsModalOpen(true);
    };

    // Fonction pour ouvrir la page en mode visualisation
    const handleView = (row: TableRow) => {
        router.visit(`/vehicles/${(row as any).id}`);
    };

    // Fonction pour ouvrir la modale en mode création
    const handleAdd = () => {
        setEditingVehicle(null);
        setIsModalOpen(true);

    };

    // Fonction pour fermer la modale
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingVehicle(null);
    };

    // Handle Delete
    const handleDelete = (route: string) => {
        if (confirm('Are you sure, you want to delete this vehicle?')) {
            router.delete(route, {
                preserveScroll: true,
                onSuccess: () => {
                    // Optional: Show success message or perform other actions
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vehicle Management" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {/* Search inputs and button */}
                <div className="mb-4 flex w-full items-center justify-between gap-4">
                    <Input
                        type="text"
                        value={data.search}
                        onChange={handleChange}
                        className="h-10 w-1/2"
                        placeholder="Search vehicle by plate number ..."
                        name="search"
                    />

                    <Button
                        onClick={handleReset}
                        className="h-10 cursor-pointer bg-primary hover:bg-red-500"
                    >
                        <X size={20} />
                    </Button>

                    {/* Add product button */}
                    <div className="ml-auto">
                        <Button
                            onClick={handleAdd}
                            className="flex items-center gap-2"
                        >
                            <CirclePlusIcon size={16} /> Add Vehicle
                        </Button>
                      
                        <Dialog
                            open={isModalOpen}
                            onOpenChange={setIsModalOpen}
                        >
                            <DialogContent className="sm:max-w-[700px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingVehicle
                                            ? 'Edit Vehicle'
                                            : 'Add New Vehicle'}
                                    </DialogTitle>
                                </DialogHeader>
                                <VehicleForm
                                    vehicle={editingVehicle}
                                    categories={categories}
                                    customers={customers}
                                    onSuccess={handleCloseModal}
                                    onCancel={handleCloseModal}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                {/* Select Per Page */}
                <div className="flex w-full items-center justify-end gap-2">
                    <span className="text-sm"> Row per page:</span>
                    <Select
                        onValueChange={handlePerPageChange}
                        value={data.perPage}
                    >
                        <SelectTrigger className="w-[90px]">
                            <SelectValue placeholder="Row" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="-1">All</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Custom Table component */}
                <CustomTable
                    columns={VehicleTableConfig.columns}
                    actions={VehicleTableConfig.actions}
                    data={vehicles.data}
                    from={vehicles.from}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onView={handleView}
                    isModal={true}
                />

                {/* Pagination */}
                <Pagination
                    pagination={vehicles}
                    totalCount={totalCount}
                    filteredCount={filteredCount}
                    search={data.search}
                />
            </div>
        </AppLayout>
    );
}
