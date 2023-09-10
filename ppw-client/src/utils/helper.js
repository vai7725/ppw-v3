export const examYearObj = () => {
  return {
    1: '1st year',
    2: '2nd year',
    3: '3rd year',
    4: '4th year',
  };
};

export const idExtractor = (link) => {
  const id = link.split('/')[5];
  return id;
};

export const courseOptionsMaker = (coursesArr) => {
  return coursesArr.map((course) => ({
    value: course._id,
    label: course.title,
    checked: false,
  }));
};

export const subjectOptionsMaker = (subjectTitles) => {
  return subjectTitles.map((title) => ({
    value: title,
    label: title,
    checked: false,
  }));
};

export const maxFinder = (nums) => {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }
  return +max;
};

export const maxYearProvider = (courses, selectedCourse) => {
  let result;
  courses.forEach((course) => {
    if (course._id === selectedCourse) {
      result = +course.duration_years;
    }
  });
  return result;
};
