import { PokedexAuthPage } from './app.po';

describe('pokedex-auth App', () => {
  let page: PokedexAuthPage;

  beforeEach(() => {
    page = new PokedexAuthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
