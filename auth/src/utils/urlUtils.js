export const getUrl = (urlType) => {
  switch (urlType) {
    case "post":
      return "http://localhost:3003";
    default:
      return "";
  }
};
