'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/slug';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export default function CategoriesClient() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const load = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from('categories').select('*').order('name');
    setCats(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addCategory = async () => {
    if (!newName.trim()) return;
    const supabase = createClient();
    const { error } = await supabase.from('categories').insert({
      name: newName.trim(),
      slug: slugify(newName),
      description: newDesc.trim() || null,
    });
    if (error) { alert(error.message); return; }
    setNewName(''); setNewDesc('');
    load();
  };

  const deleteCategory = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? Posts in this category will not be deleted but will lose their category assignment.`)) return;
    const supabase = createClient();
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) { alert(error.message); return; }
    load();
  };

  const updateName = async (id: string, name: string) => {
    const supabase = createClient();
    await supabase.from('categories').update({ name, slug: slugify(name) }).eq('id', id);
    load();
  };

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-5xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">Categories</h1>
        <p className="text-ink-60 text-sm">Categorize blog posts. Used for filtering and SEO.</p>
      </div>

      <div className="card p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-bold text-black mb-4">Add new category</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Category name"
            className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm"
          />
          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Description (optional)"
            className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm"
          />
          <button onClick={addCategory} className="btn-primary text-sm self-start">+ Add</button>
        </div>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-ink-50">Loading...</div>
        ) : cats.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-ink-5 border-b border-ink-10">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Slug</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Description</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {cats.map((c) => (
                    <tr key={c.id} className="border-b border-ink-10">
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          defaultValue={c.name}
                          onBlur={(e) => { if (e.target.value !== c.name) updateName(c.id, e.target.value); }}
                          className="font-semibold text-black bg-transparent focus:bg-white focus:border focus:border-black focus:outline-none px-2 py-1 rounded -ml-2"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-ink-70 font-mono">{c.slug}</td>
                      <td className="px-6 py-4 text-sm text-ink-70">{c.description || '—'}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => deleteCategory(c.id, c.name)} className="text-sm text-black hover:text-ink-70">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <ul className="sm:hidden divide-y divide-ink-10">
              {cats.map((c) => (
                <li key={c.id} className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <input
                      type="text"
                      defaultValue={c.name}
                      onBlur={(e) => { if (e.target.value !== c.name) updateName(c.id, e.target.value); }}
                      className="font-semibold text-black bg-transparent focus:bg-white focus:border focus:border-black focus:outline-none px-2 py-1 rounded flex-1 text-sm"
                    />
                    <button onClick={() => deleteCategory(c.id, c.name)} className="text-sm text-black hover:text-ink-70 shrink-0">Delete</button>
                  </div>
                  <div className="text-xs text-ink-70 font-mono">{c.slug}</div>
                  {c.description && <div className="text-xs text-ink-60 mt-1">{c.description}</div>}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="p-12 text-center text-ink-60">No categories yet. Add one above.</div>
        )}
      </div>
    </div>
  );
}
