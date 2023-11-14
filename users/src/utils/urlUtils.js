export const getUrl = (urlType) => {
  switch (urlType) {
    case "post":
      return "http://localhost:3003";
    case "auth":
      return "http://localhost:3001";
    default:
      return "";
  }
};
