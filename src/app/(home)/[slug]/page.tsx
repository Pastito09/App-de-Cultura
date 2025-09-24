export const revalidate = 60; // seconds

import EventPage from '@/custom-components/events-page/EventPage';

import { getEventBySlugWithImage } from '@/actions/events/getEventBySlugWithImage';

export default async function EventoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { ok, evento, message } = await getEventBySlugWithImage(slug);

  if (!ok) {
    return (
      <div>
        <span>Evento no encontrado</span>
        <span>{message}</span>
      </div>
    );
  }

  return (
    <>
      <EventPage {...evento!} />
    </>
  );
}
