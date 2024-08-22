"use client";

import { useCourseworkStore } from "../store/useCourseworkStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/solid"; 

const CourseworkList = () => {
  const courseworkList = useCourseworkStore((state) => state.courseworkList);
  const removeCoursework = useCourseworkStore(
    (state) => state.removeCoursework
  );
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this coursework?")) {
      removeCoursework(index);
    }
  };

  const handleOpenCoursework = (index: number) => {
    router.push(`/coursework/${index}`);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = courseworkList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(courseworkList.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!isClient) {
    return null;
  }

  // Check if Previous and Next buttons should be shown
  const shouldShowPaginationButtons = courseworkList.length > 2; 

  return (
    <div className="mt-3">
      <h2 className="text-lg font-bold mb-2">My Courseworks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {currentItems.length > 0 ? (
          currentItems.map((coursework, index) => (
            <div
              key={index}
              className="relative p-2 bg-white shadow-md rounded-lg flex flex-col justify-between"
            >
              <XIcon
                onClick={() => handleDelete(index)}
                className="absolute top-1 right-1 w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800 transition"
              />
              <div>
                <h3
                  onClick={() => handleOpenCoursework(index)}
                  className="text-md font-semibold cursor-pointer hover:underline"
                >
                  {coursework.title}
                </h3>
                <p className="text-xs text-gray-600">
                  Subject: {coursework.subject}
                </p>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg mt-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-600">Overall Score</p>
                  <div className="flex items-center">
                    <span className="text-md font-semibold">
                      {coursework.evaluation?.overallScore || 0}%
                    </span>
                    <div className="w-20 h-1 bg-gray-300 rounded-full ml-2 relative">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${coursework.evaluation?.overallScore || 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-xs font-semibold mb-1">Criteria Scores</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">A</span>
                      <div className="w-20 h-1 bg-gray-300 rounded-full relative">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{
                            width: `${
                              coursework.evaluation?.criteriaScores?.A || 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs">
                        {coursework.evaluation?.criteriaScores?.A || 0}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">B</span>
                      <div className="w-20 h-1 bg-gray-300 rounded-full relative">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{
                            width: `${
                              coursework.evaluation?.criteriaScores?.B || 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs">
                        {coursework.evaluation?.criteriaScores?.B || 0}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">C</span>
                      <div className="w-20 h-1 bg-gray-300 rounded-full relative">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{
                            width: `${
                              coursework.evaluation?.criteriaScores?.C || 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs">
                        {coursework.evaluation?.criteriaScores?.C || 0}%
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mt-2">
                  Date Evaluated:{" "}
                  {coursework.evaluation?.evaluationDate
                    ? new Date(
                        coursework.evaluation.evaluationDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No courseworks available.</p>
        )}
      </div>
      {shouldShowPaginationButtons && (
        <div className="flex justify-between mt-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADc0lEQVR4nO2ay0tVURTGf5LpDSPzqiWNahhG9VeYYg9zVtmssEkm1rTH2BoJgn9HIWJRIfSyhylEZtaobBDZrKtiYSz8DizqXr333HPPPYofHLi691n7sdZej28f2MLmRRroAG4Dw8AH4CewpMd+T6vN+pwC6kgIUsB54D7wB1gp8PkNjAJdQHU5FrADuAp8c5NaBB4B16WZg9rx7Xrq9D9ruwE81jvB+3NAnzYnFrQDn90EXgEXgNoQsnYDF4HXTt4noI0SwnZqyA34BmiJUH4r8NbJHyyFdpo0cRvgF3AZ2Bb1IKzKvAJknLb3RiX8gNS9Iq9ziNLjMDCjMWc1h6LQ6AS+BBqID3XAE439WVYRCilnTs+AGuJHDfDCmVmoMzPkzMmCXblQ76zCHEDBLjY42HGciXzOTEZzMu+Wd7AL4oR5p6Sg1x3+vEzsmosTUbrYJgW+5yHfrwQmNTdb1JpIubSjJeJFTEvuBFARUk6bZHxdLzfrch6iFIuYLsaNsroBgSc9u1bHB+pkuVMUsKj8TjItrd8XgcxuyRvJ1SGttHoxZAJYSk38GyitvlnONc/TGvQhydSEx5hknyAL7qjR6okkasLjluT3kwXDajxJcjXxr/XcJQs+qtGquKRqIkCz26z/MK/GdII1EaBBY30nC5bUWEXhmIpJEwGqHU+weRcyX4Rp7XGmNRODaTWuZVqb5rAPq9EYwLCISzOda7nfICAaebahA2KHGo0tLBal1syYZB/PlYwFSaMxgCRUM2mXNO7K1WlUAxuNSUI1c0ny7EznxDl1spI0qYXVhGSdWa/UnVPHY5RmMVZ3h0W7ZHzJ5xqiz9XWUZMPkyLcwpIPU5pbTz4vpBzXa4RyUtDnzlp1oWxFRuRYuXEUWAjL7gy6HTDaslxoFClncxkIIyAlWmhFdl0OEnsnMK45jBdzz9ioxCy4VrC/40IaeOqu44q+8DngVGtmdoR4zsSsxrSsfH9Ugvc6M8uIezV3GDUq5Z0WnDlZdhApUs4BBIEtqtvXCgW7KSd/oNR3761O7QFr3x3yK4a0cqcg7ViRKUVJoK+rnV6x4sEElpRe3xTv1Cy3XaWnXpdGneoz5niCIO3oKdcXENVixUdUAhT6Cceystgz5VpANtSKi7Wq7Z6SxB/uoxr7/V7lab/65qwntsAGx1+7t04xbgmu8QAAAABJRU5ErkJggg==" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADdElEQVR4nO2ayWsUQRTGf6JmRhRjxsSIJz1KRP0r1BD3m9tNiRdjiF5dztGTEMjfoYQQRUVQcY0LotGYk8tBjDcnBpWRh1/DQ2cmMz3VPZ2QD5pZXvWrqn5LvfqqYRELFwVgP3AJGAEmgG/ArC77/kYya7MPaCMjyAPHgOvAb6BU5/ULGAOOArlmTGAFcAb47Ab1A7gFnJNlNuuJL9fVpv9Mdh64rXui+z8BA3o4qaAHmHIDeAwcB1pj6FoDnACeOH3vgW4ShD2pYdfhU2BHQP27gGdO/1AS1lmvgVsH34FTwNLQnfBX52mg6KzdGUr5Jpm7pKyzheSxFXirPic1hobQ4RQ+AtpJD23AXfU9Ja+Ihbxzp/vAStLHSuCBc7NYMTPs3MkWu2ZhrfMKSwB1p9gosNOIiVpipqgxWXarebGL1gnLTllBvwv+mlzsrFsn4qbYceBlIwFaBsuA5xqbTaoq8q7saGSxe+HiK+RkuqX341y12VGXIRrBek0i9GSWuEx6uFrDG2pktVOjWAe8kj7LOhsIg17pHK3UoKCy+kfMAjAty7Rpf/Oz0jgPqMObhEUSlrkjfXvKCS9LaPuJ0AhtmYvSNVhOOCLhXpJBSMsckJ6r5YTvJLRdXFIIZZku6TBe4D9MS5h0XRXCMu26/0s54ayELSQPbxlbPOtFzvEEmZmIlR1BJzKdkmt1OteaiOlaHdVca8EE+4iExgBm1RIRDlZLv9GCaOTZvF4Q90tobGFWLfFvibKbCsVYVDQaA5jVorHgisbVlRqNqVOjMbNoCcNJ6bSYrogjamRcbFY3VuPSe2iure4nNdyZwa1uj/R+qOUYYkCNxxsgHx6KkA5NPrzQ2PpquSHvuF4jlLOCAVdo5uplK4oix5qN7cBMXHZnyD0Boy2bhQ6RcjaWK3EU5EULlUQkN4PEXqV4K+kz18jTmHDHCvY7LRSAe+44ruEDn03OtOZm20gnJibVp1XlG0Mp7nRuVhT3aukwNJYpO804d7KtcVDkXQKIdnbdAVdsW+yidSIK7ETP3nc5s0esfW/MtxgKqp2isqMkVwp5WjyndfrFikcDmFV5fUG8U5fSdouutTo0Oqg2dxxPEJUdfc16AyInVnxUW4B6X+H4qSr2ULMmUA6t4mJt13ZNBeNX91KNfX+t7emg2lbcTyyCeY4/F5VOQDaUwpAAAAAASUVORK5CYII=" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseworkList;
