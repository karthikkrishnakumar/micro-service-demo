export const getUrl = (urlType) => {
  switch (urlType) {
    case "post":
      return "http://localhost:3002";
    case "auth":
      return "http://localhost:3003";
    default:
      return "";
  }
};
