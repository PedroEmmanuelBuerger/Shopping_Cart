import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const lista = await fetchProductsList('computador')
const ids = lista.map(Element => Element.id)
const titles = lista.map(Element => Element.title)
const imgs = lista.map(Element => Element.thumbnail)
const prices = lista.map(Element => Element.price)
const localSection = document.querySelector('.products')
for (let i = 0; i <lista.length; i += 1 ) {
    const obj = {
        id: ids[i],
        title: titles[i],
        thumbnail: imgs[i],
        price: prices[i]
        }
localSection.appendChild(createProductElement(obj)) 
}
