export const VehicleTableConfig = {
    columns: [
        { label: 'Plate Number', key: 'plate_number', className: 'border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Color', key: 'color', className: ' border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Brand', key: 'brand', className: 'border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Model', key: 'model', className: 'border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Category', key: 'category_name', className: 'border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Customer', key: 'customer_name', className: 'border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Created Date', key: 'created_at', className: ' border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Actions', key: 'actions', isAction: true, className: ' border px-1 py-1 text-xs sm:text-sm sm:px-2 sm:py-2' }
    ],
    actions: [
        { 
            label: 'View', 
            icon: 'Eye', 
            route: 'vehicles.show', 
            className: 'cursor-pointer rounded-lg bg-sky-600 p-2 text-white hover:opacity-90'
        },
        { 
            label: 'Edit', 
            icon: 'Pencil', 
            route: 'vehicles.edit', 
            className: 'ms-2 cursor-pointer rounded-lg bg-blue-600 p-2 text-white hover:opacity-90',
            onClick: (row: any, onEdit: (row: any) => void) => onEdit(row)
        },
        { 
            label: 'Delete', 
            icon: 'Trash2', 
            route: 'vehicles', 
            className: 'ms-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white hover:opacity-90'
        }
    ]
}
