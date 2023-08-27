export const findMax = (arr) => {
  let num = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > num) {
      num = arr[i];
    }
  }
  return num;
};

export const examYearObj = () => {
  return {
    1: '1st year',
    2: '2nd year',
    3: '3rd year',
    4: '4th year',
  };
};
