'use client';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import generatePaginationNumbers from '@/utils/generatePaginationNumbers';
import clsx from 'clsx';

import {
  redirect,
  usePathname,
  useSearchParams,
} from 'next/navigation';

interface Props {
  totalPages: number;
}

export const PaginationEvent = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get('page') ?? 1;

  const currentPage = isNaN(Number(pageString))
    ? 1
    : Number(pageString);

  if (currentPage < 1 || isNaN(Number(pageString))) {
    redirect(pathName);
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`;
    }
    if (Number(pageNumber) <= 0) {
      return `${pathName}`;
    }
    if (Number(pageNumber) > totalPages) {
      return `${pathName}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageUrl(currentPage - 1)}
              className='hover:bg-slate-200 rounded-lg p-3'
            />
          </PaginationItem>
          {allPages.map((pageNumber, index) => (
            <PaginationItem key={pageNumber + '-' + index}>
              <PaginationLink
                href={createPageUrl(pageNumber)}
                className={clsx('hover:bg-slate-200 rounded-lg p-3', {
                  'bg-slate-200 ': pageNumber === currentPage,
                })}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={createPageUrl(currentPage + 1)}
              className='hover:bg-slate-200 rounded-lg p-3'
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
