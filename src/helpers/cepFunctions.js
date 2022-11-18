const spanCep = document.querySelector('.cart__address');

export const getAddress = async (parametro) => {
  const awesomeAPI = fetch(`https://cep.awesomeapi.com.br/json/${parametro}`);
  const brazilAPI = fetch(`https://brasilapi.com.br/api/cep/v2/${parametro}`);
  const arrayPromises = [brazilAPI, awesomeAPI];
  const valor = await Promise.any(arrayPromises).then((value) => value);
  const cepComplete = await valor.json();
  return cepComplete;
};

const erromessage = () => {
  spanCep.innerHTML = 'CEP não encontrado';
};

const brazilAPiFUnction = (par) => {
  spanCep.innerHTML = `${par.street} - ${par.neighborhood} - ${par.city} - ${par.state}`;
};

const awesomeAPiFunction = (par) => {
  spanCep.innerHTML = `${par.address} - ${par.district} - ${par.city} - ${par.state}`;
};

export const searchCep = async (par) => {
  if (!Number(par)) return erromessage();
  const cep = await getAddress(par);
  if (!cep.cep) return erromessage();
  if (!cep.address) return brazilAPiFUnction(cep);
  if (cep.address) return awesomeAPiFunction(cep);
};
