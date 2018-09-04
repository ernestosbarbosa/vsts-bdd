var { browser } = require('protractor');
var { Given, When, Then } = require('cucumber')
var { expect } = require('chai')
var { PaginaInicial } = require('../pages/paginaInicial')

Given(/^que acessei a pagina inicial$/, async function () {
    await PaginaInicial.abrir();
})
When(/^selecionar o menu (.*)$/, async function (menu) {
    await PaginaInicial.selecionarMenu(menu);
})
Then(/^deve exibir a página de (.*) com as informações correspondentes$/, async function (menu) {
    await browser.getCurrentUrl().then(url => {
        expect(url).to.equal("https://www.cwi.com.br/" + menu)
    })
})

