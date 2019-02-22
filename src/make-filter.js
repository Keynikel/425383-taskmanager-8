const getFilter = function(filter) {
  if ( filter.amount == 0 ) {filter.state = `disabled`;}
  return `
    <input type="radio" id="filter__${filter.class.toLowerCase()}" class="filter__input visually-hidden" name="filter" ${filter.state} />
    <label for="filter__${filter.class.toLowerCase()}" class="filter__label">
      ${filter.name}
      <span class="filter__${filter.class.toLowerCase()}-count">
        ${filter.amount}
      </span>
    </label>`;
}

export {getFilter as default}
