var { setDefaultTimeout, After, BeforeAll } = require('cucumber');
var { browser } = require('protractor')
var TestingBot = require('testingbot-api');

var tb;
var client_key = "my_key";
var client_secret = "my_secret";

setDefaultTimeout(60 * 1000);

BeforeAll(async () =>{
    browser.ignoreSynchronization = true;
    await browser.manage().window().maximize();
})

After(async scenario => {
    await browser.getSession().then(sessionId => {
        tb = new TestingBot({
            api_key: client_key,
            api_secret: client_secret
        });
        return tb.updateTest({
            'test[name]': scenario.pickle.name,
            'test[success]': scenario.result.status === 'passed' ? 1 : 0
        }, sessionId.getId(), function (done) { });
    })
})