"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, requestPasswordReset } from "../../../lib/api/auth";
import { validateSigninForm, validateEmail } from "./validate";
import { useUserStore } from "../../../store/userStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button, Label, TextInput } from "flowbite-react";

const SigninPage = () => {
  const { setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", apiError: "" });
  const [success, setSuccess] = useState("");
  const { login: userLogin } = useUserStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleSubmit = async () => {
    setError({ email: "", password: "", apiError: "" });
    setSuccess("");
    setLoading(true);

    // Validate the form
    const { emailError, passwordError } = validateSigninForm(email, password);

    if (emailError || passwordError) {
      setError({
        email: emailError || "",
        password: passwordError || "",
        apiError: "",
      });
      setLoading(false);
      return; // If validation fails, don't submit the form
    }

    // If validation passes, call the API
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        const { token } = response.data;
        userLogin(token);
        setTheme("light");
        router.push("/dashboard");
      } else {
        if (response.msg === "not_verified") {
          toast.error("Please verify your email to continue");

          // Add this line to redirect to the signup page with showVerification=true
          router.push(
            "/signup?showVerification=true&email=" + encodeURIComponent(email),
          );
        } else {
          setError((prev) => ({
            ...prev,
            apiError: response.msg,
          }));
        }
      }
    } catch (err: any) {
      if (err.message === "email") {
        setError((prev) => ({
          ...prev,
          email: "User not found",
        }));
      } else if (err.message === "password") {
        setError((prev) => ({
          ...prev,
          password: "Invalid Password",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          apiError: err.message || "Login failed",
        }));
      }
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (validateEmail(forgotPasswordEmail)) {
      console.log(validateEmail(forgotPasswordEmail));
      toast.error("Please enter a valid email");
      return;
    }
    console.log("button click", forgotPasswordEmail);

    try {
      const response = await requestPasswordReset(forgotPasswordEmail);
      if (response.status === 200) {
        setShowForgotPasswordModal(false);
        toast.success(
          "Reset password request success, check your email for further instructions.",
        );
      } else {
        toast.error("Failed to request password reset");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to request password reset");
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
                  Sign in to your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Login to your account for a faster checkout.
                </p>
                {error.apiError && (
                  <div className="mb-4 text-center text-red-500">
                    {error.apiError}
                  </div>
                )}
                {/* <button className="mb-6 flex w-full items-center justify-center rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
                  <span className="mr-3">
                    <Image
                      src="/assets/icons/google.svg"
                      alt="google"
                      width={24}
                      height={24}
                    />
                  </span>
                  Sign in with Google
                </button>

                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Or, sign in with your email
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                </div> */}
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                  {error.email && (
                    <div className="mt-1 text-red-500">{error.email}</div>
                  )}
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                  {error.password && (
                    <div className="mt-1 text-red-500">{error.password}</div>
                  )}
                </div>
                <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <label
                      htmlFor="checkboxLabel"
                      className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="checkboxLabel"
                          className="sr-only"
                        />
                        <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                          <span className="opacity-0">
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                fill="#3056D3"
                                stroke="#3056D3"
                                strokeWidth="0.4"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      Keep me signed in
                    </label>
                  </div>
                  <div>
                    <button
                      onClick={() => setShowForgotPasswordModal(true)}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <button
                    onClick={handleSubmit}
                    className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                  >
                    {/* Conditionally render the spinner or text based on loading state */}
                    {loading ? (
                      <Image
                        src="/assets/icons/spinner.svg"
                        alt="Loading spinner"
                        className="h-5 w-5"
                        width={20}
                        height={20}
                      />
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>
                <p className="text-center text-base font-medium text-body-color">
                  Don't you have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forgot Password Modal */}
      <Modal
        show={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      >
        <Modal.Header>Forgot Password Request</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
                type="email"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleForgotPassword}>Send Reset Link</Button>
          <Button
            color="gray"
            onClick={() => setShowForgotPasswordModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SigninPage;
