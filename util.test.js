const puppeteer = require('puppeteer');
const {generateText, checkAndGenerate} = require('./util'); // jest does not support es6 import adn export so we use node-like exports. or module.exports and require

// UNIT TESTS
test('should output name and age', () => {
  const text = generateText('Ajdin', 23);
  expect(text).toBe('Ajdin (23 years old)');
  const text2 = generateText('Aida', 23);
  expect(text2).toBe('Aida (23 years old)');
});

test('should output data-less text', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)');
  const text2 = generateText();
  expect(text2).toBe('undefined (undefined years old)');
});

// INTEGRATION TEST
test ('should generate a valid text output', () =>{
  const text = checkAndGenerate('Ajdin', 23);
  expect(text).toBe('Ajdin (23 years old)');
});

// end2end TEST
test('should create an element with text and correct class', async () => {
  const browser = await puppeteer.launch( // this will return a Promise
    {
      headless: true, // false if we want to open the browser
      // slowMo: 80,
      // args: ['--window-size=400,1080']
    });

    const page = await browser.newPage();
    await page.goto(
      'file:///C:/projects/js-testing/js-testing-introduction/index.html'
    );
    await page.click('input#name');
    await page.type('input#name', 'Aida');
    
    await page.click('input#age');
    await page.type('input#age', '23');

    await page.click('#btnAddUser');

    const finalText = await page.$eval('.user-item', el => el.textContent);

    expect(finalText).toBe('Aida (23 years old)');
}, 10000);