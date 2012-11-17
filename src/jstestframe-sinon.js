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