"use client";
import React, { useCallback, useEffect } from 'react';

type Props = {
  src: string;
  alt?: string;
  onClose: () => void;
};

export default function Lightbox({ src, alt, onClose }: Props) {
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onKey]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="छवि विस्तृत करें"
    >
      <div className="max-w-5xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt || 'गैलरी छवि'} className="w-full h-auto rounded shadow-lg" />
        <div className="mt-2 text-right">
          <button
            onClick={onClose}
            className="inline-block px-3 py-1 bg-red-600 text-white rounded"
            aria-label="बंद करें"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
}
