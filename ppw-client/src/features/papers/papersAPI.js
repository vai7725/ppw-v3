import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUniversity = (universityId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get(`/api/universities/${universityId}`);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const fetchCourses = (universityId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get(`/api/courses`, { params: { universityId } });
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const fetchPapers = (universityId, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get(`/api/papers`, {
        params: { limit: 30, page, universityId },
      });
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const fetchExamYears = (universityId, courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get(`/api/exam-years/${courseId}`, {
        params: { universityId },
      });
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const fetchSubjectTitles = (universityId, courseId, exam_year) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get(`/api/subject-titles/${courseId}/${exam_year}`, {
        params: { universityId },
      });
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const fetchFilteredPapers = (
  universityId,
  courseId,
  exam_year,
  subject_title
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get(
        `/api/papers/${courseId}/${exam_year}/${subject_title}`,
        {
          params: { universityId },
        }
      );
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};