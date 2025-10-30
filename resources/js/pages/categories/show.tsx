import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface CategoryShowProps {
  category: {
    id: number;
    name: string;
    price_per_hour: string;
    price_per_day: string;
    created_at?: string | null;
    updated_at?: string | null;
  };
}

export default function CategoryShow({ category }: CategoryShowProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Categories', href: '/categories' },
    { title: `Category #${category.id}`, href: `/categories/${category.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Category: ${category.name}`} />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Category Details</h1>
          <Button asChild variant="outline">
            <Link href="/categories">Back</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-2">
          <div>
            <div className="text-xs text-gray-500">Name</div>
            <div className="text-sm font-medium">{category.name}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Price Per Hour</div>
            <div className="text-sm font-medium">{category.price_per_hour}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Price Per Day</div>
            <div className="text-sm font-medium">{category.price_per_day}</div>
          </div>
       
          {category.created_at && (
            <div>
              <div className="text-xs text-gray-500">Created</div>
              <div className="text-sm font-medium">{category.created_at}</div>
            </div>
          )}
          {category.updated_at && (
            <div>
              <div className="text-xs text-gray-500">Updated</div>
              <div className="text-sm font-medium">{category.updated_at}</div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
