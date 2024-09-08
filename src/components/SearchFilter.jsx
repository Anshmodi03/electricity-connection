// src/components/SearchFilter.jsx
import { useState } from "react";

// This component handles both search and filter logic
const SearchFilter = ({ connections, setFilteredConnections }) => {
  const [searchID, setSearchID] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Function to convert Excel serial date to JavaScript Date
  const serialDateToDate = (serialDate) => {
    const excelEpoch = new Date(1900, 0, 1); // Excel starts on Jan 1, 1900
    const offset = serialDate > 59 ? serialDate - 2 : serialDate - 1; // Account for leap year bug in Excel
    return new Date(excelEpoch.getTime() + offset * 24 * 60 * 60 * 1000);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const filterConnections = () => {
    let filtered = connections;

    // Filter by search ID
    if (searchID) {
      const searchIDLower = searchID.trim().toLowerCase();
      filtered = filtered.filter((connection) => {
        const idNumber = connection.ID_Number
          ? connection.ID_Number.toString().trim()
          : "";
        return idNumber.toLowerCase() === searchIDLower;
      });
    }

    // Filter by date
    if (searchDate) {
      filtered = filtered.filter((connection) => {
        let connectionDate = connection.Date_of_Application;
        let formattedDate = "";

        if (typeof connectionDate === "number") {
          const date = serialDateToDate(connectionDate);
          formattedDate = formatDate(date);
        } else if (typeof connectionDate === "string") {
          const match = connectionDate.match(/(\d{4}-\d{2}-\d{2})/);
          formattedDate = match ? match[1] : "";
        } else if (connectionDate instanceof Date) {
          formattedDate = formatDate(connectionDate);
        }

        return formattedDate === searchDate;
      });
    }

    setFilteredConnections(filtered);
  };

  const handleSearchID = (e) => {
    setSearchID(e.target.value);
    filterConnections(); // Trigger search after typing
  };

  const handleSearchDate = (e) => {
    setSearchDate(e.target.value);
    filterConnections();
  };

  const handleClearDate = () => {
    setSearchDate("");
    filterConnections();
  };

  return (
    <div className="header-container">
      <div className="input-group search">
        <input
          type="text"
          placeholder="Search by Applicant ID"
          value={searchID}
          onChange={handleSearchID}
          onKeyUp={filterConnections} // Trigger search on key up
        />
        {/* Search button is optional now but kept for manual search */}
        <button onClick={filterConnections}>Search by ID</button>
      </div>
      <div className="input-group filter">
        <input
          type="date"
          placeholder="Search by Date"
          value={searchDate}
          onChange={handleSearchDate}
        />
        <button onClick={filterConnections}>Filter by Date</button>
        <button className="clear-button" onClick={handleClearDate}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
