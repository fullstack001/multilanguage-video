"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/api/auth";
import { useUserStore } from "@/store/userStore";
import useCurrentLocale from "@/lib/hooks/useCurrentLocales";

const ResetPasswordPage = () => {
  const locale = useCurrentLocale();
  const { setTheme } = useTheme();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
    apiError: "",
  });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPasswordToken = searchParams.get("token");

  // Define the validateResetPasswordForm function
  const validateResetPasswordForm = (
    password: string,
    confirmPassword: string,
  ) => {
    let passwordError = "";
    let confirmPasswordError = "";

    if (!password) {
      passwordError = "Password is required";
    }
    if (password !== confirmPassword) {
      confirmPasswordError = "Passwords do not match";
    }

    return { passwordError, confirmPasswordError };
  };

  const handleSubmit = async () => {
    setError({ password: "", confirmPassword: "", apiError: "" });
    setSuccess("");
    setLoading(true);

    // Validate the form
    const { passwordError, confirmPasswordError } = validateResetPasswordForm(
      password,
      confirmPassword,
    );

    if (passwordError || confirmPasswordError) {
      setError({
        password: passwordError || "",
        confirmPassword: confirmPasswordError || "",
        apiError: "",
      });
      setLoading(false);
      return; // If validation fails, don't submit the form
    }

    // If validation passes, call the API
    try {
      const res = await resetPassword(password, resetPasswordToken);
      if (res.status === 200) {
        toast.success("Password reset successfully");
        setSuccess("Password reset successfully");
        setTimeout(() => {
          router.push(`/${locale}/signin`);
        }, 3000);
      } else {
        setError((prev) => ({
          ...prev,
          apiError: res.msg,
        }));
      }
    } catch (err: any) {
      setError((prev) => ({
        ...prev,
        apiError: err.message || "Password reset failed",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Reset your password
                </h3>
                {error.apiError && (
                  <div className="mb-4 text-center text-red-500">
                    {error.apiError}
                  </div>
                )}
                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new Password"
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                  {error.password && (
                    <div className="mt-1 text-red-500">{error.password}</div>
                  )}
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="confirmPassword"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new Password"
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                  {error.confirmPassword && (
                    <div className="mt-1 text-red-500">
                      {error.confirmPassword}
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <button
                    onClick={handleSubmit}
                    className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                  >
                    {loading ? (
                      <Image
                        src="/assets/icons/spinner.svg"
                        alt="Loading spinner"
                        className="h-5 w-5"
                        width={20}
                        height={20}
                      />
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-sm text-primary hover:underline"
                  >
                    Go to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPasswordPage;
