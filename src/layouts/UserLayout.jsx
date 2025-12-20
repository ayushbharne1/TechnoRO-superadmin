// import React from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Header from "../components/user/header/Header";
// import Footer from "../components/user/footer/Footer";
// import Home from "../components/user/Home";
// import TermsCondition from "../components/user/TermsCondition";
// import About from "../components/user/About";
// import Contact from "../components/user/Contact";
// import RegisterProfessional from "../components/user/RegisterProfessional";
// import ChatWithUs from "../components/user/ChatWithUs";

// const Services = () => <h1>Services</h1>;
// const Products = () => <h1>Products</h1>;

// const UserLayout = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header at the Top */}
//       <Header />

//       {/* Main Content (Grows to push footer down) */}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route index element={<Home />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/services" element={<Products />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/terms-conditions" element={<TermsCondition />} />
//         <Route path="/about-us" element={<About />} />
//         <Route path="/contact-us" element={<Contact />} />
//         <Route
//           path="/register-professional"
//           element={<RegisterProfessional />}
//         />
//         <Route path="/chat" element={<ChatWithUs />} />
//       </Routes>

//       {/* Footer at the Bottom */}
//       <Footer />
//     </div>
//   );
// };

// export default UserLayout;


import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/user/header/Header";
import Footer from "../components/user/footer/Footer";
import Home from "../components/user/Home";
import TermsCondition from "../components/user/TermsCondition";
import About from "../components/user/About";
import Contact from "../components/user/Contact";
import RegisterProfessional from "../components/user/RegisterProfessional";
import ChatWithUs from "../pages/modules/Help&Support/ChatWithUs";

// Temporary placeholders
const Services = () => <h1>Services</h1>;
const Products = () => <h1>Products</h1>;

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content grows to push footer down */}
      <main className="flex-1 p-4 md:p-6 w-full overflow-x-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/terms-conditions" element={<TermsCondition />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/register-professional" element={<RegisterProfessional />} />
          <Route path="/chat" element={<ChatWithUs />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
