import  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import edit from "../../../assets/edit.png";
import trash from "../../../assets/trash.png";
import arrowup from "../../../assets/arrow-up.png";
import arrowdown from "../../../assets/arrow-down.png";

const TimeSlotAndDate = () => {
    const [rows, setRows] = useState([
        {
            id: 1,
            category: "Water purifier installation",
            dateType: "Current",
            addedDays: 9,
            slots: [
                "08.00AM", "08.30AM", "09.00AM", "09.30AM",
                "10.00AM", "10.30AM", "11.00AM", "11.30AM",
                "12.00PM", "12.30PM", "01.00PM", "01.30PM"
            ],
        },
        {
            id: 2,
            category: "Water purifier Uninstallation",
            dateType: "Next",
            addedDays: 5,
            slots: [
                "02.00PM", "02.30PM", "03.00PM", "03.30PM",
                "04.00PM", "04.30PM", "05.00PM", "05.30PM",
                "06.00PM", "06.30PM", "07.00PM", "07.30PM"
            ],
        },
        {
            id: 3,
            category: "Repair",
            dateType: "Current",
            addedDays: 6,
            slots: [
                "08.00AM", "08.30AM", "09.00AM", "09.30AM",
                "10.00AM", "10.30AM", "11.00AM", "11.30AM",
                "12.00PM", "12.30PM", "01.00PM", "01.30PM"
            ],
        },
        {
            id: 4,
            category: "Other Services",
            dateType: "Next",
            addedDays: 8,
            slots: [
                "02.00PM", "02.30PM", "03.00PM", "03.30PM",
                "04.00PM", "04.30PM", "05.00PM", "05.30PM",
                "06.00PM", "06.30PM", "07.00PM", "07.30PM"
            ],
        },
    ]);


    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const handleClick = () => navigate('/add-timeslot');
    const handleRowsPerPage = (e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    };

    const filteredRows = rows.filter((row) =>
        row.category.toLowerCase().includes(search.toLowerCase())
    );
    const paginatedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) setPage(newPage);
    };
    const handleEdit = (id) => {
        // Navigate to edit page or open a modal to edit the row
        console.log("Edit row with id:", id);
    };

    const handleDelete = (id) => {
        // Delete row logic here
        setRows(rows.filter((row) => row.id !== id));
    };

    return (
        <div className="bg-gray-100 p-5">
            {/* Header Section */}
            <div className="bg-white flex justify-between my-5 p-8 text-gray-600 font-semibold">
                <div>
                    <span>Show</span>
                    <input type="number" value={rowsPerPage} onChange={handleRowsPerPage} className="p-2 border mx-4" min="1" max="50" />
                    <span>Entries</span>
                </div>
                <div>
                    <label>Search:</label>
                    <input type="text" placeholder="Search category" value={search} onChange={(e) => setSearch(e.target.value)} className="p-2 border rounded ml-2" />
                </div>
                <button onClick={handleClick} className="bg-[#7EC1B1] w-[200px] text-white p-2 rounded-lg">Add Time Slot & Date</button>
            </div>


            {/* Table Section */}
            <div className="bg-white p-5">
                <table className="table-auto w-full border border-gray-400">
                    <thead>
                        <tr className="bg-gray-300 text-xl text-center">
                            <th className="h-[80px] px-4">
                                Sr. No.
                                <img src={arrowup} alt="up" className="inline w-4 h-6 ml-2" />
                                <img src={arrowdown} alt="down" className="inline w-4 h-6" />
                            </th>
                            <th className="p-2">
                                Category
                                <img src={arrowup} alt="up" className="inline w-4 h-6 ml-2" />
                                <img src={arrowdown} alt="down" className="inline w-4 h-6" />
                            </th>
                            <th className="p-2">Current or Next Date?</th>
                            <th className="p-2">Added Days</th>
                            <th className="p-2">Selected Slots</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {paginatedRows.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-gray-500 font-semibold`}
                            >
                                <td className="p-2">{row.id}</td>
                                <td className="p-2">{row.category}</td>
                                <td className="p-2">{row.dateType}</td>
                                <td className="p-2">{row.addedDays}</td>
                                <td className="p-2">
                                    <div className="flex flex-wrap justify-center">
                                        {row.slots.map((slot, i) => (
                                            <span
                                                key={i}
                                                className="min-w-[50px] p-1 text-center"
                                            >
                                                {slot}
                                            </span>
                                        ))}
                                    </div>

                                </td>
                                <td className="p-2 flex gap-4 justify-center">
                                    <div
                                        onClick={() => handleEdit(row.id)}
                                        className="bg-[#007AFF] h-[36px] w-[36px] p-2 rounded cursor-pointer"
                                    >
                                        <img src={edit} alt="edit" className="w-5 h-5" />
                                    </div>
                                    <div
                                        onClick={() => handleDelete(row.id)}
                                        className="bg-[#C17E7F] h-[36px] w-[36px] p-2 rounded cursor-pointer"
                                    >
                                        <img src={trash} alt="delete" className="w-5 h-5" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center font-semibold text-xl text-gray-700 mt-10">
                    <span>Showing {Math.min((page - 1) * rowsPerPage + 1, filteredRows.length)} to {Math.min(page * rowsPerPage, filteredRows.length)} of {filteredRows.length} entries</span>
                    <div className="flex gap-2 text-[#7EC1B1] text-lg">
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-4 py-2 border border-[#7EC1B1] rounded-lg">Previous</button>
                        {[...Array(totalPages)].map((_, idx) => (
                            <button key={idx} onClick={() => handlePageChange(idx + 1)} className={`p-2 border rounded-lg border-[#7EC1B1] ${page === idx + 1 ? "bg-[#7EC1B1] text-white" : ""} w-[40px]`}>{idx + 1}</button>
                        ))}
                        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="px-4 py-2 border border-[#7EC1B1] rounded-lg">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeSlotAndDate;
