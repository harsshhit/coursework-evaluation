import create from "zustand";

interface Coursework {
  title: string;
  subject: string;
  courseworkType: string;
  file?: File;
  evaluation?: EvaluationResult;
}

interface EvaluationResult {
  overallScore: number;
  criteriaScores: {
    A: number;
    B: number;
    C: number;
  };
  evaluationDate: string;
}

interface CourseworkStore {
  courseworkList: Coursework[];
  addFile: (file: File) => void;
  addCourseworkDetails: (details: Partial<Coursework>) => void;
  addEvaluationResult: (result: EvaluationResult) => void;
  removeCoursework: (index: number) => void;
}

const loadCourseworkFromStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("courseworkList") || "[]");
  }
  return [];
};

export const useCourseworkStore = create<CourseworkStore>((set) => ({
  courseworkList: loadCourseworkFromStorage(),

  addFile: (file: File) => {
    set((state) => {
      const updatedList = [...state.courseworkList, { file } as Coursework];
      if (typeof window !== "undefined") {
        localStorage.setItem("courseworkList", JSON.stringify(updatedList));
      }
      return { courseworkList: updatedList };
    });
  },

  addCourseworkDetails: (details) => {
    set((state) => {
      const updatedList = state.courseworkList.map((item, index) =>
        index === state.courseworkList.length - 1
          ? { ...item, ...details }
          : item
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("courseworkList", JSON.stringify(updatedList));
      }
      return { courseworkList: updatedList };
    });
  },

  addEvaluationResult: (result) => {
    set((state) => {
      const updatedList = state.courseworkList.map((item, index) =>
        index === state.courseworkList.length - 1
          ? { ...item, evaluation: result }
          : item
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("courseworkList", JSON.stringify(updatedList));
      }
      return { courseworkList: updatedList };
    });
  },

  removeCoursework: (index) => {
    set((state) => {
      const updatedList = state.courseworkList.filter((_, i) => i !== index);
      if (typeof window !== "undefined") {
        localStorage.setItem("courseworkList", JSON.stringify(updatedList));
      }
      return { courseworkList: updatedList };
    });
  },
}));
