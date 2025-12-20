
const AddTimeSlot = () => {
  const timeslotList = [
    { id: 1, time: "08:00am" },
    { id: 2, time: "08:30am" },
    { id: 3, time: "09:00am" },
    { id: 4, time: "09:30am" },
    { id: 5, time: "10:00am" },
    { id: 6, time: "10:30am" },
    { id: 7, time: "08:00am" },
    { id: 8, time: "08:00am" },
    { id: 9, time: "01:00am" },
    { id: 10, time: "08:00am" },
    { id: 11, time: "08:00am" },
    { id: 12, time: "08:00am" },
    { id: 13, time: "08:00am" },
    { id: 14, time: "08:00am" },
    { id: 15, time: "08:00am" },
    { id: 16, time: "08:00am" },
    { id: 17, time: "08:00am" },
    { id: 18, time: "08:00am" },
    { id: 19, time: "12:00am" },
    { id: 20, time: "08:00am" },
    { id: 21, time: "08:30pm" },
    { id: 22, time: "08:00pm" },
    { id: 23, time: "11:00am" },
    { id: 24, time: "07:00pm" },
    { id: 25, time: "08:00pm" },
  ];
  return (
    <div className="h-screen bg-white p-6 rounded-xl text-[#263138] shadow-sm">
        <label className="block font-semibold mb-2">Select Category</label>
        <input className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 mb-5" type="text" placeholder="Enter Category" />

        <label className="block font-semibold mb-2">Current and next date</label>
        <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 mb-5">
          <option>Select Date Status</option>
          <option>Current</option>
          <option>Next</option>
        </select>

        <label className="block font-semibold mb-2">Date + Day</label>
        <input className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 mb-5" type="text" placeholder="Enter Day" />

        <label className="block font-semibold mb-2">Timeslot List</label>
      <div className="grid grid-cols-6 space-y-5 mb-2">
      {timeslotList.map((list)=>(
          <div key={list.id} className="flex space-x-4">
            <input type="checkbox" className="text-gray-300" />
            <spane className='text-[14px] text-gray-800'>{list.time}</spane>
          </div>
        ))}
      </div>

     
      
       {/* Submit Button */}
       <button className="bg-[#7EC1B1] mt-3 cursor-pointer w-[200px]
        text-white px-6 py-2 rounded-md hover:bg-[#25803D] transition duration-300">
          Add Timeslot & date
        </button>
    </div>
  );
};

export default AddTimeSlot;
