import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const localSection = document.querySelector('.products')
const loadingText = document.createElement('h1');
loadingText.setAttribute('class', 'loading');
loadingText.innerText = 'Carregando...'
localSection.appendChild(loadingText)
// 
const lista = await fetchProductsList('computador')
try{
    loadingText.remove(localSection)
    const ids = lista.map(Element => Element.id)
    const titles = lista.map(Element => Element.title)
    const imgs = lista.map(Element => Element.thumbnail)
    const prices = lista.map(Element => Element.price)
    
    for (let i = 0; i <lista.length; i += 1 ) {
        const obj = {
            id: ids[i],
            title: titles[i],
            thumbnail: imgs[i],
            price: prices[i]
            }
    localSection.appendChild(createProductElement(obj)) 
    }
}
catch(erro) {console.log('Algum erro ocorreu, recarregue a página e tente novamente')}
