import { By, until, WebDriver } from "selenium-webdriver";

export class SpecPage {
  driver: WebDriver;
  url: string = "https://google.com";
  
  searchBar: By = By.css('input[name="q"]')
  results: By = By.css('#rso')

  constructor(driver: WebDriver) {
    this.driver = driver;

  }
  
  async navigate() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(this.searchBar));
    await this.driver.wait(
      until.elementIsVisible(await this.driver.findElement(this.searchBar))
    );
  }
  async sendKeys(elementBy: By, keys) {
    await this.driver.wait(until.elementLocated(elementBy));
    return this.driver.findElement(elementBy).sendKeys(keys);
  }

  async getText(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    return (await this.driver.findElement(elementBy)).getText();
  }

  async doSearch(text: string) {
    return this.sendKeys(this.searchBar, `${text}\n`);
  }

  async getResults() {
    return this.getText(this.results);
  }
}
