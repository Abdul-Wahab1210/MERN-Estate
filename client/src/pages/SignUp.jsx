import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl font-semibold text-center ">Sign Up</h1>
      <form className="flex flex-col justify-center p-2 items-center gap-2 mt-4">
        <div className="relative mb-1 w-full">
          <input
            type="text"
            id="username"
            className="peer w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400 "
          />
          <label
            for="name"
            className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Username
          </label>
        </div>
        <div className="relative mb-1 w-full">
          <input
            type="email"
            id="email"
            className="peer w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <label
            for="name"
            className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Email
          </label>
        </div>
        <div className="relative mb-1 w-full">
          <input
            type="password"
            id="name"
            className="peer w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <label
            for="name"
            className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Password
          </label>
        </div>
        <button className=" opacity-90 w-auto mx-auto bg-slate-700 uppercase text-white rounded-lg px-5 py-3 font-bold hover:opacity-100 hover:scale-105 transition">
          Sign up
        </button>
      </form>
      <div className="flex gap-2 justify-center">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500 hover:font-bold">Sign-in</span>
        </Link>
      </div>
    </div>
  );
}
