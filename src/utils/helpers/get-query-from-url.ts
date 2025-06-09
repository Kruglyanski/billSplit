export const getQueryFromUrl = (url: string, query: string) => {
  return url.match(new RegExp('[?&]' + query + '=([^&#]*)'))?.[1];
};
