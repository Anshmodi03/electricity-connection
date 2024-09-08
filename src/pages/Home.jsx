import { useContext, useState, useEffect, lazy, Suspense } from "react";
import { ConnectionContext } from "../context/ConnectionContext";
import { Link } from "react-router-dom";
import "./Home.css";

// Lazy load SearchFilter and Pagination components
const SearchFilter = lazy(() => import("../components/SearchFilter"));
const Pagination = lazy(() => import("../components/Pagination"));

// Function to convert Excel serial date to JavaScript Date
const serialDateToDate = (serialDate) => {
  const excelEpoch = new Date(1900, 0, 1);
  const offset = serialDate > 59 ? serialDate - 2 : serialDate - 1;
  return new Date(excelEpoch.getTime() + offset * 24 * 60 * 60 * 1000);
};

// Function to format JavaScript Date object into YYYY-MM-DD string
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Home = () => {
  const { connections } = useContext(ConnectionContext);
  const [displayedConnections, setDisplayedConnections] = useState([]);
  const [filteredConnections, setFilteredConnectionsLocal] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    setFilteredConnectionsLocal(connections);
  }, [connections]);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedConnections(filteredConnections.slice(startIndex, endIndex));
  }, [page, filteredConnections]);

  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(filteredConnections.length / itemsPerPage)
    ) {
      setPage(newPage);
    }
  };

  const totalPages = Math.ceil(filteredConnections.length / itemsPerPage);

  return (
    <div className="home-container">
      <header className="header">
        <h1>Electricity Connection</h1>
      </header>

      {/* Use Suspense to show loading while SearchFilter is lazily loaded */}
      <Suspense fallback={<div>Loading Search...</div>}>
        <SearchFilter
          connections={connections}
          setFilteredConnections={setFilteredConnectionsLocal}
        />
      </Suspense>

      {filteredConnections.length === 0 && <p>No results found</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Applicant ID</th>
            <th>Name</th>
            <th>Date of Application</th>
            <th>Load Applied (KV)</th>
            <th>State</th>
            <th>District</th>
            <th>GovtID Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedConnections.map((connection, index) => (
            <tr key={index}>
              <td>{connection.ID}</td>
              <td>{connection.ID_Number}</td>
              <td>{connection.Applicant_Name}</td>
              <td>
                {formatDate(serialDateToDate(connection.Date_of_Application))}
              </td>
              <td>{connection.Load_Applied_KV}</td>
              <td>{connection.State}</td>
              <td>{connection.District}</td>
              <td>{connection.GovtID_Type}</td>
              <td>{connection.Status}</td>
              <td className="actions">
                <Link to={`/edit/${connection.ID_Number}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Use Suspense to show loading while Pagination is lazily loaded */}
      <Suspense fallback={<div>Loading Pagination...</div>}>
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Suspense>
    </div>
  );
};

export default Home;
