import React from "react";

function Icon() {
  return (
    <div className="relative w-64 h-full bg-gray-100 rounded-lg overflow-hidden">
      
      <div
        className="w-full h-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url(/assets/imgg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      ></div>

      <div className="w-full h-1/2 flex items-center justify-center bg-white text-center">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Your Main Heading</h2>
          <p className="text-md text-gray-700">
            Your additional text goes here. Its a bit larger for emphasis.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Icon;
