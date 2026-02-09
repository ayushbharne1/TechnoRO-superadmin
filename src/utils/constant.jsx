import appStore from "../assets/appStore.png";
import playstore from "../assets/googleplay.png";
import x from "../assets/X.png";
import facebook from "../assets/Facebook.png";
import insta from "../assets/Instagram.png";
import linkedin from "../assets/Linkedin.png";
import video1 from "../assets/v1.png";
import video2 from "../assets/v2.png";
import video3 from "../assets/v3.png";
import video4 from "../assets/v4.png";

// React Icons
import { LuLayoutDashboard } from "react-icons/lu";
import { FaHandshakeSimple } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { BiSolidFactory } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import { PiChartLineUp } from "react-icons/pi";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdArticle } from "react-icons/md";


// Custom Icons
import {
  ServiceEngineerIcon,
  LeadManagementIcon,
  NotificationIcon,
  ProfileIcon,
} from "../components/CustomIcons/CustomIcons";

import { HiOutlineUserCircle } from "react-icons/hi";
export const footerItems = [
  {
    heading: "Company",
    items: [
      { id: 1, name: "About Us", path: "/about-us" },
      { id: 2, name: "Terms & Conditions", path: "/terms-conditions" },
      { id: 3, name: "Privacy Policy", path: "/privacy-policy" },
      { id: 4, name: "Careers", path: "/careers" },
    ],
  },
  {
    heading: "For Customers",
    items: [{ id: 1, name: "Contact Us", path: "/contact-us" }],
  },
  {
    heading: "For Partners",
    items: [
      {
        id: 1,
        name: "Register as a professional",
        path: "/register-professional",
      },
    
    ],
  },
  {
    heading: "Social Links",
    socialIcons: [
      { id: 1, icon: x, link: "https://twitter.com" },
      { id: 2, icon: facebook, link: "https://facebook.com" },
      { id: 3, icon: insta, link: "https://instagram.com" },
      { id: 4, icon: linkedin, link: "https://linkedin.com" },
    ],
    appLinks: [
      { id: 1, img: playstore, link: "https://play.google.com/store" },
      { id: 2, img: appStore, link: "https://www.apple.com/app-store/" },
    ],
  },
];

export const recommendedVideoItems = [
  {
    id: 1,
    img: video4,
    title: "How to make payment for your service and purchase?",
  },
  { id: 2, img: video1, title: "Why you need to buy AMC for your RO?" },
  { id: 3, img: video2, title: "How to book service for your RO?" },
  { id: 4, img: video3, title: "How to purchase AMC for your RO?" },
  {
    id: 5,
    img: video4,
    title: "How to make payment for your service and purchase?",
  },
];

export const sidebarItems = [
  {
    groupName: "",
    groupItems: [
      {
        id: 1,
        name: "Dashboard",
        icon: <LuLayoutDashboard />,
        path: "/dashboard",
      },
          {
        id: 2,
        name: "Popular Cities",
        icon: <FaMapLocationDot />,
        path: "/popular-cities",
      },
    ],
  },
  {
    groupName: "Content Management",
    groupItems: [
      {
        id: 1,
        name: "Blog",
        icon: <MdArticle />,
        path: "/blog",
      },
    ],
  },
  {
    groupName: "Users",
    groupItems: [
      {
        id: 1,
        name: "Manufacturer",
        icon: <BiSolidFactory />,
        path: "/manufacturer",
      },
      { id: 2, name: "Vendors", icon: <FaHandshakeSimple />, path: "/vendors" },
      {
        id: 3,
        name: "Service Engineer",
        icon: <ServiceEngineerIcon />,
        path: "/service-engineer",
      },
      { id: 4, name: "Customers", icon: <GoPeople />, path: "/customers" },
    ],
  },
  {
    groupName: "Lead Management",
    groupItems: [
      {
        id: 1,
        name: "Lead Management",
        icon: <LeadManagementIcon />,
        path: "/lead-management",
      },
      {
        id: 2,
        name: "Order Management",
        path: "/order-management",
        icon: (
          <div className="w-6 h-6 hover:text-white">
            <svg
              xmlns="http:www.w3.org/2000/svg"
              viewBox="0 0 20 18"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M1.9998 18V5.1L0.0498047 0.85L1.8498 0L4.1998 5.05H15.7998L18.1498 0L19.9498 0.85L17.9998 5.1V18H1.9998ZM7.9998 11H11.9998C12.2831 11 12.5208 10.904 12.7128 10.712C12.9048 10.52 13.0005 10.2827 12.9998 10C12.9991 9.71733 12.9031 9.48 12.7118 9.288C12.5205 9.096 12.2831 9 11.9998 9H7.9998C7.71647 9 7.47914 9.096 7.2878 9.288C7.09647 9.48 7.00047 9.71733 6.9998 10C6.99914 10.2827 7.09514 10.5203 7.2878 10.713C7.48047 10.9057 7.7178 11.0013 7.9998 11Z" />
            </svg>
          </div>
        ),
      },
    ],
  },
  {
    groupName: "Product Management",
    groupItems: [
      {
        id: 1,
        name: "Products & Spare Parts",
        path: "/product",
        icon: (
          <div className="w-6 h-6 hover:text-white">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 7L12 2L2 7V17L12 22L22 17V7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M2 7L12 12M12 12V22M12 12L22 7M17 4.5L7 9.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ),
      },

      {
        id: 2,
        name: "Services",
        path: "/services",
        icon: (
          <div className="w-6 h-6 hover:text-white">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http:www.w3.org/2000/svg"
            >
              <path d="M16.1998 2.39844C15.4032 2.39845 14.6164 2.57471 13.8959 2.91458C13.1755 3.25445 12.5391 3.74952 12.0325 4.36428C11.5259 4.97905 11.1616 5.69829 10.9657 6.47043C10.7698 7.24258 10.7471 8.04851 10.8994 8.83044L3.18817 16.82C2.66415 17.3569 2.37488 18.08 2.384 18.8302C2.39311 19.5804 2.69986 20.2962 3.23677 20.8202C3.77367 21.3442 4.49675 21.6335 5.24693 21.6244C5.99711 21.6153 6.71295 21.3085 7.23697 20.7716L10.8046 17.1584C10.844 16.0682 11.1531 15.0048 11.7042 14.0633C12.2552 13.1219 13.031 12.3316 13.9623 11.7634C14.8935 11.1951 15.951 10.8665 17.0403 10.807C18.1296 10.7475 19.2166 10.959 20.2042 11.4224C20.7874 10.777 21.2064 10.0004 21.4258 9.15858C21.6451 8.31674 21.6583 7.43444 21.4642 6.58644C21.4403 6.48193 21.3888 6.38574 21.3151 6.30787C21.2414 6.23 21.1482 6.1733 21.0452 6.14365C20.9422 6.114 20.8331 6.1125 20.7293 6.1393C20.6255 6.1661 20.5308 6.22022 20.455 6.29604L17.3998 9.35004L14.6494 6.59844L17.7034 3.54444C17.7789 3.46861 17.8327 3.37397 17.8593 3.27033C17.8859 3.16669 17.8843 3.05782 17.8547 2.955C17.8251 2.85218 17.7685 2.75915 17.6908 2.68556C17.6132 2.61196 17.5172 2.56048 17.413 2.53644C17.0155 2.44481 16.6089 2.39851 16.201 2.39844M12.763 16.7024C13.0728 16.6232 13.3637 16.4828 13.6186 16.2895C13.8734 16.0962 14.0871 15.8539 14.2469 15.5769C14.4068 15.2998 14.5097 14.9936 14.5495 14.6763C14.5894 14.3589 14.5654 14.0368 14.479 13.7288L14.293 13.0604C14.5986 12.826 14.927 12.6272 15.2782 12.464L15.6838 12.8936C15.908 13.1316 16.1786 13.3212 16.4788 13.4509C16.779 13.5805 17.1025 13.6475 17.4295 13.6476C17.7565 13.6477 18.0801 13.581 18.3804 13.4515C18.6807 13.3221 18.9513 13.1327 19.1758 12.8948L19.5646 12.482C19.923 12.6516 20.257 12.8592 20.5666 13.1048L20.4154 13.6112C20.3218 13.9245 20.2931 14.2535 20.3312 14.5782C20.3694 14.9029 20.4734 15.2164 20.637 15.4995C20.8006 15.7825 21.0203 16.0292 21.2826 16.2243C21.545 16.4194 21.8444 16.5588 22.1626 16.634L22.5814 16.7324C22.6295 17.1376 22.6335 17.5468 22.5934 17.9528L22.0414 18.0944C21.7314 18.1736 21.4403 18.3139 21.1854 18.5071C20.9304 18.7003 20.7166 18.9426 20.5566 19.2197C20.3966 19.4967 20.2937 19.8029 20.2537 20.1204C20.2138 20.4378 20.2378 20.76 20.3242 21.068L20.5114 21.7352C20.205 21.9712 19.8762 22.1704 19.525 22.3328L19.1194 21.9032C18.8952 21.6654 18.6248 21.4758 18.3247 21.3462C18.0247 21.2165 17.7013 21.1496 17.3745 21.1493C17.0476 21.1491 16.7242 21.2156 16.424 21.3449C16.1237 21.4741 15.8531 21.6633 15.6286 21.9008L15.2386 22.3148C14.8819 22.1466 14.5457 21.938 14.2366 21.6932L14.389 21.1856C14.4828 20.8723 14.5115 20.5431 14.4735 20.2183C14.4355 19.8935 14.3315 19.5798 14.1679 19.2966C14.0043 19.0134 13.7845 18.7667 13.522 18.5715C13.2596 18.3763 12.9601 18.2369 12.6418 18.1616L12.2218 18.0632C12.1737 17.6585 12.1697 17.2497 12.2098 16.844L12.763 16.7024ZM16.201 17.3984C16.201 17.7167 16.3274 18.0219 16.5524 18.247C16.7775 18.472 17.0827 18.5984 17.401 18.5984C17.7192 18.5984 18.0245 18.472 18.2495 18.247C18.4745 18.0219 18.601 17.7167 18.601 17.3984C18.601 17.0802 18.4745 16.775 18.2495 16.5499C18.0245 16.3249 17.7192 16.1984 17.401 16.1984C17.0827 16.1984 16.7775 16.3249 16.5524 16.5499C16.3274 16.775 16.201 17.0802 16.201 17.3984Z" />
            </svg>
          </div>
        ),
      },
      {
        id: 3,
        name: "AMC Plan",
        path: "/amc",
        icon: (
          <div className="w-6 h-6 hover:text-white">
            <MdArticle />
          </div>
        ),
      },
    ],
  },
  {
    groupName: "Send Notification & Messages",
    groupItems: [
      {
        id: 1,
        name: "Send Notification",
        icon: <NotificationIcon />,
        path: "/send-notification",
      },
      { id: 2, name: "Message", icon: <TiMessages />, path: "/message" },
    ],
  },

  {
    groupName: "Roles & Permissions",
    groupItems: [
      {
        id: 1,
        name: "Roles & Permissions",
        icon: <HiOutlineUserCircle />,
        path: "/roles-permission",
      },
    ],
  },

  {
    groupName: "Report & Analytics",
    groupItems: [
      {
        id: 1,
        name: "Report & Analytics",
        icon: <PiChartLineUp />,
        path: "/report-analytics",
      },
    ],
  },

  {
    groupName: "Account",
    groupItems: [
      { id: 1, name: "Profile", icon: <ProfileIcon />, path: "/profile" },
      { id: 2, name: "Logout", icon: <CiLogout />, path: "/", isLogout: true },
    ],
  },
];
