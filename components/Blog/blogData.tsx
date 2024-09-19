import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "How AI is Revolutionizing Social Media Marketing",
    paragraph:
      "Discover how AI is transforming the way businesses handle social media campaigns. From automating posts to analyzing engagement in real-time, this blog explores the benefits of AI for marketers. Learn how interactive avatars add a human touch to automated interactions and boost engagement.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Samuyl Joshi",
      image: "/images/blog/author-01.png",
      designation: "Graphic Designer",
    },
    tags: ["automation"],
    publishDate: "2024",
  },
  {
    id: 2,
    title: "Personalized Email Campaigns at Scale: The Power of AI Automation",
    paragraph:
      "AI makes it easier than ever to personalize email campaigns, even at scale. This blog explains how businesses can automate email content creation and targeting, while ensuring that each message feels tailored to individual recipients, driving higher conversion rates.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Musharof Chy",
      image: "/images/blog/author-02.png",
      designation: "Content Writer",
    },
    tags: ["Email Campaigns"],
    publishDate: "2024",
  },
  {
    id: 3,
    title:
      " The Future of Customer Engagement: Interactive Avatars and AI-Powered Conversations",
    paragraph:
      "Interactive avatars are the future of customer engagement. In this post, we explore how AI-driven avatars can converse with customers in real-time, providing personalized experiences in multiple languages. Find out how this technology enhances user interactions across platforms.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Lethium Deo",
      image: "/images/blog/author-03.png",
      designation: "Graphic Designer",
    },
    tags: ["Engagement"],
    publishDate: "2024",
  },
];
export default blogData;
