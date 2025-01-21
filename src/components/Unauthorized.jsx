import React from "react";
import { useNavigate } from "react-router-dom"; 

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login"); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center bg-white shadow-lg p-8 rounded-lg w-96">
        <h1 className="text-3xl font-semibold text-red-600">Unauthorized Access</h1>
        <p className="mt-4 text-xl text-gray-700">
          You do not have permission to access this page.
        </p>
        <p className="mt-2 text-md text-gray-500">
          Please contact the administrator if you believe this is an error.
        </p>
        
      </div>
    </div>
  );
};

export default Unauthorized;
