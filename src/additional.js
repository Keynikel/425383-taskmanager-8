export const getRandomNumber = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
