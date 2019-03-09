export const getRandomNumber = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export const clearField = function (container) {
  while (container.firstChild) {
    container.firstChild.remove();
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// перевод таймштампа в дату. Принимает таймпштамп и что нужно вернуть (date, time)
export const timestampToDate = (timestamp, datePart) => {
  const date = new Date(timestamp);
  const options = {day: `numeric`, month: `long`, hour: `2-digit`, minute: `2-digit`};
  const dateArray = date.toLocaleString(`en-EN`, options).split(`, `);
  if (datePart === `date`) {
    return dateArray[0];
  } else {
    return dateArray[1];
  }
};
