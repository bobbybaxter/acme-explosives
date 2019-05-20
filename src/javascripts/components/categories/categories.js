import $ from 'jquery';

import categoriesData from '../../helpers/data/categoriesData';
import typesData from '../../helpers/data/typesData';
import util from '../../helpers/util';

import types from '../types/types';

const seeTypeDiv = (e) => {
  const categoryName = e.target.closest('.card').firstChild.innerText;
  const categoryId = e.target.closest('.card').id;
  $('#categories-page').addClass('hide');
  $('#types-page').removeClass('hide');
  $('#home-page').addClass('hide');
  types.initTypes(categoryName, categoryId);
};

const bindEvents = () => {
  const allButtons = $('.see-types');
  for (let i = 0; i < allButtons.length; i += 1) {
    allButtons[i].addEventListener('click', seeTypeDiv);
  }
};

const writeCategories = (categories) => {
  let domString = '';
  $.each(categories, (i) => {
    domString += `<div id="${categories[i].id}" class="card categoryCard d-flex flex-column justify-content-between shadow">`;
    domString += `<h5>${categories[i].name}</h5>`;
    domString += `<a class="btn btn-outline-light see-types small-font">${categories[i].types.length} types</a>`;
    domString += '</div>';
  });
  util.printToDom('categories', domString);
  bindEvents();
};

const initCategories = () => {
  categoriesData.loadCategories()
    .then(resp => typesData.getTypesForEachCategory(resp.data.categories))
    .then(categoriesWithTypes => writeCategories(categoriesWithTypes))
    .catch(err => console.error('error from initCategories', err));
};

export default { initCategories };
