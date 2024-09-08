// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConnectionProvider } from "./context/ConnectionContext";
import React, { Suspense } from "react";
import "./App.css";

// Lazy load the components
const Home = React.lazy(() => import("./pages/Home"));
const Edit = React.lazy(() => import("./pages/Edit"));

const App = () => {
  return (
    <ConnectionProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:applicantID" element={<Edit />} />
          </Routes>
        </Suspense>
      </Router>
    </ConnectionProvider>
  );
};

export default App;
