'use client';
import { Facebook, Linkedin, Twitter, Share2, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export default function SocialShare({ title }) {
  const [copied, setCopied] = useState(false);

  // Sunucu tarafında window olmadığı için kontrol ediyoruz
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const text = `Sjekk lønn etter skatt for: ${title}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
      <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
        <Share2 size={16} className="text-emerald-600" />
        Del denne beregningen
      </h3>
      
      <div className="flex gap-3 flex-wrap">
        {/* Facebook */}
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center w-10 h-10"
          aria-label="Del på Facebook"
        >
          <Facebook size={20} />
        </a>

        {/* Twitter / X */}
        <a 
          href={`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center justify-center w-10 h-10"
          aria-label="Del på Twitter"
        >
          <Twitter size={20} />
        </a>

        {/* LinkedIn */}
        <a 
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition flex items-center justify-center w-10 h-10"
          aria-label="Del på LinkedIn"
        >
          <Linkedin size={20} />
        </a>

        {/* WhatsApp (Mobilde çok kullanılır) */}
        <a 
          href={`https://wa.me/?text=${text} ${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center w-10 h-10"
          aria-label="Del på WhatsApp"
        >
          <Share2 size={20} />
        </a>

        {/* Link Kopyala */}
        <button 
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition text-sm min-w-[120px]"
          aria-label="Kopier lenke til utklippstavlen"
        >
          <LinkIcon size={16} />
          {copied ? 'Kopiert!' : 'Kopier lenke'}
        </button>
      </div>
    </div>
  );
}