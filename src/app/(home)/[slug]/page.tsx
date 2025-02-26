import Image from 'next/image';
import { initialData } from '../../../seed/seed';
import EventPage from '@/custom-components/events-page/EventPage';

const data = initialData.events;
export default async function EventoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let { slug } = await params;

  const evento = data.find(({ id }) => id === slug);

  return (
    <>
      <EventPage {...evento!} />
    </>
  );
}
