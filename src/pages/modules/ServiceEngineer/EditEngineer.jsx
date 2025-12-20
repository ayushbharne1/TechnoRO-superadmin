import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";

const dummyEngineers = [
  { id: 1, name: "Ajay Kumar", skill: "Web Developer", phone: "9876543210", assignedArea: "Chennai" },
  { id: 2, name: "Ravi Singh", skill: "SEO Specialist", phone: "9988776655", assignedArea: "Hyderabad" },
  { id: 3, name: "Pooja Sharma", skill: "Graphic Designer", phone: "8765432109", assignedArea: "Bangalore" },
];

const EditEngineer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [skill, setSkill] = useState("");
  const [phone, setPhone] = useState("");
  const [assignedArea, setAssignedArea] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const engineer = dummyEngineers.find((eng) => eng.id === parseInt(id));
    if (engineer) {
      setFullName(engineer.name);
      setSkill(engineer.skill);
      setPhone(engineer.phone);
      setAssignedArea(engineer.assignedArea);
    }
  }, [id]);

  const handleUpdate = () => {
    console.log({ id, fullName, skill, phone, assignedArea, password });
    navigate("/service-engineer");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header2 />
      <div className="bg-white p-6 shadow-lg flex flex-col gap-8 w-full h-full">
        
        {/* Full Name & Skill */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2 w-full">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="p-3 w-full border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2 w-full">
            <label>Skill</label>
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="p-3 w-full border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            >
              <option value="">Select Skill</option>
              <option value="Web Developer">Web Developer</option>
              <option value="SEO Specialist">SEO Specialist</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Digital Marketer">Digital Marketer</option>
              <option value="App Developer">App Developer</option>
              <option value="Content Writer">Content Writer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Email Marketer">Email Marketer</option>
            </select>
          </div>
        </div>

        {/* Phone & Assigned Area */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2 w-full">
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 w-full border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2 w-full">
            <label>Assigned Area</label>
            <input
              type="text"
              value={assignedArea}
              onChange={(e) => setAssignedArea(e.target.value)}
              className="p-3 w-full border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="md:w-1/2 w-full flex flex-col gap-2">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 w-full border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center w-full mt-6">
          <button
            onClick={handleUpdate}
            className="bg-[#7EC1B1] text-white px-6 py-3 rounded w-full md:w-1/4"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditEngineer;
