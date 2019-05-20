import $ from 'jquery';
import typesData from '../../helpers/data/typesData';
import util from '../../helpers/util';
import products from '../products/products';

const seeProductsDiv = (e, categoryName) => {
  const typeName = e.target.closest('.card').firstChild.innerText;
  const typeId = e.target.closest('.card').id;
  $('#products-page').removeClass('hide');
  $('#types-page').addClass('hide');
  $('#home-page').addClass('hide');
  products.initProducts(categoryName, typeName, typeId);
};

const bindEvents = (categoryName) => {
  $('#toCategoriesBtn').on('click', () => {
    $('#categories-page').removeClass('hide');
    $('#types-page').addClass('hide');
  });
  const allButtons = $('.see-products');
  for (let i = 0; i < allButtons.length; i += 1) {
    allButtons[i].addEventListener('click', e => seeProductsDiv(e, categoryName));
  }
};

const writeTypes = (categoryName, types) => {
  let domString = '';
  $.each(types, (i) => {
    console.error(types);
    domString += `<div id="${types[i].id}" class="card typeCard d-flex flex-column justify-content-between shadow">`;
    domString += `<h5>${types[i].name}</h5>`;
    domString += '<a class="btn btn-outline-light see-products small-font">See Products</a>';
    // domString += `<a class="btn btn-outline-light see-types>${types[i].types.length}</a>`;
    domString += '</div>';
  });
  util.printToDom('types', domString);
  bindEvents(categoryName);
};

const initTypes = (categoryName, categoryId) => {
  typesData.loadTypesFromCategory(categoryId)
    .then(types => writeTypes(categoryName, types))
    .catch(err => console.error(err));
};

export default { initTypes };
