import { searchCep } from './helpers/cepFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const fetchProductsList = async (parametro) => {
    if (!parametro) { throw new Error('Termo de busca não informado')}
    const apiSearch = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${parametro}`)
    try {
      const result = await apiSearch.json();
      return result.results
    }
    catch (erro) { return erro.message }
  };
  console.log(await fetchProductsList('computador'))