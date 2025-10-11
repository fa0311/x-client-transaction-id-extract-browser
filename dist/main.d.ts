export type ResponseModel = {
    close: () => Promise<void>;
    initIdConverter: () => Promise<(method: string, url: string) => Promise<any>>;
    initKeyConverter: () => Promise<() => Promise<string>>;
    verification: string;
    page: string;
};
/**
 * @param {import("puppeteer").Browser} browser
 * @param {import("puppeteer").Page | undefined} page
 * @returns {Promise<ResponseModel>}
 */
export function createSession(browser: import("puppeteer").Browser, page: import("puppeteer").Page | undefined): Promise<ResponseModel>;
/**
 * @param {import("puppeteer").Browser} browser
 * @param {import("puppeteer").Page | undefined} page
 * @param {string} input
 * @returns {Promise<ResponseModel>}
 */
export function createSessionOverride(browser: import("puppeteer").Browser, page: import("puppeteer").Page | undefined, input: string): Promise<ResponseModel>;
/**
 * @param {Record<string, string>} cookies
 * @param {import("puppeteer").LaunchOptions} options
 * @returns {Promise<({context, init}: {context: any, init: any}) => Promise<any>>}
 */
export function createAdapter(cookies: Record<string, string>, options: import("puppeteer").LaunchOptions): Promise<({ context, init }: {
    context: any;
    init: any;
}) => Promise<any>>;
