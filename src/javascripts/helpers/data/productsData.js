import axios from 'axios';
// import typesData from './typesData';
// import categoriesData from './categoriesData';

/*
This is an async failure I'm keeping in the notes, so I can eventually come back and see what I was
doing wrong.


I was trying to grab the .json information from the categories and types and add them to the
product type at the point when the products were loaded after clicking one of the type buttons;
however, the async call seems to be returning after I print to the DOM and I can't seem to figure
out an Ecmascript 6 way to async/await for the promise to resolve before my code moves on and prints
to the DOM.

The goal was to only print the Categories in Navbar dropdown, which doesn't affect the products
information, which I pass through the functions to the ending product cards.  However, as a stretch
goal, I was trying to also print the Types in the Navbar, but I've spent all day and just need to
finish this project.
*/

// const syncProductsInfo = (products) => {
//   const syncedProductList = [];
//   const buildProducts = (types, categories) => {
//     products.map((product) => {
//       const newProduct = product[1];
//       const matchingType = types.filter(type => newProduct.typeId === type.id);
//       newProduct.categoryId = matchingType[0].categoryId;
//       newProduct.typeName = matchingType[0].name;
//       const matchingCategory = categories.filter(cat => newProduct.categoryId === cat.id);
//       newProduct.categoryName = matchingCategory[0].name;
//       return syncedProductList.push(newProduct);
//     });
//   };
//   const getTypes = () => new Promise((resolve, reject) => {
//     axios.get('../db/types.json')
//       .then((resp) => {
//         const { types } = resp.data;
//         axios.get('../db/categories.json')
//           .then((response) => {
//             const { categories } = response.data;
//             resolve([types, categories]);
//           })
//           .catch(err => console.error(err));
//       })
//       .catch(err => reject(err));
//   });
//   getTypes()
//     .then((typesAndCats) => {
//       buildProducts(typesAndCats[0], typesAndCats[1]);
//     })
//     .catch(err => console.error(err));
//   return syncedProductList;
// };

const loadProductsFromType = typeId => new Promise((resolve, reject) => {
  axios.get('../db/products.json')
    .then((resp) => {
      const allProducts = Object.entries(resp.data.products[0]);
      // syncProductsInfo(allProducts);
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
