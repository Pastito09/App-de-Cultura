import { initialData } from '@/seed/seed';

interface Props {
  params: { slug: string };
}

export default async function EventoPage({ params }: Props) {
  let { slug } = await params;
  slug = slug.replace(/-/g, ' ');
  const eventos = initialData.events.filter(
    (evento) => evento.title === slug
  );
  console.log(eventos);

  return <div>{slug}</div>;
}
