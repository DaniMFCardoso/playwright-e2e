
import { test } from '@playwright/test';
import CarrinhoPage from '../support/pages/CarrinhoPage';

test.describe('Cadastro de produtos no carrinho - Sephora', () => {
  let carrinhoPage: CarrinhoPage;

  const BASE_URL = 'https://www.sephora.com.br/';

  const URL_PRODUTO =
    'https://www.sephora.com.br/feito-strengthening-face-250g-512405.html';

  const NOME_PRODUTO =
    'hidratante fortalecedor cocais feito brasil';

  test.beforeEach(async ({ page }) => {
    carrinhoPage = new CarrinhoPage(page);

    await page.goto(BASE_URL);
  });

  test('Adicionar produto ao carrinho', async () => {
    await carrinhoPage.acessarProduto(URL_PRODUTO);

    await carrinhoPage.adicionarProdutoSacola();

    await carrinhoPage.validarProdutoAdicionado(
      NOME_PRODUTO
    );
  });

  test('Validar carrinho vazio', async () => {
    await carrinhoPage.validarSacolaVazia();
  });
});
