const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false, timeout: 0 });
  const page = await browser.newPage();

  await page.goto("https://pops.vn/genres/gia-tuong-5eb50102aa63450033ea5aac");

  // Type into search box.
  //   await page.type(".devsite-search-field", "Headless Chrome");

  // Wait for suggest overlay to appear and click "show all results".
  //   const allResultsSelector = ".devsite-suggest-all-results";
  //   await page.waitForSelector(allResultsSelector);
  //   await page.click(allResultsSelector);

  // Wait for the results page to load and display the results.
  await page.waitForSelector(".default_cardComicsTab___Hdr6");
  // Extract the results from the page.
  const data = await page.evaluate(() => {
    const comics = document.querySelectorAll(".default_cardComicsTab___Hdr6");
    console.log(comics);
    return comics;
  });

  console.log(data);

  // Print all the files.

  //   await browser.close();
})();
