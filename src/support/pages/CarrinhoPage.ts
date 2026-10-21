
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

  async adicionarProdutoSacola(): Promise<void> {
    const botao =
      this.carrinhoElements.getBotaoAdicionarSacola();

    await expect(botao).toBeVisible();
    await expect(botao).toBeEnabled();
    await botao.click();
  }

  async abrirSacola(): Promise<void> {
    await this.page.goto(
      'https://www.sephora.com.br/checkout/cart/'
    );

    await this.aceitarCookies();
    await expect(this.page).toHaveURL(/\/checkout\/cart/);
  }

  async validarProdutoAdicionado(): Promise<void> {
    await this.abrirSacola();

    await expect(
        this.carrinhoElements.getConteudoCarrinho()
    ).toBeVisible();

    const conteudo = (
        await this.carrinhoElements.getConteudoCarrinho().innerText()
    ).trim();

    expect(conteudo.length).toBeGreaterThan(0);

    console.log('Conteúdo da página do carrinho:', conteudo);
    }

    async validarSacolaVazia(): Promise<void> {
    await this.abrirSacola();

    await expect(
        this.carrinhoElements.getConteudoCarrinho()
    ).toBeVisible();

    const conteudo = (
        await this.carrinhoElements.getConteudoCarrinho().innerText()
    ).trim();

    console.log('Conteúdo da página do carrinho:', conteudo);
    }
}
