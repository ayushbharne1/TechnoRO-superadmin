import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import { fetchPopularCities } from "../../../redux/slices/popularCitiesSlice";

const SectionCard = ({ title, children }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3">
    <h3 className="text-lg font-semibold text-[#263138]">{title}</h3>
    {children}
  </div>
);

const RichBlock = ({ title, html }) => (
  <SectionCard title={title}>
    {html ? (
      <div
        className="prose prose-sm max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    ) : (
      <p className="text-gray-500">Not provided</p>
    )}
  </SectionCard>
);

const Badge = ({ label }) => (
  <span className="inline-block px-2 py-1 text-xs rounded bg-[#F4FAF8] text-[#0088FF] font-medium">
    {label || "-"}
  </span>
);

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
      <div className="min-h-screen bg-white p-4 sm:p-6">
        <Header2 title="Popular City Details" />
        <div className="text-center text-gray-600 py-16">Loading city details...</div>
      </div>
    );
  }

  const servedCustomers = city.servedCustomers || [];
  const reviews = city.reviews || [];
  const faqs = city.faqs || [];
  const storeLocations = city.storeLocations || [];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 space-y-6">
      <Header2 title="Popular City Details" />

      <SectionCard title="City Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-500">City</div>
            <div className="font-semibold text-[#263138]">{city.city || city.cityName || "-"}</div>
          </div>
          <div>
            <div className="text-gray-500">State</div>
            <div className="font-semibold text-[#263138]">{city.state || "-"}</div>
          </div>
          <div>
            <div className="text-gray-500">Contact Number</div>
            <div className="font-semibold text-[#263138]">{city.mobile || city.contactNumber || "-"}</div>
          </div>
          <div>
            <div className="text-gray-500">Contact Email</div>
            <div className="font-semibold text-[#263138]">{city.email || city.contactEmail || "-"}</div>
          </div>
          <div>
            <div className="text-gray-500">WhatsApp Link</div>
            {city.whatsappLink || city.whatsAppLink ? (
              <a
                href={city.whatsappLink || city.whatsAppLink}
                className="font-semibold text-[#0088FF] break-all"
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
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RichBlock title="Overview" html={city.overview} />
        <RichBlock title="Features" html={city.features} />
        <RichBlock title="Installation" html={city.installation} />
      </div>

      <SectionCard title={`Recently Served Customers (${servedCustomers.length})`}>
        {servedCustomers.length === 0 ? (
          <p className="text-gray-500">No served customers added.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {servedCustomers.map((c, idx) => (
              <div key={idx} className="border border-gray-200 rounded-md p-3 space-y-1 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#263138]">{c.customerName || c.name || "-"}</span>
                  <Badge label={c.status} />
                </div>
                <div className="text-gray-600">Date: {c.serviceDate || c.date || "-"}</div>
                <div className="text-gray-600">Address: {c.address || c.fullAddress || "-"}</div>
                <div className="text-gray-600">Query: {c.customerQuery || c.query || "-"}</div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title={`Reviews (${reviews.length})`}>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews added.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reviews.map((r, idx) => (
              <div key={idx} className="border border-gray-200 rounded-md p-3 space-y-1 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#263138]">{r.customerName || r.name || "-"}</span>
                  <Badge label={r.rating ? `${r.rating}★` : "-"} />
                </div>
                <div className="text-gray-600">Location: {r.location || "-"}</div>
                <div className="text-gray-700 leading-relaxed">{r.reviewText || r.review || "-"}</div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title={`FAQs (${faqs.length})`}>
        {faqs.length === 0 ? (
          <p className="text-gray-500">No FAQs added.</p>
        ) : (
          <div className="space-y-3">
            {faqs.map((f, idx) => (
              <div key={idx} className="border border-gray-200 rounded-md p-3 space-y-1 text-sm">
                <div className="font-semibold text-[#263138]">Q: {f.question || "-"}</div>
                <div className="text-gray-700">A: {f.answer || "-"}</div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title={`Nearby Stores (${storeLocations.length})`}>
        {storeLocations.length === 0 ? (
          <p className="text-gray-500">No store locations added.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {storeLocations.map((s, idx) => (
              <div key={idx} className="border border-gray-200 rounded-md p-3 space-y-1 text-sm">
                <div className="font-semibold text-[#263138]">{s.storeName || s.name || "-"}</div>
                <div className="text-gray-600">Address: {s.fullAddress || s.address || "-"}</div>
                <div className="text-gray-600">Hours: {s.openingHours || s.timing || "-"}</div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <div className="flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PopularCityDetails;
