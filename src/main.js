import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const localSection = document.querySelector('.products');
const loadingText = document.createElement('h1');
loadingText.setAttribute('class', 'loading');
loadingText.innerText = 'Carregando...';
localSection.appendChild(loadingText);
//
const createUI = (par) => {
  loadingText.remove(localSection);
  const ids = par.map((Element) => Element.id);
  const titles = par.map((Element) => Element.title);
  const imgs = par.map((Element) => Element.thumbnail);
  const prices = par.map((Element) => Element.price);

  for (let i = 0; i < par.length; i += 1) {
    const obj = {
      id: ids[i],
      title: titles[i],
      thumbnail: imgs[i],
      price: prices[i],
    };
    localSection.appendChild(createProductElement(obj));
  }
};
try {
  const lista = await fetchProductsList('computador');
  createUI(lista);
} catch (erro) {
  const pai = document.querySelector('.products');
  const errorMessege = document.createElement('h1');
  errorMessege.setAttribute('class', 'error');
  errorMessege.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  pai.appendChild(errorMessege);
}

