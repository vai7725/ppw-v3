import API from '../../config/axiosInstance';

export const fetchUniversity = (universityId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get(`/api/university/${universityId}`);
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
        params: { limit: 15, page, universityId },
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

export const updatePaperViews = (paperId, file_link) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.patch(`/api/papers/${paperId}`, {
        params: { file_link },
      });
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const savePaper = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.post(`/api/papers`, data);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const saveCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.post(`/api/courses`, data);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const fetchPaper = (paperId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.get(`/api/papers/${paperId}`);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};

export const editPaper = (paperId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = API.put(`/api/papers/${paperId}`, data);
      return resolve(res);
    } catch (error) {
      return reject(error);
    }
  });
};
