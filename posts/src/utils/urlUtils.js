export const getUrl = (urlType) => {
  switch (urlType) {
    case "auth":
      return "http://localhost:3001";
    case "user":
      return "http://localhost:3002";
    default:
      return "";
  }
};
