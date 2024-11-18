"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Simple and Affordable Pricing"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
          width="665px"
        />

        <div className="w-full">
          <div
            className="wow fadeInUp mb-8 flex justify-center md:mb-12 lg:mb-16"
            data-wow-delay=".1s"
          >
            <span
              onClick={() => setIsMonthly(true)}
              className={`${
                isMonthly
                  ? "pointer-events-none text-primary"
                  : "text-dark dark:text-white"
              } mr-4 cursor-pointer text-base font-semibold`}
            >
              Monthly
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                <div
                  className={`${
                    isMonthly ? "" : "translate-x-full"
                  } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`${
                isMonthly
                  ? "text-dark dark:text-white"
                  : "pointer-events-none text-primary"
              } ml-4 cursor-pointer text-base font-semibold`}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <PricingBox
            packageName="Lite"
            price="free"
            // price={isMonthly ? "40" : "120"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Access at Author/Reader-Only Level to Embellisher eReader and Creator Editor & Sales Multimedia Landing Page Apps."
          >
            <OfferList
              text="Access at Author/Reader-Only Level to Embellisher eReader"
              status="active"
            />
            {/* <OfferList text="Use with Unlimited Projects" status="active" /> */}
            <OfferList
              text="Creator Editor & Sales Multimedia Landing Page Apps"
              status="active"
            />
            {/* <OfferList text="Email Support" status="active" />
            <OfferList text="Lifetime Access" status="inactive" />
            <OfferList text="Free Lifetime Updates" status="inactive" /> */}
          </PricingBox>
          <PricingBox
            packageName="Basic"
            price={isMonthly ? "15" : "140"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Free access to Embellisher eReader and Creator Editor & Sales Multimedia Landing Page Apps at Author/Publisher Level. Access to marketing, coupons, and pricing of your ePub3 creations and other backend tools for your promotions and landing page multimedia ePub3 documents."
          >
            <OfferList text="Five team members." status="active" />
            <OfferList
              text="Full access to Global Replica Video Creator Platform (123 stock replicas & personal replica creator)."
              status="active"
            />
            <OfferList
              text="Full access to Global Replica Video Conversation Creator Platform (7+ personas, 123 stock replicas and personal replica creator)."
              status="active"
            />
            <OfferList text="3 free personal replicas" status="active" />
            <OfferList
              text="25 new personal replicas per month"
              status="active"
            />
            <OfferList
              text="Up to 3 concurrent conversations"
              status="active"
            />
            <OfferList text="Content Moderation" status="active" />
            <OfferList text="Bring your own audio" status="active" />
            <OfferList
              text="Full access to Global Audience selection, campaign creation for social media marketing with up to seven different channels (Facebook, X, Instagram, Linkedin, YouTube, Pinterest and more to come). Full access to scheduling and transmission of social media campaign, plus full monitoring of results."
              status="active"
            />
          </PricingBox>
          <PricingBox
            packageName="Plus"
            price={isMonthly ? "55" : "500"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Free access to Embellisher eReader and Creator Editor & Sales Multimedia Landing Page Apps at Adminr/Publisher Level. Including user controls and control of organizing and labeling of your ePub3 promotion topics and descriptions for your clients."
          >
            <OfferList text="Ten team members." status="active" />
            <OfferList
              text="Full access to Global Replica Video Creator Platform (123 stock replicas & personal replica creator)."
              status="active"
            />
            <OfferList
              text="Full access to Global Replica Video Conversation Creator Platform (7+ personas, 123 stock replicas and personal replica creator)."
              status="active"
            />
            <OfferList text="10 free personal replicas" status="active" />
            <OfferList
              text="100 new personal replicas per month"
              status="active"
            />
            <OfferList
              text="Conversation recording & transcripts"
              status="active"
            />
            <OfferList text="Content Moderation" status="active" />
            <OfferList text="Content Moderation" status="active" />
            <OfferList text="Bring your own audio" status="active" />
            <OfferList
              text="Full access to Global Audience selection, campaign creation for social media marketing with up to seven different channels (Facebook, X, Instagram, Linkedin, YouTube, Pinterest and more to come). Full access to scheduling and transmission of social media campaign, plus full monitoring of results."
              status="active"
            />
          </PricingBox>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
