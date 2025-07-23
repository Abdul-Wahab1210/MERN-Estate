import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || formData.email.trim().length === 0) {
      setError("Email is required.");

      return;
    }

    if (!formData.password || formData.password.trim().length === 0) {
      setError("Password is required.");

      return;
    }

    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (fetchError) {
      dispatch(signInFailure(error.message));
    }
  };
  console.log(formData);
  return (
    <div className="h-[90vh] flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-400 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-6">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 mt-4 text-center font-semibold">{error}</p>
        )}

        <div className="mt-6 text-sm flex justify-center gap-1">
          <p>Do't have an account?</p>
          <Link
            to="/sign-up"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
