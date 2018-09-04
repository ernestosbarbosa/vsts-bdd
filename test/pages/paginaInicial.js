var { browser, element, by, ElementFinder } = require('protractor')
var { Common } = require('../support/common');
var { expect } = require('chai')

class PaginaInicial {

    static async abrir(){
        await browser.get("http://www.cwi.com.br");
    }

    static async selecionarMenu(menu){
        await Common.element("menu", menu).click();
    }

}

exports.PaginaInicial = PaginaInicial;