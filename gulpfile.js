var workItemId = 97;
var gulp = require('gulp');
var del = require('del');
var vsts = require('vso-node-api');
var fs = require('fs');
var FilePath = './test/features/us.feature';
var collectionUrl = "https://ernestosbarbosa.visualstudio.com/";
var token = "w6awxvddf2jxrnaiqij3fa3zorvzhdm6murbl5brmdwhxchrdv7q";
var project = "vsts-bdd";
var authHandler = vsts.getPersonalAccessTokenHandler(token);
var connect = new vsts.WebApi(collectionUrl, authHandler);

gulp.task('clean-test', function () {
    return del(['./test/features/*.feature']);
});

gulp.task('features', ['clean-test'], async function () {
    let api = await connect.getWorkItemTrackingApi();
    return await api.getWorkItem(workItemId).then(workItem => {
        var str = "#language: pt \n" +
            "#encoding: utf-8 \n" +
            "Funcionalidade: " + workItem.fields['System.Title'] + "\n" +
            convertHtmlToText(workItem.fields['AgileTest.Contexto']) + "\n" +
            convertHtmlToText(workItem.fields['AgileTest.BDDCenarios']);
        fs.writeFileSync(FilePath, str, "utf8");
    })
});

gulp.task('report', function() {
    gulp.src('reports/cucumber_report.json')
        .pipe(cucumberXmlReport({strict: true}))
        .pipe(gulp.dest('reports'));
});

function cucumberXmlReport(opts) {
    var gutil = require('gulp-util'),
        through = require('through2'),
        cucumberJunit = require('cucumber-junit');
    
    return through.obj(function (file, enc, cb) {
        // If tests are executed against multiple browsers/devices
        var suffix = file.path.match(/\/cucumber-?(.*)\.json/);
        if (suffix) {
            opts.prefix = suffix[1] + ';';
        }
        
        var xml = cucumberJunit(file.contents, opts);
        file.contents = new Buffer(xml);
        file.path = gutil.replaceExtension(file.path, '.xml');
        cb(null, file);
    });
}

function convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<br>/gi, "\n");
    returnText = returnText.replace(/<br\s\/>/gi, "\n");
    returnText = returnText.replace(/<br\/>/gi, "\n");
    returnText = returnText.replace(/<\/div>/gi, "\n");
    returnText = returnText.replace(/<p.*>/gi, "\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");
    returnText = returnText.replace(/ +(?= )/g, '');
    returnText = returnText.replace(/&nbsp;/gi, " ");
    returnText = returnText.replace(/&amp;/gi, "&");
    returnText = returnText.replace(/&quot;/gi, '"');
    returnText = returnText.replace(/&lt;/gi, '<');
    returnText = returnText.replace(/&gt;/gi, '>');

    return returnText;
}