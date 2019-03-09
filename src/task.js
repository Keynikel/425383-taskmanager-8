import {createElement, timestampToDate} from './utils';

export class Task {
  constructor(data) {
    this._color = data.color;
    this._title = data.title;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
    this._element = null;
    this._state = {
      isDeadline: data.isDeadlined,
    };
    this._onEdit = null;
  }

  _isDeadlined() {
    return this._state.isDeadline;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  get template() {
    return `
    <article class="card
         card--${this._color}
         card--${this._isDeadlined() ? `deadline` : ``}
         card--${this._isRepeated() ? `repeat` : ``}
    }">
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
              class="card__btn card__btn--favorites"
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
              >${this._title}</textarea
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
                      placeholder="${timestampToDate(this._dueDate, `date`)}"
                      name="date"
                      value="${timestampToDate(this._dueDate, `date`)}"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${timestampToDate(this._dueDate, `time`)}"
                      name="time"
                      value="${timestampToDate(this._dueDate, `time`)}"
                    />
                  </label>
                </fieldset>
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">yes</span>
                </button>
                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    ${this.renderRepeatsMarkdown()}
                  </div>
                </fieldset>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${this.renderTagsMarkdown()}
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
                src="${this._picture}"
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
    `.trim();
  }

  get element() {
    return this._element;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this._element = null; // удалить ссылку на созданный DOM-элемент.
  }

  update() {
    if (this._state.isEdit) {
      return this._element.classList.add(`card--edit`);
    }

    return this._element.classList.remove(`card--edit`);
  }

  renderTagsMarkdown() {
    return [...this._tags].map((elem) => `
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
  }

  renderRepeatsMarkdown() {
    let repeatingMarkdown = ``;
    for (let day in this._repeatingDays) {
      if (Object.prototype.hasOwnProperty.call(this._repeatingDays, day)) {
        repeatingMarkdown += `
        <input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-4"
          name="repeat"
          value="${day}"
          ${this._repeatingDays[day] ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-4"
          >${day}</label
        >
        `.trim();
      }
    }
    return repeatingMarkdown;
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
        .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }


}