import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || formData.username.trim().length === 0) {
      setError("Username is required.");

      return;
    }

    if (!formData.email || formData.email.trim().length === 0) {
      setError("Email is required.");

      return;
    }

    if (!formData.password || formData.password.trim().length === 0) {
      setError("Password is required.");

      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        setError(data.message);
        console.error("Signup failed:", data.message);
        setLoading(false);
        return;
      }

      console.log("Signup successful:", data.message);

      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };
  console.log(formData);
  return (
    <div className="h-[90vh] flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-400 px-4 ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-6">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative w-full">
            <input
              type="text"
              id="username"
              className="peer w-full border border-gray-300 rounded-md px-3 pt-4 pb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              placeholder=" "
            />
            <label
              htmlFor="username"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
            >
              {!formData.username || formData.username.trim().length === 0
                ? "Username"
                : ""}
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="email"
              id="email"
              className="peer w-full border border-gray-300 rounded-md px-3 pt-4 pb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
            >
              {!formData.email || formData.email.trim().length === 0
                ? "Email"
                : ""}
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="password"
              id="password"
              className="peer w-full border border-gray-300 rounded-md px-3 pt-4 pb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
            >
              {!formData.password || formData.password.trim().length === 0
                ? "Password"
                : ""}
            </label>
          </div>

          <button
            disabled={loading}
            className={`w-full text-white font-semibold py-3 rounded-lg transition-transform duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 mt-4 text-center font-semibold">{error}</p>
        )}

        <div className="mt-6 text-sm flex justify-center gap-1">
          <p>Have an account?</p>
          <Link
            to="/sign-in"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
