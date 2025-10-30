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
import { CategoryTableConfig } from '@/config/tables/category-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CategoryForm } from './category-form';

import { toast } from 'sonner';
import { CirclePlusIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Categories',
        href: '/categories',
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
    price_per_hour: string;
    price_per_day: string;
    created_at: string;
}

interface CategoryPagination {
    data: Category[];
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
    categories: CategoryPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}

export default function Index({
    categories,
    filters,
    totalCount,
    filteredCount,
}: IndexProps) {
    const { flash } = usePage<{
        flash?: { success?: string; error?: string };
    }>().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
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

        router.get('/categories', queryString, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['categories', 'filters', 'totalCount', 'filteredCount'],
        });
    };

    // To Reset Applied Filter
    const handleReset = () => {
        setData('search', '');
        setData('perPage', '10');

        router.visit('/categories', {
            preserveState: true,
            preserveScroll: true,
            only: ['categories', 'filters', 'totalCount', 'filteredCount'],
        });
    };

    // Handle Per Page Change
    const handlePerPageChange = (value: string) => {
        setData('perPage', value);

        const queryString = {
            ...(data.search && { search: data.search }),
            ...(value && { perPage: value }),
        };

        router.get('/categories', queryString, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['categories', 'filters', 'totalCount', 'filteredCount'],
        });
    };

    // Fonction pour ouvrir la modale en mode édition
    const handleEdit = (row: TableRow) => {
        setEditingCategory(row as Category);
        setIsModalOpen(true);
    };

    // Fonction pour ouvrir la page en mode visualisation
    const handleView = (row: TableRow) => {
        router.visit(`/categories/${(row as any).id}`);
    };

    // Fonction pour ouvrir la modale en mode création
    const handleAdd = () => {
        setEditingCategory(null);
        setIsModalOpen(true);

    };

    // Fonction pour fermer la modale
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    // Handle Delete
    const handleDelete = (route: string) => {
        if (confirm('Are you sure, you want to delete this category?')) {
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
            <Head title="Customer Management" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {/* Search inputs and button */}
                <div className="mb-4 flex w-full items-center justify-between gap-4">
                    <Input
                        type="text"
                        value={data.search}
                        onChange={handleChange}
                        className="h-10 w-1/2"
                        placeholder="Search customer by name, email or phone..."
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
                            <CirclePlusIcon size={16} /> Add Category
                        </Button>
                      
                        <Dialog
                            open={isModalOpen}
                            onOpenChange={setIsModalOpen}
                        >
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingCategory
                                            ? 'Edit Category'
                                            : 'Add New Category'}
                                    </DialogTitle>
                                </DialogHeader>
                                <CategoryForm
                                    category={editingCategory}
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
                    columns={CategoryTableConfig.columns}
                    actions={CategoryTableConfig.actions}
                    data={categories.data}
                    from={categories.from}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onView={handleView}
                    isModal={true}
                />

                {/* Pagination */}
                <Pagination
                    pagination={categories}
                    totalCount={totalCount}
                    filteredCount={filteredCount}
                    search={data.search}
                />
            </div>
        </AppLayout>
    );
}
