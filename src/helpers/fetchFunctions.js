export const fetchProduct = (parametro) => {

};

export const fetchProductsList = async (parametro) => {
  if (!parametro) { throw new Error('Termo de busca não informado'); }
  const apiSearch = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${parametro}`);
  const result = await apiSearch.json();
  return result.results;
};
