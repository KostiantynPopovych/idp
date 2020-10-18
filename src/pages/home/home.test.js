const faker = require('faker');
const puppeteer = require('puppeteer');

const URL = 'https://api.contentful.com/spaces/vbcxif4jja7r/environments/master/entries';

const pageSettings = {
  viewport: {
    width: 500,
    height: 2400
  },
  userAgent: ''
};

const browserSettings = {
  headless: false
};

const item = {
  name: faker.name.title(),
  description: faker.lorem.sentences(),
  image: faker.image.imageUrl()
};

describe('Items', () => {
  test('Add item', async () => {
    let browser = await puppeteer.launch(browserSettings);
    let page = await browser.newPage();
    await page.emulate(pageSettings);
    await page.goto('http://localhost:3000/');
    await page.waitForResponse(URL);
    await page.waitForTimeout(1000);
    const initialItemsCount = (await page.$$('#item-wrap')).length;
    await page.click('#add-item-btn');
    await page.waitForSelector('#add-edit-item-form');
    await page.click("input[name=name]");
    await page.type("input[name=name]", item.name);
    await page.click("input[name=description]");
    await page.type("input[name=description]", item.description);
    await page.click("input[name=image]");
    await page.type("input[name=image]", item.image);
    await page.click('.ant-btn.ant-btn-primary');
    await page.waitForResponse(URL);
    await page.waitForTimeout(1000);
    const itemsCountAfterAdd = (await page.$$('#item-wrap')).length;
    expect(itemsCountAfterAdd).toBe(initialItemsCount + 1);
    await browser.close();
  }, 16000);
  test('Edit item', async () => {
    let browser = await puppeteer.launch(browserSettings);
    let page = await browser.newPage();
    await page.emulate(pageSettings);
    await page.goto('http://localhost:3000/');
    await page.waitForResponse(URL);
    await page.waitForTimeout(1000);
    const item = await page.$('#item-wrap');
    const itemImage = await item.$eval('#card-image', el => el.getAttribute('src'));
    const itemName = await item.$eval('.ant-card-meta-title', el => el.innerHTML);
    const itemDescription = await item.$eval('.ant-card-meta-description', el => el.innerHTML);
    (await item.$('#edit-btn')).click();
    const form = await page.waitForSelector('#add-edit-item-form');
    const inputImageValue = await form.$eval("input[name=image]", el => el.value);
    const inputNameValue = await form.$eval("input[name=name]", el => el.value);
    const inputDescriptionValue = await form.$eval("input[name=description]", el => el.value);
    expect(itemImage).toBe(inputImageValue);
    expect(itemName).toBe(inputNameValue);
    expect(itemDescription).toBe(inputDescriptionValue);
    await browser.close();
  }, 16000);
  test('Delete item', async () => {
    let browser = await puppeteer.launch(browserSettings);
    let page = await browser.newPage();
    await page.emulate(pageSettings);
    await page.goto('http://localhost:3000/');
    await page.waitForResponse(URL);
    await page.waitForTimeout(1000);
    const initialItemsCount = (await page.$$('#item-wrap')).length;
    const item = await page.$('#item-wrap');
    (await item.$('#delete-btn')).click();
    await page.waitForResponse(URL);
    await page.waitForTimeout(1000);
    const itemsCountAfterAdd = (await page.$$('#item-wrap')).length;
    expect(itemsCountAfterAdd).toBe(initialItemsCount - 1);
    await browser.close();
  }, 16000);
});