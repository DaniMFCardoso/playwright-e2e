
import { Page, expect } from '@playwright/test';
import CarrinhoElements from '../elements/CarrinhoElements';
import BasePage from './BasePage';

export default class CarrinhoPage extends BasePage {
  readonly carrinhoElements: CarrinhoElements;

  constructor(readonly page: Page) {
    super(page);
    this.carrinhoElements = new CarrinhoElements(page);
  }

  async aceitarCookies(): Promise<void> {
    const botao =
      this.carrinhoElements.getBotaoAceitarCookies();

    if (await botao.isVisible().catch(() => false)) {
      await botao.click();
    }
  }

  async acessarProduto(urlProduto: string): Promise<void> {
    await this.page.goto(urlProduto);
    await this.aceitarCookies();

    await expect(
      this.carrinhoElements.getTituloProduto()
    ).toBeVisible();
  }

  async pesquisarProduto(nomeProduto: string): Promise<void> {
    const campoBusca =
      this.carrinhoElements.getCampoBusca();

    await expect(campoBusca).toBeVisible();
    await campoBusca.fill(nomeProduto);
    await campoBusca.press('Enter');
  }

  async adicionarProdutoSacola(): Promise<void> {
    const botao =
      this.carrinhoElements.getBotaoAdicionarSacola();

    await expect(botao).toBeVisible();
    await expect(botao).toBeEnabled();
    await botao.click();
  }

  async validarProdutoAdicionado(
    nomeProduto: string
  ): Promise<void> {
    const botaoSacola =
      this.carrinhoElements.getBotaoSacola();

    await expect(botaoSacola).toBeVisible();
    await botaoSacola.click();

    await expect(this.page).toHaveURL(/\/checkout\/cart/);

    await expect(
      this.carrinhoElements.getProdutoNaSacola(nomeProduto)
    ).toBeVisible();
  }

  async validarSacolaVazia(): Promise<void> {
    await this.page.goto(
      'https://www.sephora.com.br/checkout/cart/'
    );

    await this.aceitarCookies();

    await expect(
      this.carrinhoElements.getMensagemSacolaVazia()
    ).toBeVisible();
  }
}

