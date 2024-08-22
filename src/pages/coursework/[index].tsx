"use client";

import { useRouter } from "next/router";
import { useCourseworkStore } from "../../store/useCourseworkStore";
import { useEffect, useState } from "react";

const CourseworkDetailPage = () => {
  const router = useRouter();
  const { index } = router.query;
  const [coursework, setCoursework] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState<string>("");

  const courseworkList = useCourseworkStore((state) => state.courseworkList);

  useEffect(() => {
    if (index !== undefined) {
      const idx = parseInt(index as string, 10);
      setCoursework(courseworkList[idx]);
    }
  }, [index, courseworkList]);

  useEffect(() => {
    if (coursework?.file instanceof File) {
      const url = URL.createObjectURL(coursework.file);
      setFileUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [coursework?.file]);

  if (!coursework) return <p>Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="flex-1 p-4 border border-gray-300">
        <h2 className="text-xl font-bold mb-2">Coursework Title</h2>
        <h3 className="text-lg font-semibold">
          {coursework.title} - {coursework.subject}
        </h3>
        <p className="mt-2 text-gray-600">
          {coursework.evaluation?.overallScore
            ? `Overall Score: ${coursework.evaluation.overallScore}%`
            : "No evaluation available"}
        </p>
      </div>

      <div className="flex-1 p-4 border border-gray-300">
        <h2 className="text-xl font-bold mb-2">Scores Details</h2>
        <div className="space-y-2">
          <p className="font-semibold">Criteria Scores:</p>
          <p>A: {coursework.evaluation?.criteriaScores?.A || 0}%</p>
          <p>B: {coursework.evaluation?.criteriaScores?.B || 0}%</p>
          <p>C: {coursework.evaluation?.criteriaScores?.C || 0}%</p>
          <p>
            Date Evaluated:{" "}
            {coursework.evaluation?.evaluationDate
              ? new Date(
                  coursework.evaluation.evaluationDate
                ).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseworkDetailPage;
