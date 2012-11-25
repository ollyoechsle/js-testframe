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