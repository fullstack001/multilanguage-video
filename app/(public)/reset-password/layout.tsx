// app/signin/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Reset Password | Revolutionize Your Social Media and Mailing Campaigns with AI-Powered Interactive Avatars",
  description:
    "This is Reset Password Page for Revolutionize Your Social Media and Mailing Campaigns with AI-Powered Interactive Avatars",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
