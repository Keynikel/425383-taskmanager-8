import {getFilter as makeFilter} from './make-filter';
import makeTask from './make-task';

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

const card = {
  color: `blue`,
  isEdited: false,
  isRepeated: true,
  isDeadlined: false
};

const filters = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);
const clearField = function (container) {
  while (container.firstChild) {
    container.firstChild.remove();
  }
};


clearField(filters);
filterList.forEach(function (filter) {
  filters.insertAdjacentHTML(`beforeEnd`, makeFilter(filter));
});


clearField(tasksContainer);
for (let i = 0; i < 7; i++) {
  tasksContainer.insertAdjacentHTML(`beforeEnd`, makeTask(card));
}
