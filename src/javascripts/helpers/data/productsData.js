import axios from 'axios';

const loadProductsFromType = typeId => new Promise((resolve, reject) => {
  axios.get('../db/products.json')
    .then((resp) => {
      const allProducts = Object.entries(resp.data.products[0]);
      const matchingProducts = allProducts.filter(product => product[1].typeId === typeId);
      resolve(matchingProducts);
    })
    .catch(err => reject(err));
});

const getProductsForEachType = types => new Promise((resolve, reject) => {
  axios.get('../db/products.json')
    .then((resp) => {
      const { products } = resp.data;
      const typesWithProducts = types.map((type) => {
        const newType = type;
        const matchingProducts = products.filter(product => product.typeId === type.id);
        newType.products = matchingProducts;
        return newType;
      });
      resolve(typesWithProducts);
    })
    .catch(err => reject(err));
});

export default { loadProductsFromType, getProductsForEachType };
