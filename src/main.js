import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

const localProductCart = document.querySelector('.cart__products');
const localSection = document.querySelector('.products');
const loadingText = document.createElement('h1');
const c = document.querySelector('.cep-input');

window.onload = async () => {
  const ids = getSavedCartIDs();
  const Arraysids = ids.map((Element) => fetchProduct(Element));
  const valores = await Promise.all(Arraysids);
  for (let i = 0; i < valores.length; i += 1) {
    const result = createCartProductElement(valores[i]);
    localProductCart.appendChild(result);
  }
};

document.querySelector('.cep-button').addEventListener('click', () => searchCep(c.value));
loadingText.setAttribute('class', 'loading');
loadingText.innerText = 'Carregando...';
localSection.appendChild(loadingText);

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
const cartAdd = async (produto) => {
  const id = produto.firstChild.innerText;
  saveCartID(id);
  const produtoCompleto = await fetchProduct(id);
  const criarProdutoHtml = await createCartProductElement(produtoCompleto);
  return localProductCart.appendChild(criarProdutoHtml);
};

const produtos = document.getElementsByClassName('product');
for (let i = 0; i < produtos.length; i += 1) {
  const botao = document.querySelectorAll('.product__add');
  botao[i].addEventListener('click', () => cartAdd(produtos[i]));
}
