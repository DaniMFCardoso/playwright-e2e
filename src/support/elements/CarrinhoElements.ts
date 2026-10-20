
import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class CarrinhoElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
  }

  getBotaoAceitarCookies(): Locator {
    return this.page.locator('#onetrust-accept-btn-handler');
  }

  getCampoBusca(): Locator {
    return this.page.getByPlaceholder('Busca').last();
  }

  getTituloProduto(): Locator {
    return this.page.locator('h1').first();
  }

  getBotaoAdicionarSacola(): Locator {
    return this.page.getByText('Adicionar à Sacola', {
      exact: true,
    }).first();
  }

  getBotaoSacola(): Locator {
    return this.page.locator(
      'a[data-auto-id="btn-finish-shop"]'
    );
  }

  getProdutoNaSacola(nomeProduto: string): Locator {
    return this.page.getByText(nomeProduto, {
      exact: false,
    }).first();
  }

  getMensagemSacolaVazia(): Locator {
    return this.page.locator(
      '.mini-cart__empty--message'
    );
  }
}

