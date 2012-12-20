JS-TestFrame
============

A set of sugary assertions that help you write all those tests you couldn't be bothered with before.

TestFrame provides simple, chainable should and shouldNot calls, into which you plug an appropriate
assertion for the object you want.

TestFrame is designed to provide assertions for multiple frameworks and test setups, including:
* jQuery
* Sinon JS

TestFrame is also intended to plug into a variety of testing frameworks. See jstestframe.js for details.

General Usage
-----------------

```
thenThe(jQuery obj | sinon stub)
    .should|shouldNot(assertion, [mapper])
    [.should..]
```

You can use .and to repeat the previous should or shouldNot, for example:

```
thenThe(fn)
    .shouldHaveBeen(calledAgain)
    .and(calledWith(5, 6, 7));
```


jQuery Assertions
-----------------

```
thenThe(jQuery("<div></div>")).should(beVisible);

thenThe(jQuery("<div class='hidden'></div>")).should(beHidden);
```

Full list of jQuery assertions:

* haveText(Value)
* haveText(Values...)

```
thenThe(jQuery("<div><p>Apples</p><p>Bananas</p><p>Cherries</p></div>").find("p"))
    .should(haveText("Apples", "Bananas", "Cherries"))
```

* containText(Value)
* haveAttribute(String)
* haveAttribute(String, Value)
* haveAttribute(String, Values...)

```
thenThe(jQuery('<tr><th data-id="1"></th><th data-id="2"></th><th data-id="3"></th></tr>').find("th"))
    .should(haveAttribute("data-id", "1", "2", "3"))
```

* haveClass(String)
* haveClass(String...)
* beThere
* linkTo(String)
* haveSize(Number)
* haveStyle(CssProperty)
* haveStyle(CssProperty, Value)
* haveStyle(CssProperty, Values...)
* haveValue(String)

Mappers
-------

Mappers are little preprocessors which map the subject of the assertion before it is checked.

They allow you to make more readable, shorter assertions.

Given, for example:

```
<tbody>
<tr>
    <td>Apple</td>
    <td><span class="icon" style="background-color: green"></span></td>
</tr>
<tr>
    <td>Banana</td>
    <td><span class="icon" style="background-color: yellow"></span></td>
</tr>
<tr>
    <td>Orange</td>
    <td><span class="icon" style="background-color: orange"></span></td>
</tr>
</tbody>
```

If you want to inspect both the first cell text and the colour of the icon, then could create two TestFrames:

```
thenThe(jQuery('tbody tr td:first-child'))
    .should(haveText("Apple", "Banana", "Orange"));

thenThe(jQuery('tbody tr .icon'))
    .should(haveStyle("background-color", "green", "yellow", "orange"))
```

With the inElement mapper you can reuse a single TestFrame:

```
thenThe(jQuery('tbody tr'))
    .should(haveText("Apple", "Banana", "Orange"), inElement("td:first-child"))
    .should(haveStyle("background-color", "green", "yellow", "orange"), inElement(".icon"));

```

Available mappers:
* inElement(CSSSelector) - equivalent to jQuery.find

Sinon JS
--------

TestFrame also provides assertions for mocks, stubs and spys made by SinonJS (see sinonjs.org)

```
sinon.stub(jQuery, "ajax");

...

then(jQuery.ajax).shouldHaveBeen(calledOnce);
```

Full list of Sinon assertions:

* notCalled
* calledOnce
* calledTwice
* calledTimes(Number)
* calledAgain()
* calledWith(Matchers...)

### Matchers

* eq()
  Matches the argument exactly
* mapWith(key, value)
  Matches a map with the given key and value

```
given(fn = sinon.stub());

when(fn(1, {foo: "bar"}));

thenThe(jQuery.ajax)
    .shouldHaveBeen(calledOnce)
    .and(calledWith(mapWith("url", "http://www.foo.com"")));
```

Custom Assertions
--------------

Making a new simple jQuery assertion is easy:

```
window.haveAttribute = JSTestFrame.jquery.createAssertable("attribute", function (jObj, key) {
    return jObj.attr(key)
});
```



