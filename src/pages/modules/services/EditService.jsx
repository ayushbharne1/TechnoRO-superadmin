import React, { useState, useEffect } from "react";
import Header2 from "../../../components/superAdmin/header/Header2";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServiceById,
  updateService,
} from "../../../redux/slices/serviceSlice";

import DeleteIcon from "../../../assets/delete.svg";

const EditService = () => {
  /* ===================== LOCAL STATE ===================== */
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [warrenty, setWarrenty] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

 //  ROUTER 
  const location = useLocation();
  const data = location.state;

  /* ===================== REDUX ===================== */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { current, loading } = useSelector(
    (state) => state.service
  );

  /* ===================== FETCH SERVICE BY ID ===================== */
  useEffect(() => {
    if (data?._id) {
      dispatch(fetchServiceById(data._id));
    }
  }, [dispatch, data]);

//   PREFILL FORM 

  useEffect(() => {
    const source = current || data;
    if (!source) return;

    setCategory(source.category || "");
    setService(source.serviceAMC || source.name || "");
    setPrice(source.price || "");
    setWarrenty(source.warrenty || source.warranty || "");
    setDiscount(source.discount || "");
    setDescription(source.description || "");
    setImages(source.images || []);
  }, [current, data]);

//   UPDATE SERVICE (PUT API) 

  const handleAdd = async () => {
    if (service.trim().length < 3) {
      alert("Service name must be at least 3 characters");
      return;
    }

    try {
      const id = (current || data)?._id;
      if (!id) return;

      const payload = {
        category,
        name: service.trim(),
        price: price.toString(), // backend expects STRING
        warranty: warrenty,
        discount,
        description,
      };

      console.log("UPDATE PAYLOAD:", payload);

      await dispatch(
        updateService({
          id,
          data: payload,
        })
      ).unwrap();

      navigate("/services");
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      alert(
        error?.errors?.[0]?.message ||
          error?.message ||
          "Failed to update service"
      );
    }
  };

//   IMAGE HANDLERS 

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > 3) {
      alert("You can upload a maximum of 3 images.");
      return;
    }
    setImages([...images, ...selectedFiles]);
  };

  const handleDeleteImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };



    return (
        <div className="bg-[#F5F8F9] min-h-screen flex flex-col">
            {/* Header */}
            <Header2 />


            {/* Form Container */}
            <div className="bg-white m-6 p-8 shadow-md rounded-md border border-gray-200 flex flex-col gap-8">
               


                {/* Category & Service Row */}
                <div className="grid md:grid-cols-2 gap-6 w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-700 text-[15px]">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="p-3 border border-gray-300 rounded bg-[#F9F9F9] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                        >
                            <option value="">Select Category</option>
                            <option value="Service">Service</option>
                            <option value="AMC">AMC Plan</option>
                        </select>
                    </div>


                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-700 text-[15px]">
                            Service
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Service/AMC Plan Name"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="p-3 border border-gray-300 rounded bg-[#F9F9F9] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                        />
                    </div>
                </div>


                {/* Price & Warranty */}
                <div className="grid md:grid-cols-2 gap-6 w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-700 text-[15px]">
                            Price
                        </label>
                        <input
                            type="text"
                            placeholder="₹ Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="p-3 border border-gray-300 rounded bg-[#F9F9F9] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                        />
                    </div>


                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-700 text-[15px]">
                            Warranty
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Warranty/Validity"
                            value={warrenty}
                            onChange={(e) => setWarrenty(e.target.value)}
                            className="p-3 border border-gray-300 rounded bg-[#F9F9F9] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                        />
                    </div>
                </div>


                {/* Discount */}
                <div className="flex flex-col gap-2 md:w-1/2">
                    <label className="font-medium text-gray-700 text-[15px]">
                        Discount (%)
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="p-3 border border-gray-300 rounded bg-[#F9F9F9] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                    />
                </div>


                {/* Description */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium text-gray-700 text-[15px]">
                        Description
                    </label>
                    <textarea
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-3 h-28 border border-gray-300 rounded bg-[#F9F9F9] resize-none focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                    ></textarea>
                </div>


                {/* Product Image Section */}
                <div className="flex flex-col gap-3 w-full">
                    <label className="font-medium font-poppins text-gray-700 text-[15px]">
                        Service Image
                    </label>


                    {/* Uploaded Images */}
                    <div className="flex flex-wrap gap-4">
                        {images.map((img, index) => (
                            <div key={index} className="relative w-80 h-36 rounded-md overflow-hidden border border-gray-300 bg-[#F9F9F9] flex items-center justify-center">
                                <img
  src={typeof img === "string" ? img : URL.createObjectURL(img)}
  alt="Uploaded"
  className="w-full h-full object-contain"
/>

                                <button
                                    onClick={() => handleDeleteImage(index)}
                                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                                >
                                    <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>


                    {/* Upload Box */}
                    {images.length < 3 && (
                        <div className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-6 cursor-pointer hover:border-[#7EC1B1] transition">
                            <label htmlFor="upload" className="flex flex-col items-center cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500 mb-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 8l-4-4m4 4l4-4" />
                                </svg>
                                <p className="text-gray-600 text-sm font-medium">Upload photo</p>
                                <p className="text-gray-400 text-xs">Upload clear photo of Product</p>
                            </label>
                            <input
                                id="upload"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    )}


                    {/* Add More Text */}
                    <p className="text-center text-[#7EC1B1] text-sm mt-1">
                        + Add More Image (Max 3)
                    </p>
                </div>


            </div>
            <div className="flex justify-center w-full mb-8">
                <button
                    onClick={handleAdd}
                    className="bg-[#7EC1B1] text-white font-semibold px-15 py-2 rounded-md hover:bg-[#68b1a0] transition"
                >
                    Save
                </button>
            </div>
        </div>
    );
};


export default EditService;



