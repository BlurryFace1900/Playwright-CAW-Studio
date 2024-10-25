import { Page, BrowserContext } from '@playwright/test';
import { BasePage } from './BasePage';


export class HomePage extends BasePage {

  readonly tableBtn = this.page.getByText('Table Data');
  readonly jsonTextBox = this.page.locator('#jsondata');
  readonly refreshTblBtn = this.page.getByRole('button', { name: 'Refresh Table' });
  readonly dynamicTbl = this.page.locator("//table[@id='dynamictable']");

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  async getTitle() {
    return this.page.title();
  }

  async clickExampleLink() {
    await this.page.click('text=Example Link');
  }

}
