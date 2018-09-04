var { generate } = require('cucumber-html-reporter');
// var client_key = "my_key";
// var client_secret = "my_secret";
var client_key = "c0bf4ee16175ea5b7a34c33508caad2e";
var client_secret = "194899160937f4df4eb5beab285f2e1c";

exports.config = {
    seleniumAddress: 'https://hub.testingbot.com/wd/hub',
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome',
        client_key: client_key,
        client_secret: client_secret
    },
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: [
        './**/*.feature'
    ],
    cucumberOpts: {
        format: ['json:reports/cucumber_report.json'],
        require: ['./elements/**/*.js', './steps/**/*.js', './support/**/*.js', './pages/**/*.js']
    },
    ignoreUncaughtExceptions: true,
    onComplete: () => {
        generate({
            theme: 'bootstrap',
            jsonFile: 'reports/cucumber_report.json',
            output: 'reports/cucumber_report.html',
            reportSuiteAsScenarios: true,
            launchReport: false
        });
    },
    noGlobals: true
};