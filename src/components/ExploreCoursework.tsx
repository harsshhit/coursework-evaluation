"use client"; 

import { useState, useEffect } from "react";
import { useCourseworkStore } from "../store/useCourseworkStore";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

const ExploreCourseworkPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courseworkList, setCourseworkList] = useState<any[]>([]);

  const courseworkStore = useCourseworkStore();
  useEffect(() => {
    setCourseworkList(courseworkStore.courseworkList);
  }, [courseworkStore.courseworkList]);

  const filteredCoursework = courseworkList.filter((coursework) => {
    if (selectedCategory === "All") return true;
    return coursework.subject === selectedCategory;
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Explore Coursework</h1>

      <Tab.Group>       
        <Tab.Panels>
          <Tab.Panel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCoursework.length > 0 ? (
                filteredCoursework.map((coursework, index) => (
                  <div
                    key={index}
                    className="relative p-4 bg-white shadow-md rounded-lg flex flex-col justify-between"
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {coursework.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Subject: {coursework.subject}
                    </p>
                    <p className="text-sm text-gray-600">
                      Word Count:{" "}
                      {coursework.file ? coursework.file.size : "N/A"}
                    </p>
                    <a
                      href={`/coursework/${index}`}
                      className="mt-2 inline-block bg-gray-500 text-white py-1 px-2.5 rounded-full text-sm font-semibold hover:bg-gray-600 transition"
                    >
                      View Details
                    </a>
                  </div>
                ))
              ) : (
                <p>No coursework available for this category.</p>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ExploreCourseworkPage;
