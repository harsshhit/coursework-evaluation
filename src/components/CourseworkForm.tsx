"use client"; 

import { useState } from "react";
import { useCourseworkStore } from "../store/useCourseworkStore";

const CourseworkForm = () => {
  const [title, setTitle] = useState("");
  const addCourseworkDetails = useCourseworkStore(
    (state) => state.addCourseworkDetails
  );
  const addEvaluationResult = useCourseworkStore(
    (state) => state.addEvaluationResult
  );

  const handleSubmit = async () => {
    addCourseworkDetails({
      courseworkType: "Essay",
      subject: "English",
      title,
    });

    const overallScore = Math.floor(Math.random() * 100);
    const criteriaScores = {
      A: Math.floor(Math.random() * 20),
      B: Math.floor(Math.random() * 20),
      C: Math.floor(Math.random() * 20),
    };

    const evaluationResult = {
      overallScore,
      criteriaScores,
      evaluationDate: new Date().toISOString(),
    };

    addEvaluationResult(evaluationResult);
  };

  return (
    <div className="max-w-lg mx-auto grid place-items-start">
      <p className="mb-2 text-gray-500">Coursework Details</p>
      <div className="flex">
        <div className="mb-4">
          <select className="w-full border font-medium text-gray-600 rounded-full p-1">
            <option value="Essay">Essay</option>
            <option value="Project">Project</option>
          </select>
        </div>

        <div className="mb-4 pl-4">
          <select className="w-full border font-medium text-gray-600 rounded-full p-1">
            <option value="English">English</option>
            <option value="Mathematics">Mathematics</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-500 mb-2">Title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="how nation works..."
          className="border rounded-full p-1 focus:outline-none focus:border-orange-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-blue-400 to-green-400 text-white px-4 py-2 rounded-full font-medium hover:from-blue-500 hover:to-green-500 transition"
      >
        Evaluate Your Score
      </button>
    </div>
  );
};

export default CourseworkForm;
