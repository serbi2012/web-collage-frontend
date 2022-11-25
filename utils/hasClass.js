export default (element, className) => {
  return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
};
