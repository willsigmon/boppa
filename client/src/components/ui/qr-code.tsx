import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  level?: string;
  className?: string;
  alt?: string;
  title?: string;
  printable?: boolean;
}

export function QRCodeGenerator({
  value,
  size = 128,
  level = 'M',
  className = '',
  alt = 'QR Code',
  title = 'Scan this QR code',
  printable = false,
}: QRCodeGeneratorProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        const options = {
          errorCorrectionLevel: level as 'L' | 'M' | 'Q' | 'H',
          margin: 4,
          width: size,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        };
        
        const dataUrl = await QRCode.toDataURL(value, options);
        setQrDataUrl(dataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [value, size, level]);

  if (!qrDataUrl) {
    return (
      <div 
        className={`bg-gray-200 rounded-md flex items-center justify-center ${className}`} 
        style={{ width: size, height: size }}
      >
        <span className="text-gray-500 text-sm">Generating QR...</span>
      </div>
    );
  }

  // Apply print-specific styles if printable
  const printClass = printable 
    ? 'print:w-[2cm] print:h-[2cm] print:min-w-[2cm] print:min-h-[2cm]' 
    : '';

  return (
    <div className={`qr-code-container ${printClass}`}>
      <img
        src={qrDataUrl}
        alt={alt}
        title={title}
        width={size}
        height={size}
        className={`rounded-md ${className} ${printClass}`}
      />
    </div>
  );
}