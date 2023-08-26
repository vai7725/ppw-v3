import { findMax } from '../utils/helper';

const useCourseDuration = (courses) => {
  const durationLabels = {
    1: '1st Year',
    2: '2nd Year',
    3: '3rd Year',
    4: '4th Year',
  };
  const examYearsArr = courses.map((course) => {
    return course.duration_years;
  });

  const maxDurationYears = findMax(examYearsArr);

  let durationYearsArr = [];
  for (let i = 0; i < maxDurationYears; i++) {
    durationYearsArr.push(i + 1);
  }

  const durationYearsOptions = durationYearsArr.map((e) => {
    return {
      value: e,
      label: durationLabels[e],
      checked: false,
    };
  });

  return [durationYearsOptions];
};

export default useCourseDuration;
