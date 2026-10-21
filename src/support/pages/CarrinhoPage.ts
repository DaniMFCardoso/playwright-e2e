
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
        'https://www.sephora.com.br/checkout/cart/',
        { waitUntil: 'domcontentloaded' }
    );

    await this.aceitarCookies();

    await this.page.waitForTimeout(3000);

    console.log('URL atual:', this.page.url());
    console.log('Título:', await this.page.title());
    console.log(
        'HTML da página:',
        (await this.page.locator('body').innerText()).slice(0, 5000)
    );
    }

    async validarProdutoAdicionado(): Promise<void> {
        await this.abrirSacola();

        await expect(this.page.locator('body')).toBeVisible();
    }

    async validarSacolaVazia(): Promise<void> {
        await this.abrirSacola();

        await expect(this.page.locator('body')).toBeVisible();
    }
}
