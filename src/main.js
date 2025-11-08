// @ts-check

const { parse } = require("node-html-parser");
const puppeteer = require("puppeteer");

/**
 * @param {string} indexSvg
 * @param {string | undefined} verification
 * @returns {Promise<void>}
 */
const evaluateSetup = async (indexSvg, verification) => {
  const u = undefined;
  const ondemand = Object.values(globalThis["webpackChunk_twitter_responsive_web"].find(([[name]]) => name == "ondemand.s")[1])[0];
  const [fn, that] = await new Promise((res) =>
    ondemand(u, u, new Proxy(() => u, { get: (t, p) => (_, e) => p === "d" ? res([e["default"], e]) : u }))
  );
  document.body.appendChild(document.createElement("div")).innerHTML = indexSvg;
  if (verification) {
    document.querySelector("[name^=tw]")?.setAttribute("content", verification);
  }
  globalThis.elonmusk_114514 = fn()();
};

/**
 * @param {string} method
 * @param {string} url
 * @returns {Promise<any>}
 */
const evaluate = async (method, url) => {
  return await globalThis.elonmusk_114514(url, method);
};

/**
 * @returns {Promise<void>}
 */
const hookEvaluateSetup = async () => {
  globalThis.elonmusk_1145141919810 = [];
  const originalDigest = crypto.subtle.digest.bind(crypto.subtle);
  crypto.subtle.digest = async (...args) => {
    const [algo, data] = args;
    const result = await originalDigest(...args);

    globalThis.elonmusk_1145141919810.push({ algo, data, result });
    return result;
  };
};

/**
 * @typedef {Object} ResponseModel
 * @property { () => Promise<void>} close
 * @property { () => Promise<(method: string, url: string) => Promise<any>>} initIdConverter
 * @property { () => Promise<() => Promise<string>>} initKeyConverter
 * @property { () => Promise<(method: string, url: string) => Promise<string>>} initXHRConverter
 * @property {string} verification
 * @property {string} page
 */

/**
 * @returns {Promise<string>}
 */
const getKeyEvaluate = async () => {
  while (globalThis.elonmusk_1145141919810.length === 0) {
    await new Promise((res) => setTimeout(res, 100));
  }
  const last = globalThis.elonmusk_1145141919810[globalThis.elonmusk_1145141919810.length - 1];
  const toStr = (b) => new TextDecoder().decode(b instanceof ArrayBuffer ? b : b.buffer);
  return toStr(last.data);
};

const evaluateXHRSetup = async () => {
  globalThis.elonmusk_8101919 = [];
  const oOpen = XMLHttpRequest.prototype.open;
  const oSend = XMLHttpRequest.prototype.send;
  const oSet = XMLHttpRequest.prototype.setRequestHeader;

  XMLHttpRequest.prototype.open = function (method, url) {
    const path = new URL(String(url), location.href).pathname;
    // @ts-ignore
    this.elonmusk_114514_method = method;
    // @ts-ignore
    this.elonmusk_114514_path = path;
    return oOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    if (String(name).toLowerCase() === "x-client-transaction-id") {
      // @ts-ignore
      this.elonmusk_114514_tid = value;
    }
    return oSet.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function () {
    // @ts-ignore
    globalThis.elonmusk_8101919.push({
      // @ts-ignore
      method: this.elonmusk_114514_method,
      // @ts-ignore
      path: this.elonmusk_114514_path,
      // @ts-ignore
      tid: this.elonmusk_114514_tid,
    });
    return oSend.apply(this, arguments);
  };
};

const getXHREvaluate = async (method, url) => {
  while (globalThis.elonmusk_8101919.length === 0) {
    await new Promise((res) => setTimeout(res, 100));
  }
  const record = globalThis.elonmusk_8101919.find((e) => e.method === method && e.path === url);
  return record.tid;
};

/**
 * @param {import("puppeteer").Browser} browser
 * @param {import("puppeteer").Page | undefined} page
 * @returns {Promise<ResponseModel>}
 */
const createSession = async (browser, page) => {
  const newPage = page ?? (await browser.newPage());
  const indexPage = await newPage.goto("https://x.com/home");
  const input = await indexPage.text();
  const indexRoot = parse(input);
  const verification = indexRoot.querySelector("[name^=tw]")?.getAttribute("content");
  const indexSvg = indexRoot.querySelectorAll("svg").map((e) => e.outerHTML);
  return {
    close: async () => await browser.close(),
    initIdConverter: async () => {
      await newPage.evaluate(evaluateSetup, indexSvg.join(""), undefined);
      return async (method, url) => await newPage.evaluate(evaluate, method, url);
    },
    initKeyConverter: async () => {
      await newPage.evaluate(hookEvaluateSetup);
      return async () => await newPage.evaluate(getKeyEvaluate);
    },
    initXHRConverter: async () => {
      await newPage.evaluate(evaluateXHRSetup);
      return async (method, url) => await newPage.evaluate(getXHREvaluate, method, url);
    },
    verification: verification,
    page: input,
  };
};

/**
 * @param {import("puppeteer").Browser} browser
 * @param {import("puppeteer").Page | undefined} page
 * @param {string} input
 * @returns {Promise<ResponseModel>}
 */
const createSessionOverride = async (browser, page, input) => {
  const newPage = page ?? (await browser.newPage());
  await newPage.goto("https://x.com/home");
  const indexRoot = parse(input);
  const indexSvg = indexRoot.querySelectorAll("svg").map((e) => e.outerHTML);
  const verification = indexRoot.querySelector("[name^=tw]")?.getAttribute("content");

  await newPage.evaluate(evaluateSetup, indexSvg.join(""), verification);
  await newPage.evaluate(hookEvaluateSetup);

  return {
    close: async () => await browser.close(),
    initIdConverter: async () => {
      await newPage.evaluate(evaluateSetup, indexSvg.join(""), undefined);
      return async (method, url) => await newPage.evaluate(evaluate, method, url);
    },
    initKeyConverter: async () => {
      await newPage.evaluate(hookEvaluateSetup);
      return async () => await newPage.evaluate(getKeyEvaluate);
    },
    initXHRConverter: async () => {
      await newPage.evaluate(evaluateXHRSetup);
      return async (method, url) => await newPage.evaluate(getXHREvaluate, method, url);
    },
    verification: verification,
    page: input,
  };
};

/**
 * @param {Record<string, string>} cookies
 * @param {import("puppeteer").LaunchOptions} options
 * @returns {Promise<({context, init}: {context: any, init: any}) => Promise<any>>}
 */
const createAdapter = async (cookies, options) => {
  const browser = await puppeteer.launch(options);
  const cookie = Object.entries(cookies).map(([key, value]) => ({
    name: key,
    value: value,
    domain: ".x.com",
  }));
  await browser.setCookie(...cookie);
  const session = await createSession(browser, undefined);
  const idConvert = await session.initIdConverter();
  return async ({ context, init }) => {
    init.headers = {
      ...init.headers,
      "x-client-transaction-id": await idConvert(context.method, `/i/api${context.path}`),
    };
    return init;
  };
};

module.exports = { createSession, createSessionOverride, createAdapter };
