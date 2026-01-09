import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import { fetchPopularCities } from "../../../redux/slices/popularCitiesSlice";
import { MapPin, Phone, Mail, MessageCircle, Star, Calendar, Clock, Building2 } from "lucide-react";

const SectionCard = ({ title, children, icon: Icon }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 space-y-4">
    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
      {Icon && <Icon className="w-5 h-5 text-[#7EC1B1]" />}
      <h3 className="text-xl font-bold text-[#263138]">{title}</h3>
    </div>
    {children}
  </div>
);

const Badge = ({ label, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-700"
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colors[color] || colors.blue}`}>
      {label || "-"}
    </span>
  );
};

const TabbedCard = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Reset expanded state when changing tabs
  const handleTabChange = (idx) => {
    setActiveTab(idx);
    setIsExpanded(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 space-y-4">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => handleTabChange(idx)}
            className={`flex-1 px-6 py-3 font-semibold text-sm transition-all duration-300 relative ${
              activeTab === idx
                ? "text-[#7EC1B1]"
                : "text-gray-600 hover:text-[#7EC1B1]"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              <span>{tab.label}</span>
            </div>
            {activeTab === idx && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7EC1B1] to-[#65a89d]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs[activeTab]?.html ? (
          <div className="relative">
            <div
              className={`prose prose-sm max-w-none text-gray-700 leading-relaxed transition-all duration-300 overflow-hidden ${
                isExpanded ? "max-h-none" : "max-h-[400px]"
              }`}
              dangerouslySetInnerHTML={{ __html: tabs[activeTab].html }}
            />
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            )}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-6 py-2 text-sm font-semibold text-[#7EC1B1] hover:text-white hover:bg-[#7EC1B1] border-2 border-[#7EC1B1] rounded-lg transition-all duration-300"
              >
                {isExpanded ? "View Less" : "View More"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 italic text-center py-8">No content provided</p>
        )}
      </div>
    </div>
  );
};

const PopularCityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const rows = useSelector((state) => state.popularCities?.rows || []);

  const routeCity = location.state?.cityData || location.state?.city || null;
  const storeCity = rows.find((c) => c.id === id || c._id === id) || null;
  const city = routeCity || storeCity || null;

  useEffect(() => {
    if (!city) {
      dispatch(fetchPopularCities());
    }
  }, [city, dispatch]);

  if (!city) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
        <Header2 title="Popular City Details" />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7EC1B1] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading city details...</p>
          </div>
        </div>
      </div>
    );
  }

  const servedCustomers = city.servedCustomers || [];
  const reviews = city.reviews || [];
  const faqs = city.faqs || [];
  const storeLocations = city.storeLocations || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 space-y-6">
      <Header2 title="Popular City Details" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#7EC1B1] to-[#65a89d] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-8 h-8" />
          <h1 className="text-4xl font-bold">{city.city || city.cityName || "Unknown City"}</h1>
        </div>
        <p className="text-xl opacity-90">{city.state || "State not specified"}</p>
      </div>

      {/* Contact Information */}
      <SectionCard title="Contact Information" icon={Phone}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7EC1B1] bg-opacity-10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-[#7EC1B1]" />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Phone Number</div>
              <div className="font-semibold text-[#263138]">{city.mobile || city.contactNumber || "-"}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7EC1B1] bg-opacity-10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#7EC1B1]" />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Email Address</div>
              <div className="font-semibold text-[#263138] break-all">{city.email || city.contactEmail || "-"}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 md:col-span-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">WhatsApp</div>
              {city.whatsappLink || city.whatsAppLink ? (
                <a
                  href={city.whatsappLink || city.whatsAppLink}
                  className="font-semibold text-green-600 hover:text-green-700 break-all underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {city.whatsappLink || city.whatsAppLink}
                </a>
              ) : (
                <div className="font-semibold text-[#263138]">-</div>
              )}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Rich Content - Tabbed UI */}
      <TabbedCard
        tabs={[
          { label: "Overview", icon: MapPin, html: city.overview },
          { label: "Features", icon: Star, html: city.features },
          { label: "Installation", icon: Building2, html: city.installation }
        ]}
      />

      {/* Recently Served Customers */}
      <SectionCard title={`Recently Served Customers (${servedCustomers.length})`} icon={Calendar}>
        {servedCustomers.length === 0 ? (
          <p className="text-gray-400 italic">No served customers added.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servedCustomers.map((c, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-bold text-[#263138] text-lg">{c.customerName || c.name || "-"}</span>
                  <Badge label={c.status} color="green" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-[#7EC1B1]" />
                    <span>{c.serviceDate || c.date || "-"}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-[#7EC1B1] mt-0.5" />
                    <span className="line-clamp-2">{c.address || c.fullAddress || "-"}</span>
                  </div>
                  <div className="text-gray-700 italic bg-white p-2 rounded border-l-4 border-[#7EC1B1]">
                    "{c.customerQuery || c.query || "-"}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Reviews */}
      <SectionCard title={`Customer Reviews (${reviews.length})`} icon={Star}>
        {reviews.length === 0 ? (
          <p className="text-gray-400 italic">No reviews added.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="font-bold text-[#263138] text-lg">{r.customerName || r.name || "-"}</div>
                    <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{r.location || "-"}</span>
                    </div>
                  </div>
                  {r.rating && (
                    <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-yellow-700">{r.rating}</span>
                    </div>
                  )}
                </div>
                <div className="text-gray-700 leading-relaxed text-sm italic border-l-4 border-yellow-400 pl-4 py-2">
                  "{r.reviewText || r.review || "-"}"
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* FAQs */}
      <SectionCard title={`Frequently Asked Questions (${faqs.length})`} icon={MessageCircle}>
        {faqs.length === 0 ? (
          <p className="text-gray-400 italic">No FAQs added.</p>
        ) : (
          <div className="space-y-4">
            {faqs.map((f, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-blue-50 to-transparent">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7EC1B1] text-white flex items-center justify-center font-bold flex-shrink-0">
                    Q
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[#263138] mb-2">{f.question || "-"}</div>
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    A
                  </div>
                  <div className="flex-1 text-gray-700">{f.answer || "-"}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Store Locations */}
      <SectionCard title={`Nearby Stores (${storeLocations.length})`} icon={Building2}>
        {storeLocations.length === 0 ? (
          <p className="text-gray-400 italic">No store locations added.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {storeLocations.map((s, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="font-bold text-[#263138] text-lg">{s.storeName || s.name || "-"}</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-purple-600 mt-0.5" />
                    <span className="line-clamp-2">{s.fullAddress || s.address || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{s.openingHours || s.timing || "-"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Back Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-lg bg-white border-2 border-[#7EC1B1] text-[#7EC1B1] font-semibold hover:bg-[#7EC1B1] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
        >
          ← Back to List
        </button>
      </div>
    </div>
  );
};

export default PopularCityDetails;
