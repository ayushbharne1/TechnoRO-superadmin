import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Header2 from "../../../components/superAdmin/header/Header2";
import { addPopularCity } from "../../../redux/slices/popularCitiesSlice";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

const AddCity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cityName, setCityName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Dynamic sections state
  const [sections, setSections] = useState([
    {
      id: 1,
      heading: "",
      paragraphs: [""],
      tableColumns: ["Column 1", "Column 2", "Column 3"],
      tableRows: [{ col0: "", col1: "", col2: "" }]
    }
  ]);

  // Section management functions
  const addSection = () => {
    const newSection = {
      id: Date.now(),
      heading: "",
      paragraphs: [""],
      tableColumns: ["Column 1", "Column 2", "Column 3"],
      tableRows: [{ col0: "", col1: "", col2: "" }]
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id) => {
    if (sections.length > 1) {
      setSections(sections.filter(section => section.id !== id));
    }
  };

  const updateSection = (id, field, value) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  // Paragraph functions
  const addParagraph = (sectionId) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, paragraphs: [...section.paragraphs, ""] }
        : section
    ));
  };

  const removeParagraph = (sectionId, paraIndex) => {
    setSections(sections.map(section => {
      if (section.id === sectionId && section.paragraphs.length > 1) {
        return {
          ...section,
          paragraphs: section.paragraphs.filter((_, idx) => idx !== paraIndex)
        };
      }
      return section;
    }));
  };

  const updateParagraph = (sectionId, paraIndex, value) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newParagraphs = [...section.paragraphs];
        newParagraphs[paraIndex] = value;
        return { ...section, paragraphs: newParagraphs };
      }
      return section;
    }));
  };

  // Column functions
  const addColumn = (sectionId) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newColumnIndex = section.tableColumns.length;
        const newColumns = [...section.tableColumns, `Column ${newColumnIndex + 1}`];
        const newRows = section.tableRows.map(row => ({
          ...row,
          [`col${newColumnIndex}`]: ""
        }));
        return {
          ...section,
          tableColumns: newColumns,
          tableRows: newRows
        };
      }
      return section;
    }));
  };

  const removeColumn = (sectionId, colIndex) => {
    setSections(sections.map(section => {
      if (section.id === sectionId && section.tableColumns.length > 1) {
        const newColumns = section.tableColumns.filter((_, idx) => idx !== colIndex);
        const newRows = section.tableRows.map(row => {
          const newRow = { ...row };
          delete newRow[`col${colIndex}`];
          // Reindex remaining columns
          const reindexedRow = {};
          Object.keys(newRow).forEach((key, idx) => {
            if (key.startsWith('col')) {
              reindexedRow[`col${idx}`] = newRow[key];
            }
          });
          return reindexedRow;
        });
        return {
          ...section,
          tableColumns: newColumns,
          tableRows: newRows
        };
      }
      return section;
    }));
  };

  const updateColumnName = (sectionId, colIndex, value) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newColumns = [...section.tableColumns];
        newColumns[colIndex] = value;
        return { ...section, tableColumns: newColumns };
      }
      return section;
    }));
  };

  // Row functions
  const addTableRow = (sectionId) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newRow = {};
        section.tableColumns.forEach((_, idx) => {
          newRow[`col${idx}`] = "";
        });
        return { ...section, tableRows: [...section.tableRows, newRow] };
      }
      return section;
    }));
  };

  const updateTableCell = (sectionId, rowIndex, column, value) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newRows = [...section.tableRows];
        newRows[rowIndex] = { ...newRows[rowIndex], [column]: value };
        return { ...section, tableRows: newRows };
      }
      return section;
    }));
  };

  const removeTableRow = (sectionId, rowIndex) => {
    setSections(sections.map(section => {
      if (section.id === sectionId && section.tableRows.length > 1) {
        return {
          ...section,
          tableRows: section.tableRows.filter((_, idx) => idx !== rowIndex)
        };
      }
      return section;
    }));
  };

  const handleAdd = () => {
    dispatch(
      addPopularCity({
        cityName,
        contactNumber,
        whatsappLink,
        contactEmail,
        sections,
      })
    );

    // Reset form fields
    setCityName("");
    setContactNumber("");
    setWhatsappLink("");
    setContactEmail("");
    setSections([
      {
        id: 1,
        heading: "",
        paragraphs: [""],
        tableColumns: ["Column 1", "Column 2", "Column 3"],
        tableRows: [{ col0: "", col1: "", col2: "" }]
      }
    ]);

    // Show success message 
    alert("City added successfully!");

    // Navigate back to the previous page
    navigate("/popular-cities");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col p-4">
      {/* Header with Title */}
      <Header2 title="Add New City" />

      {/* Form Section */}
      <div className="bg-white  flex flex-col gap-8 w-full h-full">
        {/* Row 1: City Name & Contact Number */}
        <div className="flex flex-col md:flex-row gap-6 w-full pt-5">
          {/* City Name Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              City Name
            </label>
            <input
              type="text"
              placeholder="Enter City Name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>

          {/* Contact Number Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>
        </div>

        {/* Row 2: WhatsApp Link & Contact Email */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* WhatsApp Link Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              WhatsApp Link
            </label>
            <input
              type="url"
              placeholder="Enter WhatsApp Link (https://wa.me/...)"
              value={whatsappLink}
              onChange={(e) => setWhatsappLink(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>

          {/* Contact Email Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              Contact Email
            </label>
            <input
              type="email"
              placeholder="Enter Contact Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>
        </div>

        {/* Dynamic Sections */}
        <div className="flex flex-col gap-6 mt-2">
          <h3 className="font-poppins font-semibold text-gray-800 text-[18px]">
            Overview
          </h3>

          {sections.map((section, sectionIndex) => (
            <div key={section.id} className="bg-[#F5F5F5] p-6 border border-[#606060]">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-poppins font-medium text-gray-700 text-[16px]">
                  Section {sectionIndex + 1}
                </h4>
                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(section.id)}
                    className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {/* Heading Input */}
                <div className="flex flex-col gap-2">
                  <label className="font-poppins font-medium text-gray-700 text-[14px]">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) => updateSection(section.id, "heading", e.target.value)}
                    className="p-3 border border-[#606060] bg-white focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                    placeholder="Enter heading"
                  />
                </div>

                {/* Paragraphs */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="font-poppins font-medium text-gray-700 text-[14px]">
                      Paragraphs
                    </label>
                    <button
                      type="button"
                      onClick={() => addParagraph(section.id)}
                      className="text-sm text-[#7EC1B1] hover:text-[#65a89d] flex items-center gap-1 font-poppins"
                    >
                      <Plus size={16} /> Add Paragraph
                    </button>
                  </div>
                  {section.paragraphs.map((para, paraIndex) => (
                    <div key={paraIndex} className="flex gap-2">
                      <textarea
                        value={para}
                        onChange={(e) => updateParagraph(section.id, paraIndex, e.target.value)}
                        rows="3"
                        className="flex-1 p-3 border border-[#606060] bg-white focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                        placeholder={`Enter paragraph ${paraIndex + 1}`}
                      />
                      {section.paragraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeParagraph(section.id, paraIndex)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Table */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="font-poppins font-medium text-gray-700 text-[14px]">
                      Table
                    </label>
                    <button
                      type="button"
                      onClick={() => addColumn(section.id)}
                      className="text-sm text-[#7EC1B1] hover:text-[#65a89d] flex items-center gap-1 font-poppins"
                    >
                      <Plus size={16} /> Add Column
                    </button>
                  </div>
                  <div className="border border-[#606060] rounded-lg overflow-x-auto bg-white">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          {section.tableColumns.map((colName, colIndex) => (
                            <th key={colIndex} className="px-4 py-2 text-left">
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={colName}
                                  onChange={(e) => updateColumnName(section.id, colIndex, e.target.value)}
                                  className="flex-1 px-2 py-1 text-sm font-poppins font-medium text-gray-700 border border-gray-300 rounded focus:ring-1 focus:ring-[#7EC1B1]"
                                  placeholder={`Column ${colIndex + 1}`}
                                />
                                {section.tableColumns.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeColumn(section.id, colIndex)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                            </th>
                          ))}
                          <th className="px-4 py-2 w-16"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.tableRows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="border-t border-gray-200">
                            {section.tableColumns.map((_, colIndex) => (
                              <td key={colIndex} className="px-4 py-2">
                                <input
                                  type="text"
                                  value={row[`col${colIndex}`] || ""}
                                  onChange={(e) => updateTableCell(section.id, rowIndex, `col${colIndex}`, e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-[#7EC1B1]"
                                  placeholder="Data"
                                />
                              </td>
                            ))}
                            <td className="px-4 py-2">
                              {section.tableRows.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeTableRow(section.id, rowIndex)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={() => addTableRow(section.id)}
                    className="mt-2 text-sm text-[#7EC1B1] hover:text-[#65a89d] flex items-center gap-1 font-poppins"
                  >
                    <Plus size={16} /> Add Table Row
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add More Section Button */}
          <button
            type="button"
            onClick={addSection}
            className="bg-gray-200 text-gray-700 font-poppins font-medium px-6 py-3 rounded-lg hover:bg-gray-300 transition flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add More Section
          </button>
        </div>
        

        {/* <div className="mt-8  ">
          <h1 className="text-xl font-semibold mb-6">FAQ</h1>
          <div>
            <form action="">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="faq-question">
                  Question
                </label>
                <input
                  type="text"
                  id="faq-question"
                  name="faq-question"
                  // value={faqQuestion}
                  // onChange={(e) => setFaqQuestion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="faq-answer">
                  Answer
                </label>
                <textarea
                  id="faq-answer"
                  name="faq-answer"
                  // value={faqAnswer}
                  // onChange={(e) => setFaqAnswer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                ></textarea>
              </div>
               
              
            </form>
          </div>
        </div> */}

        {/* Add Button */}
        <div className="flex justify-center w-full mt-6">
          <button
            onClick={handleAdd}
            className="bg-[#7EC1B1] text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:bg-[#65a89d] transition w-full md:w-1/4"
          >
            Add City
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCity;