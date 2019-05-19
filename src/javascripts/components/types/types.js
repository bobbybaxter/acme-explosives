import $ from 'jquery';
import typesData from '../../helpers/data/typesData';
import util from '../../helpers/util';

const bindEvents = () => {
  $('#toCategoriesBtn').on('click', () => {
    $('#categories-page').removeClass('hide');
    $('#types-page').addClass('hide');
  });
};

const writeTypes = (types) => {
  let domString = '';
  $.each(types, (i) => {
    domString += `<div id="${types[i].id}" class="card typeCard d-flex flex-column justify-content-between">`;
    domString += `<h5>${types[i].name}</h5>`;
    domString += '<a class="btn btn-outline-light see-products">Products</a>';
    // domString += `<a class="btn btn-outline-light see-types>${types[i].types.length}</a>`;
    domString += '</div>';
  });
  util.printToDom('types', domString);
  bindEvents();
};

const initTypes = (categoryId) => {
  typesData.loadTypesFromCategory(categoryId)
    .then(types => writeTypes(types))
    .catch(err => console.error(err));
};

export default { initTypes };
