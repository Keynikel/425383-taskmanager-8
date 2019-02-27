import {getRandomNumber} from './additional.js'

const titleList = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const colorList = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const hashtagsList = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `hardworking`,
  `for_understand`,
  `for_fun`
];

export const getTask = () => ({
  title: titleList[Math.floor(Math.random() * titleList.length)],
  dueDate: Date.now() + 1 + (getRandomNumber(-7,7)) * 24 * 60 * 60 * 1000,
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: colorList[Math.floor(Math.random() * colorList.length)],
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
  get deadlineDate() {
    const date = new Date(this.dueDate);
    const options = {day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
    const dateArray = date.toLocaleString('en-EN', options).split(', ');
    return dateArray;
  },
  get isDeadlined() {
    const now = Date.now();
    const deadline = this.dueDate;
    if (deadline <= now) return true;
    else return false;
  },
  get tags() {
    const tags = new Set();
    const amount = getRandomNumber(0,3);
    for (let i = 0; i < amount; i++) {
      const key = getRandomNumber(0, hashtagsList.length-1);
      tags.add(hashtagsList[key]);
    }
    return tags;
  },
  tagsMarkdown() {
    return [...this.tags].map((elem) => `
      <span class="card__hashtag-inner">
      <input type="hidden"
             name="hashtag"
             value="repeat"
             class="card__hashtag-hidden-input"
      />
      <button type="button" class="card__hashtag-name">
        #${elem}
      </button>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
      </span>`).join(``);
  },
  repeatingMarkdown() {

  }
});
