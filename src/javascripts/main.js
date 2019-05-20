import '../styles/main.scss';
import 'bootstrap';
import categories from './components/categories/categories';
import navbar from './components/navbar/navbar';

const init = () => {
  navbar.init();
  categories.initCategories();
};

init();
