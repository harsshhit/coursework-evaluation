import FileUpload from "../components/FileUpload";
import CourseworkForm from "../components/CourseworkForm";
import Icon from "../components/Icon";
import Welcome from "../components/Welcome";

import CourseworkList from "../components/CourseworkList";
import ExploreCourseworkPage from "@/components/ExploreCoursework";

export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
        <Welcome/>
      <div className="flex flex-col md:flex-row h-auto md:h-[50vh] gap-4 md:gap-16">
        <div className="flex-1 bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <FileUpload />
          </div>
          <CourseworkForm />
         </div>
        <div >
          <Icon />
        </div>
      </div>

      <CourseworkList />
      <ExploreCourseworkPage />
    </div>
  );
}
