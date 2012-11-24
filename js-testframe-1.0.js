/* JS Test Frame 1.0 */

function JSTestFrame(obj) {
    this.obj = obj;
    this.not = false;
}

JSTestFrame.prototype.shouldHaveBeen = JSTestFrame.prototype.should = function (fn) {
    this.not = false;
    fn.call(this, this.obj);
    return this;
};

JSTestFrame.prototype.shouldNotHaveBeen = JSTestFrame.prototype.shouldNot = function (fn) {
    this.not = true;
    fn.call(this, this.obj);
    return this;
};

JSTestFrame.prototype.ok = function (value, message) {
    if (this.not) {
        window.ok.call(window, !value, "NOT " + message);
    } else {
        window.ok.call(window, value, message);
    }
};

JSTestFrame.prototype.equal = function (actual, expected, message) {
    if (this.not) {
        window.notEqual.call(window, actual, expected, "NOT " + message);
    } else {
        window.equal.call(window, actual, expected, message);
    }
};

JSTestFrame.handlers = [];
JSTestFrame.addHandler = function (fn) {
    JSTestFrame.handlers.push(fn);
};

function thenThe(elem) {
    for (var i = 0; i < JSTestFrame.handlers.length; i++) {
        var obj = JSTestFrame.handlers[i](elem);
        if (obj) {
            return new JSTestFrame(obj);
        }
    }
    throw new Error("No suitable handler for " + elem);
}
var given = when = function (f) {
    return f;
};
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
function calledTimes(expectedCallCount) {
    return function (fn) {
        this.equal(fn.callCount, expectedCallCount,
                   "The function  should have been called the right number of times");
        fn.previousCallCount = fn.callCount;
    }
}

function calledAgain(fn) {
    var previousCallCount = fn.previousCallCount || 0;
    this.ok(fn.callCount > previousCallCount,
            "The function should have been called again (more than " + previousCallCount + " times)");
    fn.previousCallCount = fn.callCount;
}

var notCalled = calledTimes(0),
    calledOnce = calledTimes(1),
    calledTwice = calledTimes(2);

JSTestFrame.addHandler(function (obj) {
    if (typeof obj === "function" && obj.callCount !== undefined) {
        return obj;
    }
});