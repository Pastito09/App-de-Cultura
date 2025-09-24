import Image from 'next/image';

interface Props {
  src?: string;
  alt: string;
  height: number;
  width: number;
  className?: React.StyleHTMLAttributes<
    HTMLImageElement
  >['className'];
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
}

export const CustomImage = ({
  src,
  alt,
  height,
  width,
  className,
  style,
}: Props) => {
  const customSrc = src?.startsWith('http')
    ? src
    : '/images/placeholder.jpg';

  return (
    <>
      <div>
        <Image
          alt={alt}
          src={customSrc}
          height={height}
          width={width}
          quality={100}
        />
      </div>
    </>
  );
};
