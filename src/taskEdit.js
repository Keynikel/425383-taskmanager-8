export class TaskEdit {
  constructor(data) {
    this._color = data.color;
    this._title = data.title;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
    this._element = null;
  }
}
