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
