'use client';

import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { EventType } from '../../../../generated/prisma';

export const EventTypeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const currentType = searchParams.get('type') || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      params.set('type', e.target.value);
    } else {
      params.delete('type');
    }
    params.set('page', '1');

    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <>
      <select
        value={currentType}
        onChange={handleChange}
        className='border border-gray-300 rounded bg-slate-100 px-3 py-2 mx-2'
      >
        <option value=''>Todos</option>
        {Object.values(EventType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </>
  );
};
