export default (element) => {
  return (
    element.getBoundingClientRect().top < event.clientY &&
    element.getBoundingClientRect().bottom > event.clientY &&
    element.getBoundingClientRect().left < event.clientX &&
    element.getBoundingClientRect().right > event.clientX
  );
};
