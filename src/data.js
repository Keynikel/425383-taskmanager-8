import {getRandomNumber} from './additional.js'

export const task = {
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + (getRandomNumber(-7,7)) * 24 * 60 * 60 * 1000,
  tags: new Set ([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `hardworking`,
    `for_understand`,
    `for_fun`
  ]),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ][Math.floor(Math.random() * 5)],
  repeatingDays: {
    'mo': true,
    'tu': true,
    'we': true,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  isFavorite: true,
  isDone: false,
};
