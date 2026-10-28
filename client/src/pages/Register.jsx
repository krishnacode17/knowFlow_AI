import { useState } from "react";
import { Eye, EyeOff, BrainCircuit } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      if (response.data?.success === false) {
        setError(response.data.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (err) {
      const data = err.response?.data;
      const message =
        data?.errors?.[0]?.msg ||
        data?.message ||
        data?.error ||
        "Registration failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#5140c9] focus:ring-2 focus:ring-[#5140c9]/15";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f2ed] px-4 py-8 sm:px-6">
      <div className="w-full max-w-[402px] rounded-2xl border border-gray-200 bg-white px-5 py-7 shadow-[0_12px_30px_rgba(0,0,0,0.10)] sm:px-6 sm:py-6">
        <div className="mb-6 flex items-center justify-center gap-2">
          <BrainCircuit
            className="h-8 w-8 shrink-0 text-[#5140c9]"
            strokeWidth={1.8}
          />
          <span className="text-[21px] font-semibold tracking-tight text-gray-950">
            KnowFlow AI
          </span>
        </div>

        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-[26px]">
            Create your account
          </h1>
          <p className="mx-auto mt-2 max-w-[300px] text-sm leading-5 text-gray-500">
            Build your personal AI-powered knowledge workspace.
          </p>
        </div>

        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-1.5 block text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Alex"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-1.5 block text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Smith"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="alex@example.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-gray-500 hover:text-[#5140c9]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                aria-pressed={showConfirmPassword}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-gray-500 hover:text-[#5140c9]"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-10 w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#4030c7] to-[#5754df] px-4 text-sm font-medium text-white shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5140c9] focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-center text-[13px] text-gray-700 sm:text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#4932d0] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
