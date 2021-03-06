/* JS Test Frame 1.0 */

function JSTestFrame(obj) {
    this.obj = obj;
    this.not = false;
    this.and = this.should;
}

JSTestFrame.prototype.shouldHaveBeen = JSTestFrame.prototype.should = function (fn, mapper) {
    mapper = mapper || JSTestFrame.DO_NOTHING;
    this.not = false;
    this.and = this.should;
    fn.call(this, mapper(this.obj));
    return this;
};

JSTestFrame.prototype.shouldNotHaveBeen = JSTestFrame.prototype.shouldNot = function (fn, mapper) {
    mapper = mapper || JSTestFrame.DO_NOTHING;
    this.not = true;
    this.and = this.shouldNot;
    fn.call(this, mapper(this.obj));
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

JSTestFrame.DO_NOTHING = function(val) {
    return val;
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
function haveClass() {
    var classes = arguments;
    return function (elem) {
        for (var i = 0; i < classes.length; i++) {
            var expectedClassName = classes[i];
            this.ok(elem.eq(i).hasClass(expectedClassName),
                       "The element " + elem.selector + " should be have the class `" + expectedClassName + "` but had `" + elem.eq(i)[0].className + "`");
        }

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

function inElement(selector) {
    return function (jObj) {
        return jObj.find(selector);
    }
}

JSTestFrame.jquery = {
    createAssertable:function (name, fn) {
        return function () {
            var expectedAttr = arguments[0],
                expectedValues = Array.prototype.slice.call(arguments, 1);
            return function (elem) {
                var actual;
                if (expectedValues.length) {
                    for (var i = 0; i < expectedValues.length; i++) {
                        actual = fn(elem.eq(i), expectedAttr);
                        this.equal(actual, expectedValues[i],
                                   "The element " + elem.eq(i).selector + " should have "
                                       + name + " `"
                                       + expectedAttr
                                       + "`:`" + expectedValues[i] + "`");
                    }
                } else {
                    actual = fn(elem, expectedAttr);
                    this.ok(typeof actual !== 'undefined' && actual !== false,
                            "The element " + elem.selector + " should have " + name + " `"
                                + expectedAttr
                                + "`");
                }
            }
        }
    }
};

window.haveStyle = JSTestFrame.jquery.createAssertable("style", function (jObj, key) {
    return jObj.css(key)
});

window.haveAttribute = JSTestFrame.jquery.createAssertable("attribute", function (jObj, key) {
    return jObj.attr(key)
});

JSTestFrame.addHandler(function (obj) {
    if (obj.jquery) {
        return jQuery(obj);
    }
});

function theUserClicksOn(elem) {
    jQuery(elem).trigger("click");
}

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

function calledWith() {

    var expectedArguments = [];
    for (var i = 0; i < arguments.length; i++) {
       if (arguments[i] && arguments[i].isMatcher) {
          expectedArguments.push(arguments[i]);
       } else {
          expectedArguments.push(eq(arguments[i]))
       }
    }

    return function (fn) {
        this.ok(fn.called, "The fn should have been called");
        for (var i = 0; i < expectedArguments.length; i++) {
            var actual = fn.getCall(fn.callCount - 1).args[i];
            expectedArguments[i].call(this, actual, "The last call's argument at [" + i + "] should be correct");
        }
        fn.previousCallCount = fn.callCount;
    }
}

var eq = function(expected) {
    return matcher(function(actual, message) {
        this.equal(actual, expected, message);
    });
};

var mapWith = function(expectedKey, expectedValue) {
    return matcher(function(obj, message) {
        var actual = obj[expectedKey];
        this.equal(actual, expectedValue, message);
    });
};

var matcher = function(fn) {
    fn.isMatcher = true;
    return fn;
};

JSTestFrame.addHandler(function (obj) {
    if (typeof obj === "function" && obj.callCount !== undefined) {
        return obj;
    }
});