"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const handleGoogleSignIn = () => {
  authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });
};
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData.entries());
    const passValidation = !/[A-Z]/.test(user.password)
      ? "Must contain an uppercase letter"
      : !/[a-z]/.test(user.password)
        ? "Must contain a lowercase letter"
        : user.password.length < 6
          ? "Must be at least 6 characters"
          : "";
    if (passValidation) {
      toast.add({ title: passValidation, type: "error" });
      return;
    }
    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.photoUrl,
    });
    if (data) {
      toast.add({ title: "Registered successfully", type: "success" });
      router.push("/login");
    }
    if (error) {
      toast.add({
        title: "Registration failed",
        description: error.message,
        type: "error",
      });
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-5 py-16 dark:bg-slate-900 sm:px-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            StudioSpace
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
            Create your account
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Join StudioSpace and discover your next creative workspace.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              id="name"
              name="name"
              placeholder="Your name"
              required
              type="text"
            />
          </div>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              htmlFor="photoUrl"
            >
              Photo URL
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              id="photoUrl"
              name="photoUrl"
              placeholder="https://example.com/photo.jpg"
              type="url"
            />
          </div>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              id="password"
              name="password"
              placeholder="Create a password"
              required
              type="password"
            />
          </div>
          <button
            className="w-full rounded-lg bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
            type="submit"
          >
            Register
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          OR
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>
        <button onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          type="button"
        >
          <span className="font-bold text-red-500">G</span> Continue with Google
        </button>
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            className="font-semibold text-cyan-700 hover:text-cyan-600 dark:text-cyan-400"
            href="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
