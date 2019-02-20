const mainFilter = document.querySelector('.main__filter'); // блок для фильтров
const tasksBorder = document.querySelector('.board__tasks'); //блок для карточек
const MIN_CARDS = 1; //минимальное число карточек для задания 7
const MAX_CARDS = 10; // максимальное число карточек для задания 7

// массив элементов-фильтров.
const filterList = [
  {name: `All`,
  class: `all`,
  amount: 25,
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

// карточка
const card = {
    color: `blue`,
    isEdited: false,
    isRepeated: true,
    isDeadlined: false
};

// функция-рандомайзер для задания 7
const getRandomNumber = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

// Функция для очищения блока-контейнера
const clearField = function(container) {
  while (container.firstChild) {
      container.firstChild.remove();
  }
}

// Функция для отрисовки отдельного фильтра. Должна уметь отрисовывать любой фильтр, предусмотренный макетом. Входной параметр - объект-фильтр
const getFilterElement = function(filter) {
  if ( filter.amount == 0 ) {filter.state = 'disabled';}
  return `
    <input type="radio" id="filter__${filter.class.toLowerCase()}" class="filter__input visually-hidden" name="filter" ${filter.state} />
    <label for="filter__${filter.class.toLowerCase()}" class="filter__label">
      ${filter.name}
      <span class="filter__${filter.class.toLowerCase()}-count">
        ${filter.amount}
      </span>
    </label>`;
}

// При переключении фильтров очищайте контейнер board__tasks от ранее созданных задач и добавляйте случайное количество новых задач.
const generateCards = function() {
  const cardsAmount = getRandomNumber(MIN_CARDS, MAX_CARDS);
  clearField(tasksBorder);
  for (let i = 0; i<cardsAmount; i++) {
    tasksBorder.insertAdjacentHTML(`beforeEnd`, getCardElement(card));
  }
}

// Функция для отрисовки одной карточки задачи.  Формирует шаблон карточки опираясь на данные из макета. Входной параметр - объект-карточка
const getCardElement = function(card) {
  return `
  <article class="card
    card--${card.color}
    ${card.isEdited ? 'card--edit' : ''}
    ${card.isRepeated ? 'card--repeat' : ''}
    ${card.isDeadlined ? 'card--deadline' : ''}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            ></textarea
            >
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">yes</span>
              </button>

              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="23 September"
                    name="date"
                    value="23 September"
                  />
                </label>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__time"
                    type="text"
                    placeholder="11:15 PM"
                    name="time"
                    value="11:15 PM"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">yes</span>
              </button>

              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-mo-4"
                    name="repeat"
                    value="mo"
                  />
                  <label class="card__repeat-day" for="repeat-mo-4"
                    >mo</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-tu-4"
                    name="repeat"
                    value="tu"
                    checked
                  />
                  <label class="card__repeat-day" for="repeat-tu-4"
                    >tu</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-we-4"
                    name="repeat"
                    value="we"
                  />
                  <label class="card__repeat-day" for="repeat-we-4"
                    >we</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-th-4"
                    name="repeat"
                    value="th"
                  />
                  <label class="card__repeat-day" for="repeat-th-4"
                    >th</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-fr-4"
                    name="repeat"
                    value="fr"
                    checked
                  />
                  <label class="card__repeat-day" for="repeat-fr-4"
                    >fr</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    name="repeat"
                    value="sa"
                    id="repeat-sa-4"
                  />
                  <label class="card__repeat-day" for="repeat-sa-4"
                    >sa</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-su-4"
                    name="repeat"
                    value="su"
                    checked
                  />
                  <label class="card__repeat-day" for="repeat-su-4"
                    >su</label
                  >
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                <span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="repeat"
                    class="card__hashtag-hidden-input"
                  />
                  <button type="button" class="card__hashtag-name">
                    #repeat
                  </button>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>

                <span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="repeat"
                    class="card__hashtag-hidden-input"
                  />
                  <button type="button" class="card__hashtag-name">
                    #cinema
                  </button>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>

                <span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="repeat"
                    class="card__hashtag-hidden-input"
                  />
                  <button type="button" class="card__hashtag-name">
                    #entertaiment
                  </button>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>
              </div>

              <label>
                <input
                  type="text"
                  class="card__hashtag-input"
                  name="hashtag-input"
                  placeholder="Type new hashtag here"
                />
              </label>
            </div>
          </div>

          <label class="card__img-wrap">
            <input
              type="file"
              class="card__img-input visually-hidden"
              name="img"
            />
            <img
              src="img/sample-img.jpg"
              alt="task picture"
              class="card__img"
            />
          </label>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              <input
                type="radio"
                id="color-black-4"
                class="card__color-input card__color-input--black visually-hidden"
                name="color"
                value="black"
              />
              <label
                for="color-black-4"
                class="card__color card__color--black"
                >black</label
              >
              <input
                type="radio"
                id="color-yellow-4"
                class="card__color-input card__color-input--yellow visually-hidden"
                name="color"
                value="yellow"
                checked
              />
              <label
                for="color-yellow-4"
                class="card__color card__color--yellow"
                >yellow</label
              >
              <input
                type="radio"
                id="color-blue-4"
                class="card__color-input card__color-input--blue visually-hidden"
                name="color"
                value="blue"
              />
              <label
                for="color-blue-4"
                class="card__color card__color--blue"
                >blue</label
              >
              <input
                type="radio"
                id="color-green-4"
                class="card__color-input card__color-input--green visually-hidden"
                name="color"
                value="green"
              />
              <label
                for="color-green-4"
                class="card__color card__color--green"
                >green</label
              >
              <input
                type="radio"
                id="color-pink-4"
                class="card__color-input card__color-input--pink visually-hidden"
                name="color"
                value="pink"
              />
              <label
                for="color-pink-4"
                class="card__color card__color--pink"
                >pink</label
              >
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>
  `;
}

//отрисуйте в .main__filter все фильтры, предусмотренные макетом.
clearField(mainFilter);
filterList.forEach(function(filter) {
  mainFilter.insertAdjacentHTML(`beforeEnd`, getFilterElement(filter));
});

//отрисуйте семь одинаковых карточек задач в .board__tasks
clearField(tasksBorder);
for (let i = 0; i<7; i++) {
  tasksBorder.insertAdjacentHTML(`beforeEnd`, getCardElement(card));
}

// Добавьте обработчик события click для отрисованных фильтров
const filters = document.querySelectorAll(`.main__filter label`);
filters.forEach(function(filter) {
  filter.addEventListener(`click`, function() {
    generateCards();
  })
})
