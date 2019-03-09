import {clearField} from './utils';
import {getTask} from './get-task';
import {Task} from './task';
import {TaskEdit} from './taskEdit';

const tasksContainer = document.querySelector(`.board__tasks`);
const task = getTask();
const taskComponent = new Task(task);
const editTaskComponent = new TaskEdit(task);

clearField(tasksContainer);
tasksContainer.appendChild(taskComponent.render());

taskComponent.onEdit = () => {
  editTaskComponent.render();
  tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
  taskComponent.unrender();
};

editTaskComponent.onSubmit = () => {
  taskComponent.render();
  tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
  editTaskComponent.unrender();
};
