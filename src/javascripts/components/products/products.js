import $ from 'jquery';
import productsData from '../../helpers/data/productsData';
import util from '../../helpers/util';

const bindEvents = () => {
  $('#toTypesBtn').on('click', () => {
    $('#types-page').removeClass('hide');
    $('#products-page').addClass('hide');
  });
};

const writeProducts = (categoryName, typeName, products) => {
  let domString = '';
  $.each(products, (i) => {
    domString += `<div id="${products[i][1].id}" class="card productCard d-flex flex-column shadow">`;
    domString += `<h5>${products[i][1].name}</h5>`;
    domString += `<p>${categoryName}</p>`;
    domString += `<p>${typeName}</p>`;
    domString += `<p>${products[i][1].description}</p>`;
    domString += '</div>';
  });
  util.printToDom('products', domString);
  bindEvents();
};

const initProducts = (categoryName, typeName, typeId) => {
  productsData.loadProductsFromType(typeId)
    .then(products => writeProducts(categoryName, typeName, products))
    .catch(err => console.error(err));
};

export default { initProducts };
