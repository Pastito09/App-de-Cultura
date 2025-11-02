'use client';

import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Share2, MessageCircle, Copy } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa6';
import { toast } from 'sonner';
import Link from 'next/link';

interface BotonProps {
  eventSlug?: string;
  title?: string;
  text?: string;
}

export default function BotonCompartir({
  eventSlug,
  title = 'Mirá este evento cultural 👀',
  text = 'Quería compartirlo con vos',
}: BotonProps) {
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setCurrentUrl(`${origin}${eventSlug}`);
    } else {
      setCurrentUrl(
        `${process.env.NEXT_PUBLIC_SITE_URL}/${eventSlug}`
      );
    }
  }, [eventSlug]);

  const handleNativeShare = async () => {
    if (!currentUrl) return;
    try {
      await navigator.share({ title, text, url: currentUrl });
    } catch (error) {
      console.error('Error al compartir:', error);
      toast.error('No se pudo abrir el diálogo nativo de compartir.');
    }
  };

  const copyToClipboard = async () => {
    if (!currentUrl) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = currentUrl;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      toast('Enlace copiado al portapapeles ✅');
    } catch (error) {
      toast.error('No se pudo copiar el enlace.');
      console.error(error);
    }
  };

  const handleInstagramShare = async () => {
    if (!currentUrl) return;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    );

    try {
      await copyToClipboard();
    } catch {
      toast.error(
        'No se pudo copiar automáticamente. Copialo manualmente.'
      );
      return;
    }

    let seconds = 3;

    const id = toast.custom(() => (
      <div className='rounded-md bg-white shadow px-4 py-3 mb-1 text-sm flex flex-col gap-1'>
        <strong>Enlace copiado ✅ pegalo en tu mensaje</strong>
        <span>Abriendo Instagram en {seconds}…</span>
      </div>
    ));

    const interval = setInterval(() => {
      seconds -= 1;

      toast.custom(
        () => (
          <div className='rounded-md bg-white shadow px-4 py-3 mb-1 text-sm flex flex-col gap-1'>
            <strong>Enlace copiado ✅ pegalo en tu mensaje</strong>
            <span>Abriendo Instagram en {seconds}…</span>
          </div>
        ),
        { id }
      );

      if (seconds <= 0) {
        clearInterval(interval);
        toast.dismiss(id);

        if (isMobile) {
          // Intento de deep link
          window.location.href = 'instagram://app';

          // Fallback web
          setTimeout(() => {
            window.open('https://www.instagram.com/', '_blank');
          }, 600);
        } else {
          window.open('https://www.instagram.com/', '_blank');
        }
      }
    }, 1000);
  };

  const handleShareClick = () => {
    if (typeof navigator.share === 'function') {
      handleNativeShare();
    } else {
      setOpen(!open);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          onClick={handleShareClick}
          className='flex items-center gap-2 rounded-md'
        >
          <Share2 className='w-4 h-4 sm:w-[18px] sm:h-[18px]' />
          <span className='hidden sm:block text-sm'>Compartir</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem asChild>
          <Link
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `${text} ${currentUrl}`
            )}`}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2'
          >
            <MessageCircle size={16} />
            WhatsApp
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleInstagramShare}
          className='flex items-center gap-2'
        >
          <FaInstagram size={16} />
          Instagram
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={copyToClipboard}
          className='flex items-center gap-2'
        >
          <Copy size={16} />
          Copiar enlace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 'use client';

// import { useState } from 'react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Button } from '@/components/ui/button';
// import { Share2, MessageCircle, Copy } from 'lucide-react';
// import { FaInstagram } from 'react-icons/fa6';
// import { toast } from 'sonner';
// import Link from 'next/link';

// interface BotonProps {
//   url?: string;
//   title?: string;
//   text?: string;
// }

// export default function BotonCompartir({
//   url,
//   title = 'Mirá este evento cultural 👀',
//   text = 'Quería compartirlo con vos',
// }: BotonProps) {
//   const [open, setOpen] = useState(false);

//   const currentUrl =
//     typeof window !== 'undefined' ? window.location.href : url || '';

//   const handleNativeShare = async () => {
//     const shareData = {
//       title,
//       text,
//       url: currentUrl,
//     };
//     try {
//       await navigator.share(shareData);
//     } catch (error) {
//       console.error('Error al compartir:', error);
//     }
//   };

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(currentUrl);
//       toast('Enlace copiado al portapapeles ✅');
//     } catch (error) {
//       toast.error('No se pudo copiar el enlace.');
//       console.error('Error al copiar al portapapeles:', error);
//     }
//   };

//   const handleInstagramShare = async () => {
//     const isMobile = /Android|iPhone|iPad|iPod/i.test(
//       navigator.userAgent
//     );

//     try {
//       await navigator.clipboard.writeText(currentUrl);
//     } catch {
//       toast.error(
//         'No se pudo copiar automáticamente. Copialo manualmente.'
//       );
//       return;
//     }

//     let seconds = 3;

//     const id = toast.custom(() => (
//       <div className='rounded-md bg-white shadow px-4 py-3 text-sm flex flex-col gap-1'>
//         <strong>Enlace copiado ✅ Pegalo en tu mensaje</strong>
//         <span>Abriendo Instagram en {seconds}…</span>
//       </div>
//     ));

//     const interval = setInterval(() => {
//       seconds -= 1;
//       toast.custom(
//         () => (
//           <div className='rounded-md bg-white shadow px-4 py-3 text-sm flex flex-col gap-1'>
//             <strong>Enlace copiado ✅ Pegalo en tu mensaje</strong>
//             <span>Abriendo Instagram en {seconds}…</span>
//           </div>
//         ),
//         { id }
//       );

//       if (seconds <= 0) {
//         clearInterval(interval);
//         toast.dismiss(id);

//         if (isMobile) {
//           window.location.href = `instagram://app`;

//           setTimeout(() => {
//             window.open('https://www.instagram.com/', '_blank');
//           }, 600);
//         } else {
//           window.open('https://www.instagram.com/', '_blank');
//         }
//       }
//     }, 1000);
//   };

//   const handleShareClick = () => {
//     if (typeof navigator.share === 'function') {
//       handleNativeShare();
//     } else {
//       setOpen(!open);
//     }
//   };

//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant='outline'
//           onClick={handleShareClick}
//           className='flex items-center gap-2 rounded-md'
//         >
//           <Share2 size={18} />
//           Compartir
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align='end'>
//         <DropdownMenuItem asChild>
//           <Link
//             href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
//               `${text} ${currentUrl}`
//             )}`}
//             target='_blank'
//             rel='noopener noreferrer'
//             className='flex items-center gap-2'
//           >
//             <MessageCircle size={16} />
//             WhatsApp
//           </Link>
//         </DropdownMenuItem>

//         <DropdownMenuItem
//           onClick={handleInstagramShare}
//           className='flex items-center gap-2'
//         >
//           <FaInstagram size={16} />
//           Instagram
//         </DropdownMenuItem>

//         <DropdownMenuItem
//           onClick={copyToClipboard}
//           className='flex items-center gap-2'
//         >
//           <Copy size={16} />
//           Copiar enlace
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
