'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface MediaItem {
  id: string;
  filename: string;
  original_name: string;
  url: string;
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  alt_text: string | null;
  created_at: string;
}

export default function MediaLibraryClient() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const upload = async (files: FileList) => {
    setUploading(true);
    const supabase = createClient();
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'media';

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop() || 'jpg';
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from(bucket).upload(filename, file);
      if (uploadErr) { alert(`Upload failed for ${file.name}: ${uploadErr.message}`); continue; }
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filename);
      await supabase.from('media').insert({
        filename,
        original_name: file.name,
        url: urlData.publicUrl,
        storage_path: filename,
        mime_type: file.type,
        size_bytes: file.size,
      });
    }
    setUploading(false);
    load();
  };

  const deleteItem = async (item: MediaItem) => {
    if (!confirm(`Delete ${item.original_name}?`)) return;
    const supabase = createClient();
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'media';
    await supabase.storage.from(bucket).remove([item.storage_path]);
    await supabase.from('media').delete().eq('id', item.id);
    load();
  };

  const updateAlt = async (id: string, alt: string) => {
    const supabase = createClient();
    await supabase.from('media').update({ alt_text: alt }).eq('id', id);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard');
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl">
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">Media library</h1>
          <p className="text-ink-60 text-sm">{items.length} files</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="btn-primary text-sm disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : '+ Upload files'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && upload(e.target.files)}
          className="hidden"
        />
      </div>

      {loading ? (
        <div className="card p-12 text-center text-ink-50">Loading...</div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {items.map((item) => (
            <div key={item.id} className="card overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.alt_text || item.original_name} className="w-full aspect-square object-cover" />
              <div className="p-2 sm:p-3">
                <div className="text-xs font-semibold text-black truncate mb-1">{item.original_name}</div>
                <div className="text-[10px] text-ink-50 mb-2">{formatSize(item.size_bytes)}</div>
                <input
                  type="text"
                  defaultValue={item.alt_text || ''}
                  onBlur={(e) => updateAlt(item.id, e.target.value)}
                  placeholder="Alt text"
                  className="w-full px-2 py-1 border border-ink-20 rounded text-xs text-black focus:border-black focus:outline-none mb-2"
                />
                <div className="flex gap-1">
                  <button onClick={() => copyUrl(item.url)} className="flex-1 text-[10px] font-semibold text-black bg-ink-5 hover:bg-lime px-2 py-1.5 rounded">
                    Copy URL
                  </button>
                  <button onClick={() => deleteItem(item)} className="text-[10px] font-semibold text-black bg-ink-5 hover:bg-black hover:text-white px-2 py-1.5 rounded">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-8 sm:p-12 text-center">
          <div className="text-4xl mb-3">📁</div>
          <h3 className="text-lg font-bold text-black mb-2">No media yet</h3>
          <p className="text-ink-60 text-sm mb-5">Upload your first image to get started.</p>
          <button onClick={() => fileInputRef.current?.click()} className="btn-primary">+ Upload files</button>
        </div>
      )}
    </div>
  );
}
