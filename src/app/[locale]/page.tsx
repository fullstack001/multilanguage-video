import AboutSectionOne from "@/components/About/AboutSectionOne";
// import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
// import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title:
    "Revolutionize Your Social Media and Mailing Campaigns with AI-Powered Interactive Avatars",
  description:
    "Take your digital marketing to the next level with our AI-driven platform, designed to automate social media and mailing campaigns. Engage your audience like never before using lifelike, interactive avatars that communicate in multiple languages. Whether you're targeting a global market or creating personalized content, our solution delivers intelligent, multilingual interactions that captivate and convert.",
  // other metadata
};

// Initialize the font
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <main className={inter.className}>
        <ScrollUp />
        <Hero />
        <Features />
        <Video />
        {/* <Brands /> */}
        <AboutSectionOne />
        {/* <AboutSectionTwo /> */}
        <Testimonials />
      <Pricing />
      <Blog />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
