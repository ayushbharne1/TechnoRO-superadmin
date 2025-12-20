import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditTestimonial = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    image: [""],
    comment: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e, index = null) => {
    const { name, value, files } = e.target;
    if (name === "image" && index !== null) {
      const updatedImages = [...form.image];
      updatedImages[index] = files[0];
      setForm({ ...form, image: updatedImages });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addMoreImage = () => {
    setForm({ ...form, image: [...form.image, ""] });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!form.fullName) newErrors.fullName = "Full Name is required";
    if (!form.status) newErrors.status = "Product Status is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate(-1);
    }
  };

  return (
    <div className="bg-gray-100 p-4 h-full overflow-y-auto flex flex-col">
      <div className="w-full bg-white p-4 sm:p-6 md:p-8 flex flex-col gap-4">
        {/* Full Name */}
        <div className="flex flex-col w-full">
          <label className="font-poppins font-medium text-[20px] leading-[100%] mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className={`w-full p-2 border focus:outline-none focus:ring-1 focus:ring-blue-300 placeholder:font-poppins placeholder:font-normal placeholder:text-[16px] ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>
          )}
        </div>

        {/* Image */}
        <div className="flex flex-col w-full">
          <label className="font-poppins font-medium text-[20px] leading-[100%] mb-2">
            Image
          </label>
          {form.image.map((_, idx) => (
            <input
              key={idx}
              type="file"
              name="image"
              onChange={(e) => handleChange(e, idx)}
              className="w-full p-3 border border-gray-300 text-gray-500 mb-2
                file:py-2 file:px-4 file:border file:border-gray-400
                file:bg-gray-100 file:text-gray-700 file:text-sm
                hover:file:bg-gray-200"
            />
          ))}
          <button
            type="button"
            onClick={addMoreImage}
            className="text-[#7EC1B1] text-sm mt-1 text-left"
          >
          </button>
        </div>

        {/* Comment */}
        <div className="flex flex-col w-full">
          <label className="font-poppins font-medium text-[20px] leading-[100%] mb-2">
            Comment
          </label>
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="Write Comment"
            rows="4"
            className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-300 placeholder:font-poppins placeholder:font-normal placeholder:text-[16px]"
          ></textarea>
        </div>

        {/* Status */}
        <div className="flex flex-col w-full">
          <label className="font-poppins font-medium text-[20px] leading-[100%] mb-2">
            Product Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={`w-full p-2 border focus:outline-none focus:ring-1 focus:ring-blue-300 ${
              errors.status ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Status</option>
            <option value="Published">Published</option>
            <option value="Pending">Pending</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-sm mt-1">{errors.status}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-[#7EC1B1] text-white px-6 py-3 rounded-md hover:bg-[#25803D] transition duration-300 mt-2 self-start"
        >
          Add Testimonial
        </button>
      </div>
    </div>
  );
};

export default EditTestimonial;
