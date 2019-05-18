import $ from 'jquery';

import categoriesData from '../../helpers/data/categoriesData';
// import typesData from '../../helpers/data/typesData';
import util from '../../helpers/util';

// import types from '../types/types';

// const seeTypeDiv = (e) => {
//   const categoryId = e.target.closest('.card').id;
//   $('.categories-page').toggleClass('.hide');
//   $('.types-page').toggleClass('.hide');
//   $('.products-page').toggleClass('.hide');
//   types.initTypes(categoryId);
// };

// const bindEvents = () => {
//   const allButtons = $('.see-types');
//   $.each(allButtons).on('click', seeTypeDiv);
// };

const writeCategories = (categories) => {
  let domString = '';
  console.error(categories);
  $.each(categories, (i) => {
    domString += `<div id="${categories[i].id} class="card">`;
    domString += `<h5>${categories[i].name}</h5>`;
    domString += '<a class="btn btn-outline-light see-types">types</a>';
    // domString += `<a class="btn btn-outline-light see-types>${types[i].types.length}</a>`;
    domString += '</div>';
  });
  util.printToDom('categories', domString);
  // bindEvents();
};

const initCategories = () => {
  categoriesData.loadCategories()
    // .then(resp => typesData.getTypesForEachCategory(resp.data.categories))
    // .then(categoriesWithTypes => writeCategories(categoriesWithTypes))
    .then(resp => writeCategories(resp.data.categories))
    .catch(err => console.error('error from initCategories', err));
};

export default { initCategories };
