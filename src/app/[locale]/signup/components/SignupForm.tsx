import React, { useState } from "react";
import Link from "next/link";
import { signup } from "@/lib/api/auth";

interface SignupFormProps {
  onSuccess: (formData: {
    name: string;
    email: string;
    password: string;
    agreeTerms: boolean;
  }) => Promise<"exist" | void>;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    agreeTerms: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "", agreeTerms: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms and Conditions";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await signup(
        formData.email,
        formData.password,
        formData.name,
      );
      if (result.status === 200) {
        onSuccess(formData);
      } else {
        setErrors((prev) => ({
          ...prev,
          email:
            result.message === "exist"
              ? "The user already exists"
              : result.message,
        }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: "An unexpected error occurred" }));
      console.error("Error during signup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <label
          htmlFor="name"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          className={`w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none
                        ${
                          errors.name
                            ? "border-red-500 bg-red-100 dark:bg-red-900"
                            : "border-stroke bg-[#f8f8f8]"
                        }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>
      <div className="mb-8">
        <label
          htmlFor="email"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          Work Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your Email"
          className={`w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none
                        ${
                          errors.email
                            ? "border-red-500 bg-red-100 dark:bg-red-900"
                            : "border-stroke bg-[#f8f8f8]"
                        }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
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
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your Password"
          className={`w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none
                        ${
                          errors.password
                            ? "border-red-500 bg-red-100 dark:bg-red-900"
                            : "border-stroke bg-[#f8f8f8]"
                        }`}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password}</p>
        )}
      </div>
      <div className="mb-8 flex">
        <label
          htmlFor="agreeTerms"
          className={`flex cursor-pointer select-none text-sm font-medium ${
            errors.agreeTerms ? "text-red-500" : "text-body-color"
          }`}
        >
          <div className="relative">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div
              className={`box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border ${
                errors.agreeTerms
                  ? "border-red-500"
                  : "border-body-color border-opacity-20 dark:border-white dark:border-opacity-10"
              }`}
            >
              <span
                className={`opacity-0 ${
                  formData.agreeTerms ? "opacity-100" : ""
                }`}
              >
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
          <span>
            By creating account means you agree to the
            <a href="#0" className="text-primary hover:underline">
              {" "}
              Terms and Conditions{" "}
            </a>
            , and our
            <a href="#0" className="text-primary hover:underline">
              {" "}
              Privacy Policy{" "}
            </a>
          </span>
        </label>
      </div>
      {errors.agreeTerms && (
        <p className="mb-4 text-xs text-red-500">{errors.agreeTerms}</p>
      )}
      <div className="mb-6">
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 disabled:opacity-50 dark:shadow-submit-dark"
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
