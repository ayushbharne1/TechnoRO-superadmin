
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import sampleImage from "../../../assets/sample img.jpg";

const ViewProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold">No product data found.</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <Header2 />
      <div className="bg-white rounded-xl font-poppins shadow-md p-4 md:p-8 max-w-6xl mx-auto mt-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Product Image */}
          <div className="relative w-full md:w-1/3 flex justify-center md:justify-start">
            <div className="absolute  bg-[#008ECC] text-white px-4 py-6 md:px-4 md:py-3 rounded text-lg md:text-lg font-semibold">
              {product.discount} OFF
            </div>
            <img
              src={sampleImage}
              alt={product.product}
              className="rounded-lg w-full max-w-[300px] md:max-w-none md:h-[400px] md:w-[400px] object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 w-full">
            <h2 className="text-lg md:text-xl font-poppins mb-2">{product.product}</h2>
            <div className="flex flex-wrap items-center gap-1 md:gap-2 text-base md:text-lg font-semibold text-[#7EC1B1] mb-1">
              {product.price}
              <span className="text-gray-500 text-sm md:text-base font-normal">
                • Warranty:{" "}
                <span className="text-[#34C759] font-semibold">
                  {product.warranty}
                </span>
              </span>
            </div>
            <p className="text-gray-700 mb-4 text-sm md:text-base">
              Product Add by:{" "}
              <span className="font-semibold text-black">KENT PVT. LTD.</span>
            </p>

            <h3 className="text-base md:text-lg font-semibold border-b border-gray-200 pb-2 mb-3">
              Description
            </h3>

            <ul className="text-gray-600 list-disc ml-5 space-y-2 text-sm md:text-base">
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
                tempora.lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, tempora. 
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum autem excepturi nostrum atque natus mollitia vel recusandae 
                libero fugiat, impedit nisi eaque molestiae, sapiente explicabo dicta quo delectus
              </li>
              <li>
                Varius sed maecenas donec lobortis eu ornare arcu fermentum. Lorem ipsum, dolor sit amet 
                consectetur adipisicing elit. 
                Mollitia facere itaque, iste est eius ut nihil recusandae laboriosam ipsa quaerat nulla quidem, 
                nam molestiae veniam odit sunt perferendis voluptatum tempora. Lorem ipsum, 
                dolor sit amet consectetur a
              </li>
              <li>
                Facilisis nunc in scelerisque aenean dolor felis in odio. Lorem, ipsum dolor sit amet 
                consectetur adipisicing elit. Iste aliquam dolor temporibus, doloribus aliquid non 
                exercitationem aut impedit voluptate est ea libero ratione unde nihil quidem quod nisi 
                dolores sit.
              </li>
            </ul>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4 mt-6 md:mt-8">
              <button className="px-15 py-2 rounded-md font-semibold text-white bg-[#C17E7F] text-sm md:text-base">
                Reject
              </button>
              <button className="px-15 py-2 rounded-md font-semibold text-white bg-[#3A953A] text-sm md:text-base">
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
