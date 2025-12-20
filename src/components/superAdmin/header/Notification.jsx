

import React from "react";
import {
  Package,
  Zap,
  MessageSquare,
  Clock,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header2 from "./Header2";

// Export notifications so Header2 can use them
export const notifications = [
  {
    id: 1,
    icon: <Package className="w-12 h-12 text-pink-500" />,
    title: "New Order Received",
    detail: "2 new order received",
    route: "/order-management",
  },
  {
    id: 2,
    icon: <Zap className="w-12 h-12 text-purple-500" />,
    title: "New Lead Received",
    detail: "2 new lead received",
    route: "/lead-management",
  },
  {
    id: 3,
    icon: <MessageSquare className="w-12 h-12 text-blue-500" />,
    title: "New Message Received",
    detail: "6 new message received",
    route: "/message",
  },
  {
    id: 4,
    icon: <Clock className="w-12 h-12 text-cyan-500" />,
    title: "Service Delay",
    detail: "Delay on Water Purifier Maintenance Service",
    route: "/lead-management",
  },
  {
    id: 5,
    icon: <Truck className="w-12 h-12 text-orange-500" />,
    title: "Delivery Delay",
    detail: "Delay on Kent Grand Plus RO delivery",
    route: "/order-management",
  },
];

const NotificationScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      {/* Header */}
      <Header2 />

      {/* Notification List */}
      <div className="space-y-6 mt-6">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="flex items-center justify-between bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">{note.icon}</div>
              <div>
                <h2 className="text-gray-800 font-semibold text-xl">
                  {note.title}
                </h2>
                <p className="text-gray-500 text-base mt-1">{note.detail}</p>
              </div>
            </div>

            <button
              onClick={() => navigate(note.route)}
              className="text-teal-600 font-semibold hover:underline text-base md:text-lg transition"
            >
              Check Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationScreen;
