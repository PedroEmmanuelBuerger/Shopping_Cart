import { fetchProduct } from './fetchFunctions';
/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
const subtotal = document.querySelector('.total-price');
const data = Number(localStorage.getItem('ValorSubtotal'));
if (data <= 0) { subtotal.innerText = 0; } else subtotal.innerText = data.toFixed(2);
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = async (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');
  const cartProducts = getSavedCartIDs();
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
  const obj = await fetchProduct(id);
  const sum = Number(subtotal.innerText) + obj.price;
  subtotal.innerText = '';
  subtotal.innerText = sum.toFixed(2);
  localStorage.setItem('ValorSubtotal', JSON.parse(subtotal.innerText));
};
/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = async (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');
  const cartProducts = getSavedCartIDs();
  const newCartProducts = cartProducts.filter((product) => product !== id);
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
  const obj = await fetchProduct(id);
  const sub = subtotal.innerText - obj.price;
  subtotal.innerText = '';
  subtotal.innerText = sub.toFixed(2);
  localStorage.setItem('ValorSubtotal', JSON.parse(subtotal.innerText));
};
