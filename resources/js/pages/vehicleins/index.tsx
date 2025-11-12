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
import { VehicleInTableConfig } from '@/config/tables/vehiclein-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { VehicleInForm } from './vehiclein-form';

import { toast } from 'sonner';
import { CirclePlusIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Vehicles In',
        href: '/vehicleIns',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
}

interface Customer{
    id: number;
    name: string;
}

interface Vehicle{
    id: number;
    plate_number: string;
}

interface VehicleIn{
    id: number;
    vehicle: Vehicle;
    customer: Customer;
    parking_spot: string;
    entry_time: string;
}


interface VehicleInPagination {
    data: VehicleIn[];
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
    vehicleIns: VehicleInPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
    vehicles: Vehicle[];
    customers: Customer[];
}

export default function Index({
    vehicles,
    filters,
    totalCount,
    filteredCount,
    vehicleIns,
    customers,
}: IndexProps) {
    const { flash } = usePage<{
        flash?: { success?: string; error?: string };
    }>().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVehicleIn, setEditingVehicleIn] = useState<VehicleIn | null>(
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

    const { data, setData, get } = useForm({
        search: filters.search || '',
        perPage: filters.perPage || '10',
    });

    // Debug: Afficher la structure de vehicleIns
    useEffect(() => {
        console.log('vehicleIns:', vehicleIns);
        if (vehicleIns && vehicleIns.data) {
            console.log('vehicleIns.data:', vehicleIns.data);
            console.log('Type de vehicleIns.data:', typeof vehicleIns.data);
            console.log('Est un tableau?', Array.isArray(vehicleIns.data));
            if (Array.isArray(vehicleIns.data)) {
                console.log('Nombre d\'éléments:', vehicleIns.data.length);
                if (vehicleIns.data.length > 0) {
                    console.log('Premier élément:', vehicleIns.data[0]);
                }
            }
        }
    }, [vehicleIns]);

    // Handle Change for the Search Input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('search', value);

        const queryString = {
            ...(value && { search: value }),
            ...(data.perPage && { perPage: data.perPage }),
        };

        router.get('/vehicleins', queryString, {    
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['vehicleIns', 'filters', 'totalCount', 'filteredCount', 'vehicles', 'customers'],
        });
    };

    // To Reset Applied Filter
    const handleReset = () => {
        setData('search', '');
        setData('perPage', '10');

        router.visit('/vehicleins', {
            preserveState: true,
            preserveScroll: true,
            only: ['vehicleIns', 'filters', 'totalCount', 'filteredCount', 'vehicles', 'customers'],
        });
    };

    // Handle Per Page Change
    const handlePerPageChange = (value: string) => {
        setData('perPage', value);

        const queryString = {
            ...(data.search && { search: data.search }),
            ...(value && { perPage: value }),
        };

        router.get('/vehicleins', queryString, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['vehicleIns', 'filters', 'totalCount', 'filteredCount', 'vehicles', 'customers'],
        });
    };

    // Fonction pour ouvrir la modale en mode édition
    const handleEdit = (row: TableRow) => {
        setEditingVehicleIn(row as VehicleIn);
        setIsModalOpen(true);
    };

    // Fonction pour ouvrir la page en mode visualisation
    const handleView = (row: TableRow) => {
        router.visit(`/vehicleins/${(row as any).id}`);
    };

    // Fonction pour ouvrir la modale en mode création
    const handleAdd = () => {
        setEditingVehicleIn(null);
        setIsModalOpen(true);

    };

    // Fonction pour fermer la modale
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingVehicleIn(null);
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
            <Head title="Vehicle In Management" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {/* Search inputs and button */}
                <div className="mb-4 flex w-full items-center justify-between gap-4">
                    <Input
                        type="text"
                        value={data.search}
                        onChange={handleChange}
                        className="h-10 w-1/2"
                        placeholder="Search vehicle in by parking spot ..."
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
                            <CirclePlusIcon size={16} /> Add Vehicle In
                        </Button>
                      
                        <Dialog
                            open={isModalOpen}
                            onOpenChange={setIsModalOpen}
                        >
                            <DialogContent className="sm:max-w-[700px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingVehicleIn
                                            ? 'Edit Vehicle In'
                                            : 'Add New Vehicle In'}
                                    </DialogTitle>
                                </DialogHeader>
                                <VehicleInForm
                                    vehicleIn={editingVehicleIn}
                                    vehicles={vehicles}
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
                    columns={VehicleInTableConfig.columns}
                    actions={VehicleInTableConfig.actions}
                    data={vehicleIns.data}
                    from={vehicleIns.from}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onView={handleView}
                    isModal={true}
                />

                {/* Pagination */}
                <Pagination
                    pagination={vehicleIns}
                    totalCount={totalCount}
                    filteredCount={filteredCount}
                    search={data.search}
                />
            </div>
        </AppLayout>
    );
}
