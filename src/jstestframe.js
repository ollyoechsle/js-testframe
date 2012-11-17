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