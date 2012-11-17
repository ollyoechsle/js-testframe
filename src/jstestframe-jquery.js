function haveClass(className) {
    return function (elem) {
        this.ok(elem.hasClass(className),
           "The element " + elem.selector + " should have class `" + className + "`");
    }
}

function notHaveClass(className) {
    return function (elem) {
        this.ok(!elem.hasClass(className),
           "The element " + elem.selector + " should NOT have class `" + className + "`");
    }
}

var beVisible = notHaveClass("hidden"),
    beHidden = haveClass("hidden");

function haveText(expectedText) {
    return function (elem) {
        equal(elem.html(), expectedText,
              "The element " + elem.selector + " should be have the right text");
    }
}

function notBeThere(elem) {
    ok(elem.length == 0, "The element " + elem.selector + " should not be there");
}

function linkTo(expectedUrl) {
    return function (elem) {
        var link = elem.attr("href") || elem.attr("src");
        equal(link, expectedUrl, "The link should be correct");
    }
}

function haveSize(expectedSize) {
    return function (elem) {
        equal(elem.length, expectedSize);
    }
}

JSTestFrame.addHandler(function(obj) {
    if (obj.jquery) {
        return jQuery(obj);
    }
});