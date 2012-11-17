/* JS Test Frame 1.0 */

function JSTestFrame(obj) {
    this.obj = obj;
}

JSTestFrame.prototype.shouldHaveBeen = JSTestFrame.prototype.should = function (fn) {
    fn(this.obj);
    return this;
};

JSTestFrame.prototype.ok = function () {
    window.ok.apply(arguments);
};

JSTestFrame.prototype.equal = function () {
    window.equal.apply(arguments);
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
function calledTimes(expectedCallCount) {
    return function (fn) {
        equal(fn.callCount, expectedCallCount,
              "The function  should have been called the right number of times");
        fn.previousCallCount = fn.callCount;
    }
}

function calledAgain(fn) {
    return function (fn) {
        ok(fn.callCount > fn.previousCallCount, "The function should have been called again");
        fn.previousCallCount = fn.callCount;
    }
}

var notCalled = calledTimes(0),
    calledOnce = calledTimes(1),
    calledTwice = calledTimes(2);

JSTestFrame.addHandler(function (obj) {
    if (typeof obj === "function" && obj.callCount !== undefined) {
        return obj;
    }
});