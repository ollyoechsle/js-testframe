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
        this.equal(elem.html(), expectedText,
                   "The element " + elem.selector + " should be have the right text");
    }
}
function containText(expectedText) {
    return function (elem) {
        var text = elem.html();
        this.ok(text.indexOf(expectedText) > -1,
                "The element " + elem.selector + " should contain text `" + expectedText
                    + "` but was `" + text + "`");
    }
}

function beThere(elem) {
    this.ok(elem.length !== 0, "The element " + elem.selector + " should be there");
}

function linkTo(expectedUrl) {
    return function (elem) {
        var link = elem.attr("href") || elem.attr("src");
        this.equal(link, expectedUrl, "The link should be correct");
    }
}

function haveSize(expectedSize) {
    return function (elem) {
        this.equal(elem.length, expectedSize, "Expected " + elem.selector + " to find " + expectedSize + " elements");
    }
}

function haveAttribute(expectedAttr, expectedValue) {
    return function (elem) {
        if (expectedValue !== undefined) {
            this.equal(elem.attr(expectedAttr), expectedValue,
                       "The element " + elem.selector + " should have attribute `" + expectedAttr
                           + "`=`" + expectedValue + "`");
        } else {
            var attr = elem.attr(expectedAttr);
            this.ok(typeof attr !== 'undefined' && attr !== false,
                    "The element " + elem.selector + " should have attribute `" + expectedAttr
                        + "`");
        }
    }
}

JSTestFrame.addHandler(function (obj) {
    if (obj.jquery) {
        return jQuery(obj);
    }
});