// Import necessary modules from React library
import React from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/LandingPage.js';
import Login from './Components/Login/Login.js';
import Sign_Up from './Components/Sign_Up/Sign_Up.js';

// Function component for the main App
function App() {

  // Render the main App component
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component */}
          <Navbar/>
          

          {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define individual Route components for different pages */}
            <Route path="/" element={<Landing_Page/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Sign_Up" element={<Sign_Up/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;