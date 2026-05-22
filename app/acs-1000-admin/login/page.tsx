import LoginForm from './LoginForm';

export const metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <span className="w-12 h-12 bg-lime rounded-md flex items-center justify-center font-bold text-black text-xl">
              A
            </span>
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">ACS Admin</h1>
          <p className="text-ink-60 text-sm">Sign in to manage content</p>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-8">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-ink-50 mt-6">
          Need access? Contact the site administrator.
        </p>
      </div>
    </div>
  );
}
