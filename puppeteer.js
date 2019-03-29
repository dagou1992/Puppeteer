const puppeteer = require('puppeteer');

async function main(value) {
    // 配置浏览器
    const browser = await puppeteer.launch({headless: true});

    // 创建一个新页面
    const page = await browser.newPage();

    // 进入网址
    await page.goto('https://juejin.im/timeline');

    // 找到搜索框
    await page.type('.search-input', value);

    // 点击搜索
    await page.keyboard.press('Enter');

    // 等待文章列表出来
    await page.waitForSelector('.main-list');

    // // 把滚动条滚动到指定位置
    // await page.evaluate(() => window.scrollTo(0, 3000));
    //
    // // 等待时间根据滚动条的位置要增加，不然来不及反应
    // await page.waitFor(2000);

    // 截图看一下
    await page.screenshot({
        path: 'image.png',
        fullPage: true,
    });

    // 找一下文章容器
    const list = await page.$('.main-list');

    // 组合一下文章标题和链接
    const result = await list.$$eval('.entry-link', e => e.map(v => ({
        href: v.href,
        title: v.querySelector('.title').firstChild.innerText
    })));

    return result;
}

module.exports = main;