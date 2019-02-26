import {getFilter} from './make-filter';
import makeTask from './make-task';
import {task} from './data.js'

const MIN_CARDS = 1;
const MAX_CARDS = 10;
const filterList = [
  {name: `All`,
    class: `all`,
    amount: 45,
    state: ``},

  {name: `Overdue`,
    class: `overdue`,
    amount: 0,
    state: ``},

  {name: `Today`,
    class: `today`,
    amount: 0,
    state: ``},

  {name: `Favorites`,
    class: `favorites`,
    amount: 7,
    state: ``},

  {name: `Repeating`,
    class: `repeating`,
    amount: 2,
    state: `checked`},

  {name: `Tags`,
    class: `tags`,
    amount: 6,
    state: ``},

  {name: `Archive`,
    class: `archive`,
    amount: 115,
    state: ``}
];

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);
const clearField = function (container) {
  while (container.firstChild) {
    container.firstChild.remove();
  }
};

const generateCards = function () {
  const cardsAmount = getRandomNumber(MIN_CARDS, MAX_CARDS);
  clearField(tasksContainer);
  for (let i = 0; i < cardsAmount; i++) {
    tasksContainer.insertAdjacentHTML(`beforeEnd`, makeTask(card));
  }
};

clearField(filtersContainer);
filterList.forEach(function (filter) {
  filtersContainer.insertAdjacentHTML(`beforeEnd`, getFilter(filter));
});

clearField(tasksContainer);
for (let i = 0; i < 7; i++) {
  tasksContainer.insertAdjacentHTML(`beforeEnd`, makeTask(task));
}

const filters = document.querySelectorAll(`.main__filter label`);
filters.forEach(function (filter) {
  filter.addEventListener(`click`, function () {
    generateCards();
  });
});
