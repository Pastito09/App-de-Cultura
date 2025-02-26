import Image from 'next/image';
import { initialData } from '../../../seed/seed';
import EventPage from '@/custom-components/events-page/EventPage';
import { Footer } from '@/custom-components';
import Link from 'next/link';
interface Props {
  params: { slug: string };
}
const data = initialData.events;
export default async function EventoPage({ params }: Props) {
  let { slug } = await params;

  const evento = data.find(({ id }) => id === slug);

  return (
    <>
      <EventPage {...evento!} />
    </>
  );
}
