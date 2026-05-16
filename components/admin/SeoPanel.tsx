'use client';

interface SeoFields {
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  og_image_url?: string;
  canonical_url?: string;
}

interface SeoPanelProps {
  values: SeoFields;
  onChange: (field: keyof SeoFields, value: string) => void;
  showCanonical?: boolean;
}

export default function SeoPanel({ values, onChange, showCanonical = false }: SeoPanelProps) {
  const titleLen = values.meta_title?.length || 0;
  const descLen = values.meta_description?.length || 0;
  const titleStatus = titleLen === 0 ? 'empty' : titleLen < 50 ? 'short' : titleLen <= 60 ? 'good' : 'long';
  const descStatus = descLen === 0 ? 'empty' : descLen < 120 ? 'short' : descLen <= 160 ? 'good' : 'long';

  const statusColor = (s: string) =>
    s === 'good' ? 'text-black bg-lime' : s === 'empty' ? 'text-black bg-ink-10' : 'text-white bg-black';

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-black">SEO</h3>
        <span className="text-xs text-ink-50 font-semibold">Indexed by Google</span>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-black uppercase tracking-wider">Meta title</label>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${statusColor(titleStatus)}`}>
              {titleLen}/60 · {titleStatus}
            </span>
          </div>
          <input
            type="text"
            value={values.meta_title || ''}
            onChange={(e) => onChange('meta_title', e.target.value)}
            placeholder="Page title for Google search results"
            className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm"
          />
          <p className="text-xs text-ink-50 mt-1.5">Aim for 50-60 characters. Include focus keyword near the start.</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-black uppercase tracking-wider">Meta description</label>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${statusColor(descStatus)}`}>
              {descLen}/160 · {descStatus}
            </span>
          </div>
          <textarea
            value={values.meta_description || ''}
            onChange={(e) => onChange('meta_description', e.target.value)}
            rows={3}
            placeholder="One-sentence summary shown in search results"
            className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm"
          />
          <p className="text-xs text-ink-50 mt-1.5">Aim for 120-160 characters. End with a hook.</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Focus keyword</label>
          <input
            type="text"
            value={values.focus_keyword || ''}
            onChange={(e) => onChange('focus_keyword', e.target.value)}
            placeholder="Primary keyword this page targets"
            className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm"
          />
          <p className="text-xs text-ink-50 mt-1.5">The main keyword. Appears in title, URL, first paragraph, and at least one H2.</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">OG image URL</label>
          <input
            type="url"
            value={values.og_image_url || ''}
            onChange={(e) => onChange('og_image_url', e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm"
          />
          <p className="text-xs text-ink-50 mt-1.5">1200×630 recommended. Defaults to featured image if blank.</p>
        </div>

        {showCanonical && (
          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Canonical URL</label>
            <input
              type="url"
              value={values.canonical_url || ''}
              onChange={(e) => onChange('canonical_url', e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm"
            />
            <p className="text-xs text-ink-50 mt-1.5">Only set when this page is a duplicate of another. Usually leave blank.</p>
          </div>
        )}

        {/* SERP PREVIEW */}
        <div className="bg-ink-5 rounded-md p-4 border border-ink-10">
          <div className="text-xs font-bold text-ink-60 uppercase tracking-wider mb-3">Google preview</div>
          <div className="space-y-1">
            <div className="text-xs text-ink-60">automationconsultingservices.org</div>
            <div className="text-lg font-medium text-[#1a0dab] leading-tight">{values.meta_title || 'Page title appears here'}</div>
            <div className="text-sm text-ink-70 leading-snug">{values.meta_description || 'Meta description appears here.'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
