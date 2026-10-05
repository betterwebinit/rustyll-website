const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve('_site');
let server, browser, base;
function files(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(f => f.isDirectory() ? files(path.join(dir,f.name)) : [path.join(dir,f.name)]); }
const pages = files(root).filter(f => f.endsWith('.html') && !/http-equiv="refresh"/i.test(fs.readFileSync(f,'utf8'))).map(f => '/' + path.relative(root,f).replace(/index\.html$/, ''));
const mime = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.xml':'application/xml'};
async function newPage(options={}) {
  const context = await browser.newContext(options);
  await context.route('https://**/*', route => route.abort());
  return context.newPage();
}
before(async () => {
  server = http.createServer((req,res) => {
    let filename = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://local').pathname));
    if (!filename.startsWith(root + path.sep) && filename !== root) { res.writeHead(403).end(); return; }
    if (fs.existsSync(filename) && fs.statSync(filename).isDirectory()) filename=path.join(filename,'index.html');
    if (!fs.existsSync(filename)) { res.writeHead(404,{'Content-Type':'text/html'}); res.end(fs.readFileSync(path.join(root,'404.html'))); return; }
    res.writeHead(200,{'Content-Type':mime[path.extname(filename)]||'application/octet-stream'});
    fs.createReadStream(filename).pipe(res);
  });
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  base=`http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({channel:'chrome',headless:true});
});
after(async () => { await browser?.close(); await new Promise(resolve=>server.close(resolve)); });

test('all published content pages fit desktop and mobile, with one h1 and unique IDs', {timeout:180000}, async () => {
  const page = await newPage(); const failures=[]; const errors=[];
  page.on('pageerror', e=>errors.push(e.message));
  for(const width of [320,390,768,1024,1440]) {
    await page.setViewportSize({width,height:900});
    for(const route of pages) {
      await page.goto(base+route,{waitUntil:'load'});
      const result=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('main h1').length,duplicates:[...document.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,a)=>a.indexOf(id)!==i),toc:[...document.querySelectorAll('.page-toc a')].filter(e=>!document.getElementById(decodeURIComponent(e.hash.slice(1)))).map(e=>e.hash)}));
      if(result.scroll>result.width+1||result.h1!==1||result.duplicates.length||result.toc.length)failures.push({route,...result});
    }
  }
  assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
  await page.context().close();
});

test('search indexes real content, supports keyboard/mobile, empty and failure states', async()=>{
  const page=await newPage({viewport:{width:1440,height:900}});await page.goto(base);
  await page.locator('.header-actions [data-search-open]').click();
  const field=page.locator('#global-search'); await field.fill('installation');
  await page.waitForFunction(()=>document.querySelector('#global-search-results a'));
  assert.ok((await page.locator('#global-search-results').innerText()).includes('Installation'));
  await field.press('ArrowDown');assert.equal(await page.evaluate(()=>document.activeElement.tagName),'A');
  await field.fill('configuration'); await page.waitForFunction(()=>document.querySelector('#global-search-results')?.textContent.includes('Configuration'));
  await field.fill('migration'); await page.waitForFunction(()=>document.querySelector('#global-search-results a'));
  await field.fill('zzzz-no-match-123'); await page.waitForFunction(()=>document.querySelector('#search-dialog [role=status]').textContent.includes('No results'));
  await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('#search-dialog').open);
  assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-search-open')),true);
  await page.setViewportSize({width:390,height:844});await page.keyboard.press('Control+k');assert.equal(await field.evaluate(e=>document.activeElement===e),true);
  await field.fill('Liquid');await page.waitForFunction(()=>document.querySelector('#global-search-results a'));await page.locator('#global-search-results a').first().click();assert.ok(page.url().includes('/docs/'));
  await page.context().close();
  const failed=await newPage();await failed.route('**/search.json',route=>route.fulfill({status:503,body:'unavailable'}));await failed.goto(base+'/search/');await failed.locator('#page-search').fill('installation');await failed.waitForFunction(()=>document.querySelector('[data-search-status]').textContent.includes('temporarily unavailable'));await failed.context().close();
});

test('menus synchronize aria, close with Escape and recover focus across breakpoints',async()=>{
  const page=await newPage();for(const width of [390,768]){await page.setViewportSize({width,height:844});await page.goto(base);const button=page.locator('#mobile-menu-button');await button.click();assert.equal(await button.getAttribute('aria-expanded'),'true');assert.equal(await page.locator('#mobile-menu').isVisible(),true);await page.keyboard.press('Escape');assert.equal(await button.getAttribute('aria-expanded'),'false');assert.equal(await button.evaluate(e=>document.activeElement===e),true)}
  await page.locator('#mobile-menu-button').click();await page.locator('#mobile-menu a').first().focus();await page.setViewportSize({width:1440,height:900});await page.waitForFunction(()=>document.querySelector('#mobile-menu').hidden);assert.equal(await page.locator('.desktop-nav').isVisible(),true);assert.equal(await page.evaluate(()=>document.activeElement.closest('.desktop-nav')!==null),true);await page.context().close();
});

test('commands remain visible without JS and copy only executable text with JS',async()=>{
  const page=await newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await page.goto(base);assert.equal(await page.locator('.command-row code').count(),4);assert.equal(await page.locator('.no-js-nav').isVisible(),true);assert.equal(await page.locator('.home-hero').evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(0, 0, 0, 0)');await page.context().close();
  const copy=await newPage();await copy.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{window.copiedText=text}}})});await copy.goto(base);await copy.locator('[data-copy]').first().click();assert.equal(await copy.evaluate(()=>window.copiedText),'cargo install rustyll');assert.match(await copy.locator('#copy-status').innerText(),/copied/);await copy.context().close();
});

test('restored terminal simulation opens, accepts commands and respects focus',async()=>{
  const page=await newPage();await page.goto(base);
  const toggle=page.locator('#terminal-toggle');
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-expanded'),'true');
  assert.equal(await page.locator('#terminal-playground').isVisible(),true);
  assert.equal(await page.locator('#quickstart-terminal').isVisible(),false);
  const input=page.locator('#terminal-input');
  await input.fill('help');await input.press('Enter');
  await page.waitForFunction(()=>document.querySelector('#terminal-playground-history')?.textContent.includes('Available commands'));
  await input.fill('echo <img src=x onerror=window.terminalXss=1>');await input.press('Enter');
  await page.waitForFunction(()=>document.querySelectorAll('#terminal-playground-history .command-entry').length===2);
  assert.equal(await page.evaluate(()=>window.terminalXss),undefined);
  await page.locator('#terminal-toggle').focus();
  await page.waitForTimeout(1100);
  assert.equal(await toggle.evaluate(e=>document.activeElement===e),true);
  await toggle.click();
  assert.equal(await page.locator('#quickstart-terminal').isVisible(),true);
  await page.context().close();
});

test('tutorial progress and links cover beginning, middle and end',async()=>{
  const page=await newPage();for(const [route,position]of [['01-setup',1],['05-includes',5],['10-deployment',10]]){await page.goto(base+'/docs/step-by-step/'+route+'/');assert.equal(await page.locator('progress').getAttribute('value'),String(position));assert.equal(await page.locator('progress').getAttribute('max'),'10');assert.equal(await page.locator('.doc-pagination a').count(),position===5?2:1)}await page.context().close();
});

test('documentation table of contents nests subheadings and follows anchors',async()=>{
  const page=await newPage({viewport:{width:1440,height:900}});
  await page.goto(base+'/docs/installation/');
  assert.ok(await page.locator('.docs-toc .toc-level-2 > ul > .toc-level-3').count()>0);
  const link=page.locator('.docs-toc .toc-level-3 a').first();
  const hash=await link.getAttribute('href');
  await link.click();
  assert.equal(new URL(page.url()).hash,hash);
  assert.equal(await page.locator(hash).count(),1);
  await page.context().close();
});

test('shared page families pass automated WCAG A/AA checks', {timeout:90000},async()=>{
  const page=await newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});const failures=[];
  for(const route of ['/','/docs/','/docs/configuration/','/tutorials/home/','/docs/step-by-step/01-setup/','/news/','/resources/','/showcase/','/team/','/philosophy/','/rustyllconf/','/404.html']){
    await page.goto(base+route);await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
    const violations=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});if(violations.length)failures.push({route,violations});
    const animations=await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);assert.equal(animations,0);
  }
  assert.deepEqual(failures,[]);await page.context().close();
});

test('no analytics, runtime Tailwind or unsupported forms are shipped',async()=>{
  const page=await newPage();await page.goto(base);assert.equal(await page.locator('script[src*="googletagmanager"],script[src*="cdn.tailwindcss"],#cookie-banner,form').count(),0);await page.context().close();
});
