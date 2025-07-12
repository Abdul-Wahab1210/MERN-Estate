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
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl font-semibold text-center ">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center p-2 items-center gap-2 mt-4"
      >
        <div className="relative mb-1 w-full">
          <input
            type="text"
            id="username"
            className="peer w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400 "
            onChange={handleChange}
          />
          <label
            for="username"
            className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
          >
            {!formData.username || formData.username.trim().length === 0
              ? "Username"
              : ""}
          </label>
        </div>
        <div className="relative mb-1 w-full">
          <input
            type="email"
            id="email"
            className="peer w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
            onChange={handleChange}
          />
          <label
            for="email"
            className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
          >
            {!formData.email || formData.email.trim().length === 0
              ? "Email"
              : ""}
          </label>
        </div>
        <div className="relative mb-1 w-full">
          <input
            type="password"
            id="password"
            className="peer w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
            onChange={handleChange}
          />
          <label
            for="password"
            className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
          >
            {!formData.password || formData.password.trim().length === 0
              ? "Password"
              : ""}
          </label>
        </div>
        <button
          disabled={loading}
          className=" opacity-90 w-auto mx-auto bg-slate-700 uppercase text-white rounded-lg px-5 py-3 font-bold hover:opacity-100 hover:scale-105 transition"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-5 font-bold">{error}</p>}
      <div className="flex gap-2 justify-center">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500 hover:font-bold">Sign-in</span>
        </Link>
      </div>
    </div>
  );
}
