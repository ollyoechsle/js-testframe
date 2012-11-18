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