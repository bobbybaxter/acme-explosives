import $ from 'jquery';
import util from '../../helpers/util';
import categoriesData from '../../helpers/data/categoriesData';
import typesModule from '../types/types';

const seeTypeDiv = (e) => {
  e.preventDefault();
  const categoryName = e.target.innerText;
  const categoryId = e.target.id;
  $('#categories-page').addClass('hide');
  $('#home-page').addClass('hide');
  $('#types-page').removeClass('hide');
  $('#products-page').addClass('hide');
  typesModule.initTypes(categoryName, categoryId);
};

const bindCategoriesEvents = () => {
  const allButtons = $('.nav-see-types');
  for (let i = 0; i < allButtons.length; i += 1) {
    allButtons[i].addEventListener('click', seeTypeDiv);
  }
};

const printNavbarCategories = (categories) => {
  let domString = '';
  $.each(categories, (i) => {
    domString += `<a id="${categories[i].id}" class="dropdown-item nav-see-types" href="#">${categories[i].name}</a>`;
  });
  util.printToDom('navbar-categories', domString);
  bindCategoriesEvents();
};

const initCategories = () => {
  categoriesData.loadCategories()
    .then(resp => printNavbarCategories(resp.data.categories))
    .catch(err => console.error('error from navBar initCategories', err));
};

const init = () => {
  initCategories();
};

export default { init };
