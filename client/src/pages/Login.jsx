import { Eye, EyeOff, BrainCircuit } from "lucide-react";
import { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#f3f4f8] flex items-center justify-center px-4 py-8 sm:px-6">
      {/* Login Card */}
      <div className="w-full max-w-[360px] rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-[0_12px_30px_rgba(0,0,0,0.10)] sm:px-7 sm:py-8">
        {/* Logo */}
        <div className="mb-7 flex items-center justify-center gap-2.5">
          <BrainCircuit
            className="h-10 w-10 shrink-0 text-[#5140c9]"
            strokeWidth={1.8}
          />
          <span className="text-[23px] font-semibold tracking-tight text-gray-950">
            KnowFlow AI
          </span>
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-[26px]">
            Welcome back
          </h1>

          <p className="mx-auto mt-2 max-w-[280px] text-sm leading-5 text-gray-500">
            Continue your journey with your AI knowledge workspace.
          </p>
        </div>

        {/* Form UI only — no business logic */}
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-900"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#5140c9] focus:ring-2 focus:ring-[#5140c9]/15"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900"
              >
                Password
              </label>

              <button
                type="button"
                className="text-xs text-gray-500 transition hover:text-[#5140c9] sm:text-sm"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#5140c9] focus:ring-2 focus:ring-[#5140c9]/15"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-gray-500 hover:text-[#5140c9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5140c9]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Sign In */}
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center rounded-lg bg-[#4932d0] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[#3f2abb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4932d0] focus-visible:ring-offset-2 active:scale-[0.99]"
          >
            Sign in
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-0.5">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="shrink-0 text-sm text-gray-600">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4932d0] focus-visible:ring-offset-2"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              className="h-5 w-5 shrink-0"
            >
              <path
                fill="#4285F4"
                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4.1 6v5h6.6c3.9-3.6 6.1-8.7 6.1-14.7Z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2C9.2 39.6 16.1 44 24 44Z"
              />
              <path
                fill="#FBBC05"
                d="M12.6 27.8a12 12 0 0 1 0-7.6V15H5.8a20 20 0 0 0 0 18Z"
              />
              <path
                fill="#EA4335"
                d="M24 11.8c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 5.7 29.5 4 24 4 16.1 4 9.2 8.4 5.8 15l6.8 5.2c1.6-4.8 6.1-8.4 11.4-8.4Z"
              />
            </svg>
            Continue with Google
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-5 text-center text-[13px] text-gray-700 sm:text-sm">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-[#4932d0] hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}

export default Login;
