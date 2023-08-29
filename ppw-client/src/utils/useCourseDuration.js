const useCourseDuration = (years) => {
  const durationLabels = {
    1: '1st Year',
    2: '2nd Year',
    3: '3rd Year',
    4: '4th Year',
  };

  const durationYearsOptions = years.map((year) => {
    return {
      value: +year,
      label: durationLabels[year],
      checked: false,
    };
  });

  return [durationYearsOptions];
};

export default useCourseDuration;
