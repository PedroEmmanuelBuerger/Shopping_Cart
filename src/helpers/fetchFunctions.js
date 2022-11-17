export const fetchProduct = async (parametro) => {
  if (!parametro) { throw new Error('ID não informado'); }
  const idcomplete = await fetch(`https://api.mercadolibre.com/items/${parametro}`);
  const result = await idcomplete.json();
  return result;
};

export const fetchProductsList = async (parametro) => {
  if (!parametro) { throw new Error('Termo de busca não informado'); }
  const apiSearch = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${parametro}`);
  const result = await apiSearch.json();
  return result.results;
};
