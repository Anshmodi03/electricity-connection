import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context for managing connection data
export const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
  const [connections, setConnections] = useState([]);
  const [filteredConnections, setFilteredConnections] = useState([]);

  useEffect(() => {
    const fileUrl = "/data/connections.xlsx";

    const fetchData = async () => {
      try {
        // Use dynamic import to lazy load xlsx library
        const XLSX = await import("xlsx");

        const response = await axios.get(fileUrl, {
          responseType: "arraybuffer",
        });
        const data = new Uint8Array(response.data);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log("Fetched data:", jsonData); // Debug log to verify if data is loaded correctly

        setConnections(jsonData);
        setFilteredConnections(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredConnections(connections);
  }, [connections]);

  const updateFilteredConnections = (newConnections) => {
    setFilteredConnections(newConnections);
  };

  return (
    <ConnectionContext.Provider
      value={{
        connections,
        filteredConnections,
        setConnections,
        updateFilteredConnections,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};
