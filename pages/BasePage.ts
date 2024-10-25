import { Page, BrowserContext } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page, protected context: BrowserContext) {}

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getContext() {
    return await this.context;
  }

  async getByText(visibleText: string) {
    return await this.page.getByText(visibleText);
  }

  async waitForLoadState(type: "load" | "domcontentloaded" | "networkidle" | undefined){
    return await this.page.waitForLoadState(type);
  }
}
