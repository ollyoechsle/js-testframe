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