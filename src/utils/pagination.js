export const getPageCount = (articlesCount, limit) => {
  return Math.ceil(articlesCount / limit);
};

export const getPageArray = (allPage) => {
  const pageArray = [1];
  for (let i = 1; i < allPage; i++) {
    pageArray.push(i + 1);
  }
  return pageArray;
};
