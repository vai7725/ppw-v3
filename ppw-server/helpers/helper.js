export const tokenObj = (tokenStr) => {
  const tokenArr = tokenStr.split('=');
  return {
    [tokenArr[0]]: tokenArr[1],
  };
};
