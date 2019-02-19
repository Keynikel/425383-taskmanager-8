const getFilterElement = function (caption=`Unset`, amount = 0, state = ``) {
  if ( amount == 0 ) {state = 'disabled';}
  return `
    <input type="radio" id="filter__${caption.toLowerCase()}" class="filter__input visually-hidden" name="filter" ${state} />
    <label for="filter__${caption.toLowerCase()}" class="filter__label">
      ${caption.toLowerCase()}
      <span class="filter__${caption.toLowerCase()}-count">
        ${amount}
      </span>
    </label>`;
}

// const getCardElement = function(color) {
//   return `
//     <article class="card card--${color}">
//
//     </article>
//   `;
// }

const mainFilter = document.querySelector('.main__filter');
while (mainFilter.firstChild) {
    mainFilter.firstChild.remove();
}

mainFilter.insertAdjacentHTML(`beforeEnd`, getFilterElement(`All`, 15, `checked`));
mainFilter.insertAdjacentHTML(`beforeEnd`, getFilterElement(`Overdue`));
mainFilter.insertAdjacentHTML(`beforeEnd`, getFilterElement(`Today`, 0, `checked`));
mainFilter.insertAdjacentHTML(`beforeEnd`, getFilterElement(`Favorites`, 7));
mainFilter.insertAdjacentHTML(`beforeEnd`, getFilterElement(`Repeating`, 2));
mainFilter.insertAdjacentHTML(`beforeEnd`, getFilterElement(`Tags`, 6));
mainFilter.insertAdjacentHTML(`beforeEnd`, getFilterElement(`Archive`, 115));


const tasksBorder = document.querySelector('.board__tasks');

tasksBorder.insertAdjacentHTML(`beforeEnd`, getCardElement(`pink`));
