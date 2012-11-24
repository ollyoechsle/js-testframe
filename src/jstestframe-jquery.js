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

function haveText() {
    var texts = arguments;
    return function (elem) {
        for (var i = 0; i < texts.length; i++) {
            var expectedText = texts[i];
            this.equal(elem.eq(i).html(), expectedText,
                       "The element " + elem.selector + " should be have the right text");
        }

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
        this.equal(elem.length, expectedSize,
                   "Expected " + elem.selector + " to find " + expectedSize + " elements");
    }
}

function haveValue(expectedValue) {
    return function (elem) {
        this.equal(elem.val(), expectedValue,
                   "Expected " + elem.selector + " to have value `" + expectedValue + "`");
    }
}

function haveAttribute() {
    var expectedAttr = arguments[0],
        expectedValues = Array.prototype.slice.call(arguments, 1);
    return function (elem) {
        if (expectedValues.length) {
            for (var i = 0; i < expectedValues.length; i++) {
                this.equal(elem.eq(i).attr(expectedAttr), expectedValues[i],
                           "The element " + elem.eq(i).selector + " should have attribute `"
                               + expectedAttr
                               + "`=`" + expectedValues[i] + "`");
            }
        } else {
            var actualAttr = elem.attr(expectedAttr);
            this.ok(typeof actualAttr !== 'undefined' && actualAttr !== false,
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