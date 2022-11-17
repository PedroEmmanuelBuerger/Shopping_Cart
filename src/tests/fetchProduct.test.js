import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('verificar se a função fetchproduct é de fato uma função', async () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('verificar se a função chama uma fetch', async () => {
    fetchProduct('MLB1405519561')
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Teste se o retorno da função fetchProduct com o argumento do produto "MLB1405519561" é uma estrutura de dados igual ao objeto produto que já está importado no arquivo.', async () => {
    const productObj = product;
    expect(await fetchProduct('MLB1405519561')).toEqual(productObj)
  });

  it('Teste se, ao chamar a função fetchProduct sem argumento, retorna um erro com a mensagem: ID não informado.', async () => {
   const errormessageNoID = 'ID não informado'
    await  expect(fetchProduct('')).rejects.toThrow(errormessageNoID)
    await  expect(fetchProduct()).rejects.toThrow(errormessageNoID)
  });

});
