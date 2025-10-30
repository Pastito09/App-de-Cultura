'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Share2, MessageCircle, Instagram, Copy } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa6';

interface BotonProps {
  url?: string;
  title?: string;
  text?: string;
}

export default function BotonCompartir({
  url,
  title = 'Mirá este evento cultural 👀',
  text = 'Quería compartirlo con vos',
}: BotonProps) {
  const [open, setOpen] = useState(false);

  const currentUrl =
    typeof window !== 'undefined' ? window.location.href : url || '';

  const handleNativeShare = async () => {
    const shareData = {
      title,
      text,
      url: currentUrl,
    };
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('Enlace copiado al portapapeles');
    } catch (error) {
      console.error('Error al copiar al portapapeles:', error);
    }
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
          className='flex items-center gap-2'
        >
          <Share2 size={18} />
          Compartir
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem asChild>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `${text} ${currentUrl}`
            )}`}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2'
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://www.instagram.com/?url=${encodeURIComponent(
              currentUrl
            )}`}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2'
          >
            <FaInstagram size={16} />
            Instagram
          </a>
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
