export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';

export default async function SettingsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="p-8 lg:p-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-1">Settings</h1>
        <p className="text-ink-60 text-sm">Account and site settings.</p>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <h2 className="text-lg font-bold text-black mb-5">Your account</h2>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-bold text-black uppercase tracking-wider mb-1">Email</div>
              <div className="text-sm text-ink-70">{user?.email}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-black uppercase tracking-wider mb-1">User ID</div>
              <div className="text-xs text-ink-50 font-mono">{user?.id}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-black uppercase tracking-wider mb-1">Last sign in</div>
              <div className="text-sm text-ink-70">{user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : '—'}</div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold text-black mb-5">Password</h2>
          <p className="text-sm text-ink-60 mb-4">To change your password, sign out and use the password reset flow from the login page. Or update directly in the Supabase dashboard under Authentication → Users.</p>
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
            Open Supabase dashboard →
          </a>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold text-black mb-5">Add admin users</h2>
          <p className="text-sm text-ink-60 mb-4">New admin users are added through the Supabase dashboard. Go to Authentication → Users → Add User. They will receive an email invite and can log in here once they set their password.</p>
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
            Manage users in Supabase →
          </a>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold text-black mb-5">Site info</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-ink-60">Domain</span>
              <span className="text-black font-semibold">automationconsultingservices.org</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-60">Framework</span>
              <span className="text-black font-semibold">Next.js 14 (App Router)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-60">Database</span>
              <span className="text-black font-semibold">Supabase Postgres</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-60">Storage</span>
              <span className="text-black font-semibold">Supabase Storage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
