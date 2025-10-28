import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Link } from "@inertiajs/react"
import { SelectValue } from "@radix-ui/react-select";

interface LinkProps {
    active: boolean;
    label: string;
    url: string | null;
}

interface PaginationData {
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface PaginationProps {
    pagination: PaginationData;
    totalCount: number;
    filteredCount: number;
    search: string;
}

export const Pagination = ({ pagination,  totalCount, filteredCount, search } : PaginationProps) => {
    return (
        <div className="flex items-center justify-between mt-4">

            {/* Pagination information */}
            {search ? (
                <p>Showing <strong>{filteredCount}</strong> filtered result{filteredCount !== 1 && 's'} out of <strong>{totalCount}</strong> entr{totalCount !== 1 ? 'ies' : 'y'} </p>

            ) : (
                <p>Showing <strong>{pagination.from}</strong> to <strong>{pagination.to}</strong> out of <strong>{pagination.total}</strong> entr{totalCount !== 1 ? 'ies' : 'y'} </p>
            )}

         

            {/* Pagination Link */}
            <div className="flex gap-2">
                {pagination.links.map((link, index) => (
                    <Link
                        className={`px-3 py-2 border rounded ${link.active ? 'bg-gray-700 text-white' : ''}`}
                        href={link.url || '#'}
                        key={index}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    )

}
