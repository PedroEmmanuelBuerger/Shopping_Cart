export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (parametro) => {
  if (!parametro) { throw new Error('Termo de busca não informado') }
  try {
    const apiSearch = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${parametro}`)
    const result = await apiSearch.json();
    return result.results
  }
  catch (erro) {
    const pai = document.querySelector('.products')
    const errorMessege = document.createElement('h1')
    errorMessege.setAttribute('class', 'error')
    errorMessege.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente'
   return pai.appendChild(errorMessege)
  }
};
