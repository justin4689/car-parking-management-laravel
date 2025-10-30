export const CategoryTableConfig = {
    columns: [
        { label: 'Name', key: 'name', className: 'border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Price Per Hour', key: 'price_per_hour', className: ' border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Price Per Day', key: 'price_per_day', className: 'border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Created Date', key: 'created_at', className: ' border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Actions', key: 'actions', isAction: true, className: ' border px-1 py-1 text-xs sm:text-sm sm:px-2 sm:py-2' }
    ],
    actions: [
        { 
            label: 'View', 
            icon: 'Eye', 
            route: 'categories.show', 
            className: 'cursor-pointer rounded-lg bg-sky-600 p-2 text-white hover:opacity-90'
        },
        { 
            label: 'Edit', 
            icon: 'Pencil', 
            route: 'categories.edit', 
            className: 'ms-2 cursor-pointer rounded-lg bg-blue-600 p-2 text-white hover:opacity-90',
            onClick: (row: any, onEdit: (row: any) => void) => onEdit(row)
        },
        { 
            label: 'Delete', 
            icon: 'Trash2', 
            route: 'categories', 
            className: 'ms-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white hover:opacity-90'
        }
    ]
}
