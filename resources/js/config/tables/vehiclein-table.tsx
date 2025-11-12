export const VehicleInTableConfig = {
    columns: [
        { label: 'Vehicle', key: 'vehicle.plate_number', className: 'border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Customer', key: 'customer.name', className: ' border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Parking Spot', key: 'parking_spot', className: 'border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Entry Time', key: 'entry_time', className: 'border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Created Date', key: 'created_at', className: ' border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2' },
        { label: 'Actions', key: 'actions', isAction: true, className: ' border px-1 py-1 text-xs sm:text-sm sm:px-2 sm:py-2' }
    ],
    actions: [
        { 
            label: 'View', 
            icon: 'Eye', 
            route: 'vehicleIns.show', 
            className: 'cursor-pointer rounded-lg bg-sky-600 p-2 text-white hover:opacity-90'
        },
        { 
            label: 'Edit', 
            icon: 'Pencil', 
            route: 'vehicleIns.edit', 
            className: 'ms-2 cursor-pointer rounded-lg bg-blue-600 p-2 text-white hover:opacity-90',
            onClick: (row: any, onEdit: (row: any) => void) => onEdit(row)
        },
        { 
            label: 'Delete', 
            icon: 'Trash2', 
            route: 'vehicleIns', 
            className: 'ms-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white hover:opacity-90'
        }
    ]
}
