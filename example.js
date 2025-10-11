const fs = require("fs").promises;
const puppeteer = require("puppeteer");
const { createSession, createSessionOverride } = require("./src/main");
const { decodeTransactionId } = require("x-client-transaction-id-generater");

const get = async (browser) => {
  const cookies = JSON.parse(await fs.readFile("cookies.json", "utf-8"));
  await browser.setCookie(
    ...cookies.map((cookie) => ({
      name: cookie.name,
      value: cookie.value,
      domain: cookie.domain,
    }))
  );
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const session = await createSession(browser, undefined);
  const keyConverter = await session.initKeyConverter();
  const id = await keyConverter();
  console.log(id.split("obfiowerehiring")[1]);
  await fs.writeFile("index.html", session.page);

  await session.close();
})();
