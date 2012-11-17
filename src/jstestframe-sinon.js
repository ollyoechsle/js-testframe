function calledTimes(expectedCallCount) {
    return function (fn) {
        equal(fn.callCount, expectedCallCount,
              "The element " + fn.callCount + " should have been called the right number of times");
    }
}

var notCalled = calledTimes(0),
    calledOnce = calledTimes(1);
    calledTwice = calledTimes(2);

JSTestFrame.addHandler(function(obj) {
    if (typeof obj === "function" && obj.callCount !== undefined) {
        return obj;
    }
});