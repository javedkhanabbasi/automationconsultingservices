'use client';

import { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface FeaturedImagePickerProps {
  imageUrl: string;
  altText: string;
  onChange: (url: string, alt: string) => void;
}

export default function FeaturedImagePicker({ imageUrl, altText, onChange }: FeaturedImagePickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `featured-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'media';

    const { error } = await supabase.storage.from(bucket).upload(filename, file);
    if (error) {
      alert('Upload failed: ' + error.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filename);

    await supabase.from('media').insert({
      filename,
      original_name: file.name,
      url: urlData.publicUrl,
      storage_path: filename,
      mime_type: file.type,
      size_bytes: file.size,
    });

    onChange(urlData.publicUrl, altText || file.name);
    setUploading(false);
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold text-black mb-5">Featured image</h3>

      {imageUrl ? (
        <div className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={altText} className="w-full rounded-md border border-ink-10" />
          <input
            type="text"
            value={altText || ''}
            onChange={(e) => onChange(imageUrl, e.target.value)}
            placeholder="Alt text (for accessibility and SEO)"
            className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm"
          />
          <div className="flex gap-2">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-ghost text-xs flex-1 justify-center">
              Replace
            </button>
            <button type="button" onClick={() => onChange('', '')} className="btn-ghost text-xs flex-1 justify-center">
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-ink-20 rounded-md p-8 text-center hover:border-black transition-colors disabled:opacity-50"
        >
          <div className="text-3xl mb-2">📁</div>
          <div className="font-bold text-black text-sm mb-1">{uploading ? 'Uploading...' : 'Upload image'}</div>
          <div className="text-xs text-ink-50">PNG, JPG, WebP up to 5MB</div>
        </button>
      )}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileSelected} className="hidden" />
    </div>
  );
}
