import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ConnectionContext } from "../context/ConnectionContext";
import "./Edit.css";

const Edit = () => {
  const { applicantID } = useParams();
  const navigate = useNavigate();
  const { connections, setConnections } = useContext(ConnectionContext);
  const [connection, setConnection] = useState({
    Applicant_Name: "",
    Load_Applied_KV: "",
    State: "",
    District: "",
    Pincode: "",
    Status: "",
    Date_of_Application: "",
    GovtID_Type: "",
  });
  const [isUpdated, setIsUpdated] = useState(false); // Add this state variable

  useEffect(() => {
    const foundConnection = connections.find(
      (connection) => connection.ID_Number.toString() === applicantID.toString()
    );

    if (foundConnection) {
      setConnection(foundConnection);
    } else {
      console.error("Connection not found!");
    }
  }, [applicantID, connections]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConnection({ ...connection, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedConnections = connections.map((conn) =>
      conn.ID_Number.toString() === applicantID.toString() ? connection : conn
    );
    setConnections(updatedConnections);
    setIsUpdated(true); // Set isUpdated to true after update
    navigate("/");
  };

  return (
    <div className="edit-container">
      {!isUpdated && (
        <>
          <h1>Edit Connection Data</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Applicant ID:
              <input
                type="text"
                name="Applicant_ID"
                value={connection.ID_Number || ""}
                onChange={handleInputChange}
                className="Restricted"
                disabled
              />
            </label>
            <br />
            <label>
              Applicant Name:
              <input
                type="text"
                name="Applicant_Name"
                value={connection.Applicant_Name || ""}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Date of Application:
              <input
                type="text"
                name="Date_of_Application"
                value={connection.Date_of_Application || ""}
                onChange={handleInputChange}
                className="Restricted"
                disabled
              />
            </label>
            <br />
            <label>
              Load Applied (KV):
              <input
                type="number"
                name="Load_Applied_KV"
                value={connection.Load_Applied_KV || ""}
                onChange={handleInputChange}
                max="200"
                min="0"
              />
            </label>
            <br />
            <label>
              State:
              <input
                type="text"
                name="State"
                value={connection.State || ""}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              District:
              <input
                type="text"
                name="District"
                value={connection.District || ""}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              GovtID Type:
              <input
                type="text"
                name="GovtID_Type"
                value={connection.GovtID_Type || ""}
                onChange={handleInputChange}
                className="Restricted"
                disabled
              />
            </label>
            <br />
            <label>
              Status:
              <input
                type="text"
                name="Status"
                value={connection.Status || ""}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="submit">Save Changes</button>
          </form>
        </>
      )}
      {isUpdated && <p>Update submitted successfully!</p>}
    </div>
  );
};

export default Edit;
