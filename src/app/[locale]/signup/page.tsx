"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { googleSignIn } from "@/lib/api/auth";
import { useUserStore } from "@/store/userStore";
import SignupForm from "./components/SignupForm";
import VerificationForm from "./components/VerificationForm";

// Add this type declaration at the top of the file
declare global {
  interface Window {
    google?: any;
  }
}

// export const metadata: Metadata = {
//   title:
//     "Sign Up Page | Revolutionize Your Social Media and Mailing Campaigns with AI-Powered Interactive Avatars",
//   description:
//     "This is Sign Up Page for Revolutionize Your Social Media and Mailing Campaigns with AI-Powered Interactive Avatars",
//   // other metadata
// };

const SignupPage = () => {
  const { setTheme } = useTheme();
  const { login: userLogin } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const handleSignup = async (formData: {
    name: string;
    email: string;
    password: string;
    agreeTerms: boolean;
  }) => {
    setEmail(formData.email);
    setShowVerification(true);
  };

  const handleVerification = async (token: string) => {
    userLogin(token);
    setTheme("light");
    // Handle successful verification (e.g., redirect to dashboard)
    router.push("/dashboard");
  };

  useEffect(() => {
    const showVerificationParam = searchParams.get("showVerification");
    const emailParam = searchParams.get("email");

    if (showVerificationParam === "true" && emailParam) {
      setShowVerification(true);
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  useEffect(() => {
    // Load the Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log(process.env.NEXT_PUBLIC_GOOGLEOAUTH_CLIENT_ID);
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLEOAUTH_CLIENT_ID, // Updated line
          callback: handleGoogleSignIn,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          { theme: "outline", size: "large" },
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleSignIn = async (response: any) => {
    // Handle the sign-in response
    const { credential } = response;

    // Send the credential to your backend for verification and user creation/login
    try {
      const result = await googleSignIn(credential);

      if (result.ok) {
        // Redirect to dashboard or home page after successful sign-in
        router.push("/dashboard");
      } else {
        console.error("Google sign-in failed");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="lg:pb-28 lg:pt-[180px]">
          <div className="container" style={{ paddingTop: "100px" }}>
            <div className="-mx-4  flex flex-wrap">
              <div className="w-full px-4">
                <div className="mx-auto  max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                  <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                    {showVerification
                      ? "Verify Your Account"
                      : "Create your account"}
                  </h3>
                  {!showVerification ? (
                    <SignupForm onSuccess={handleSignup} />
                  ) : (
                    <VerificationForm
                      email={email}
                      onSubmit={handleVerification}
                    />
                  )}
                  <p className="text-center text-base font-medium text-body-color">
                    Already using Startup?{" "}
                    <Link
                      href="/signin"
                      className="text-primary hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-0 z-[-1]">
            <svg
              width="1440"
              height="969"
              viewBox="0 0 1440 969"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_95:1005"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1440"
                height="969"
              >
                <rect width="1440" height="969" fill="#090E34" />
              </mask>
              <g mask="url(#mask0_95:1005)">
                <path
                  opacity="0.1"
                  d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                  fill="url(#paint0_linear_95:1005)"
                />
                <path
                  opacity="0.1"
                  d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                  fill="url(#paint1_linear_95:1005)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_95:1005"
                  x1="1178.4"
                  y1="151.853"
                  x2="780.959"
                  y2="453.581"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4A6CF7" />
                  <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_95:1005"
                  x1="160.5"
                  y1="220"
                  x2="1099.45"
                  y2="1192.04"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4A6CF7" />
                  <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default SignupPage;
