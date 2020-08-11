import { ObaPage } from './app.po';

describe('oba App', function() {
  let page: ObaPage;

  beforeEach(() => {
    page = new ObaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
