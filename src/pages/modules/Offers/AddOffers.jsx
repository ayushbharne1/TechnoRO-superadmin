import React from 'react';

const OfferForm = () => {
  return (
    <div className="flex justify-center items-center w-full mt-6">
      <div className="w-[90%] sm:w-[90%] lg:w-[90%] bg-white border p-6 rounded-lg shadow-md space-y-6">
        
        <div>
          <label className="block font-medium mb-1">Offer Category</label>
          <select className="w-full border rounded-lg p-2">
            <option>Select Category</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Service/Product Name</label>
          <input
            type="text"
            placeholder="Enter Service Subtitle"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Main Offer Category</label>
          <input
            type="text"
            placeholder="Enter main offer Category"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Offer Subtitle</label>
          <input
            type="text"
            placeholder="Enter offer Subtitle"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Offer Status</label>
          <input
            type="text"
            placeholder="Publish"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="text-center">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
            Add Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferForm;
