// app/signin/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sign In Page | Revolutionize Your Social Media and Mailing Campaigns with AI-Powered Interactive Avatars",
  description:
    "This is Sign In Page for Revolutionize Your Social Media and Mailing Campaigns with AI-Powered Interactive Avatars",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
