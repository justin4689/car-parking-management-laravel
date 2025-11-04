import { Link, router } from '@inertiajs/react';
import * as LucidIcons from 'lucide-react';
import { Button } from './ui/button';

interface TableColumn {
    label: string;
    key: string;
    isImage?: boolean;
    isAction?: boolean;
    className?: string;
}

interface ActionConfig {
    label: string;
    icon: string;
    route: string;
    className: string;
}

export interface TableRow {
    [key: string]: any;
}

interface CustomTableProps {
    columns: TableColumn[];
    actions: ActionConfig[];
    data: TableRow[];
    from: number;
    onDelete: (route: string) => void;
    onView?: (row: TableRow) => void;
    onEdit?: (row: TableRow) => void;
    isModal?: boolean;
}

export const CustomTable = ({ columns, actions, data, from, onDelete, onView, onEdit, isModal }: CustomTableProps) => {

    const renderActionButtons = (row: TableRow) => {
        return (
            <div className="flex justify-center">
                {actions.map((action, index) => {
                    const IconComponent = (LucidIcons as any)[action.icon] as React.ComponentType<{ size?: number }>;

                    if (isModal) {
                       
                        // Edit Functionality
                        if (action.label === 'Edit') {
                            return (
                                <Button key={index} className={action.className} onClick={() => onEdit?.(row)}>
                                    <IconComponent size={18} />
                                </Button>
                            );
                        }
                    }

                    // View Functionality
                    if (action.label === 'View') {
                        return (
                            <Button key={index} className={action.className} onClick={() => onView?.(row)}>
                                <IconComponent size={18} />
                            </Button>
                        );
                    }

                    // Delete Functionality
                    if (action.label === 'Delete') {
                        return (
                            <Button 
                                key={index} 
                                className={action.className} 
                                onClick={() => onDelete(`/${action.route}/${row.id}`)}
                            >
                                <IconComponent size={18} />
                            </Button>
                        );
                    }

                    // Pour les autres actions (edit, view, etc.)
                    return (
                        <Link 
                            key={index} 
                            as="button" 
                            href={`/${action.route}/${row.id}`} 
                            className={action.className}
                        >
                            <IconComponent size={18} />
                        </Link>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="rounded-lg border bg-white shadow-sm">
            <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr className="bg-black text-white">
                        <th className="border px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2">#</th>

                        {columns.map((column, index) => (
                            <th key={column.key} className={column.className}>
                                {column.label}{' '}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr key={index}>
                                <td className="border px-2 py-1 text-center text-xs sm:text-sm sm:px-4 sm:py-2">{from + index}</td>

                                {columns.map((col) => (
                                    <td key={col.key} className="border px-2 py-1 text-center text-xs sm:text-sm sm:px-4 sm:py-2">
                                        {col.isImage ? (
                                            <div>
                                                <img src={row[col.key]} alt={row.name || 'Image'} className="h-12 w-16 rounded-lg object-cover sm:h-16 sm:w-20" />
                                            </div>
                                        ) : col.isAction ? (
                                            renderActionButtons(row)
                                        ) : (
                                            row[col.key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-md py-4 text-center font-bold text-red-600">
                                No Data Found!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
    );
};
