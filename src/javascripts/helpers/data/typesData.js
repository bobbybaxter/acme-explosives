import axios from 'axios';

const loadTypes = () => axios.get('../db/types.json');

const loadTypesFromCategory = categoryId => new Promise((resolve, reject) => {
  axios.get('../db/types.json')
    .then((resp) => {
      const allTypes = resp.data.types;
      const matchingTypes = allTypes.filter(type => type.categoryId === categoryId);
      resolve(matchingTypes);
    })
    .catch(err => reject(err));
});

const getTypesForEachCategory = categories => new Promise((resolve, reject) => {
  axios.get('../db/types.json')
    .then((resp) => {
      const { types } = resp.data;
      const categoriesWithTypes = categories.map((category) => {
        const newCategory = category;
        const matchingTypes = types.filter(type => type.categoryId === category.id);
        newCategory.types = matchingTypes;
        return newCategory;
      });
      resolve(categoriesWithTypes);
    })
    .catch(err => reject(err));
});

export default { loadTypesFromCategory, getTypesForEachCategory, loadTypes };
