import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../store/actions/clientActions";

function LoginPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await dispatch(loginUser(data));

            toast.success("Login successful!");

            if (data.remember) {
                localStorage.setItem(
                    "token",
                    result.token
                );
            }

            history.push("/");
        } catch (error) {
            console.error(error);

            toast.error("Login failed!");
        }
    };

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="mb-8 text-center text-4xl font-bold">
                Login
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded border p-3"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Invalid email",
                            },
                        })}
                    />

                    {errors.email && (
                        <p className="mt-1 text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded border p-3"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />

                    {errors.password && (
                        <p className="mt-1 text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("remember")}
                    />
                    Remember Me
                </label>

                <button
                    type="submit"
                    className="w-full rounded bg-sky-500 py-3 text-white"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;