JS-TestFrame
============

A set of sugary assertions for helping with your unit tests.

TestFrame is designed to work with objects from multiple frameworks and test setups, including:
* jQuery
* Sinon JS

TestFrame is also intended to plug into a variety of testing frameworks. See jstestframe.js for details.

Example Assertions
------------------

jQuery
------

```
thenThe(jQuery("<div></div>")).should(beVisible);

thenThe(jQuery("<div class='hidden'></div>")).should(beHidden);
```

Sinon JS
--------

```
sinon.stub(jQuery, "ajax");

...

then(jQuery.ajax).shouldHaveBeen(calledOnce);
```


