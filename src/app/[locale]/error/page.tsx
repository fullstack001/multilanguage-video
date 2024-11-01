import Link from "next/link";
import { Metadata } from "next";

// Dummy login status for demonstration; replace this with real auth logic
const isLoggedIn = true; // Set dynamically based on user authentication status

export const metadata: Metadata = {
  title: "Error Page | Free Next.js Template for Startup and SaaS",
  description: "This is Error Page for Startup Nextjs Template",
  // other metadata
};

const ErrorPage = () => {
  return (
    <>
      <section className="relative z-10 pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[530px] text-center">
                <div className="mx-auto mb-9 text-center">
                  {/* SVG icon code remains unchanged */}
                </div>
                <h3 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                  Sorry, the page can’t be found
                </h3>
                <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  The page you were looking for appears to have been moved,
                  deleted, or does not exist.
                </p>
                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    className="rounded-md bg-primary px-8 py-3 text-base font-bold text-white shadow-signUp duration-300 hover:bg-white hover:text-primary md:px-9 lg:px-8 xl:px-9"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/"
                    className="rounded-md bg-primary px-8 py-3 text-base font-bold text-white shadow-signUp duration-300 hover:bg-white hover:text-primary md:px-9 lg:px-8 xl:px-9"
                  >
                    Back to Homepage
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] hidden sm:block">
          {/* SVG background remains unchanged */}
        </div>
        <div className="absolute right-0 top-0 z-[-1] hidden sm:block">
          {/* SVG background remains unchanged */}
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
