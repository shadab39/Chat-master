import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        userInfo,
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        toast.success("Login successful");
      }

      localStorage.setItem("ChatApp", JSON.stringify(response.data));
      setAuthUser(response.data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-white px-6 py-2 rounded-md space-y-3 w-96"
        >
          <h1 className="text-2xl text-center">
            Chat<span className="text-green-500 font-semibold">App</span>
          </h1>

          <h2 className="text-xl text-white font-bold">Login</h2>

          <br />

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="email"
              className="grow"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>

          {errors.email && (
            <span className="text-red-500 text-sm">
              Email is required
            </span>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </label>

          {errors.password && (
            <span className="text-red-500 text-sm">
              Password is required
            </span>
          )}

          <div className="flex justify-between items-center">
            <p>
              New user?
              <Link
                to="/signup"
                className="text-blue-500 underline ml-1"
              >
                Signup
              </Link>
            </p>

            <input
              type="submit"
              value="Login"
              className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;