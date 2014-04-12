(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function() {
  require("Main").main();
});

},{"Main":14}],2:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var $less$times = function (__dict_Functor_0) {
    return function (__dict_Applicative_1) {
        return function (x) {
            return function (y) {
                return Prelude["<*>"](__dict_Applicative_1["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"](__dict_Functor_0)(Prelude["const"])(x))(y);
            };
        };
    };
};
var $times$greater = function (__dict_Functor_2) {
    return function (__dict_Applicative_3) {
        return function (x) {
            return function (y) {
                return Prelude["<*>"](__dict_Applicative_3["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"](__dict_Functor_2)(Prelude["const"](Prelude.id(Prelude.categoryArr({}))))(x))(y);
            };
        };
    };
};
var lift3 = function (__dict_Functor_4) {
    return function (__dict_Applicative_5) {
        return function (f) {
            return function (x) {
                return function (y) {
                    return function (z) {
                        return Prelude["<*>"](__dict_Applicative_5["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<*>"](__dict_Applicative_5["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"](__dict_Functor_4)(f)(x))(y))(z);
                    };
                };
            };
        };
    };
};
var lift2 = function (__dict_Functor_6) {
    return function (__dict_Applicative_7) {
        return function (f) {
            return function (x) {
                return function (y) {
                    return Prelude["<*>"](__dict_Applicative_7["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"](__dict_Functor_6)(f)(x))(y);
                };
            };
        };
    };
};
module.exports = {
    lift3: lift3, 
    lift2: lift2, 
    "*>": $times$greater, 
    "<*": $less$times
};
},{"Prelude":16}],3:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
function returnE(a) {  return function() {    return a;  };};
function bindE(a) {  return function(f) {    return function() {      return f(a())();    };  };};
function runPure(f) {  return f();};
function untilE(f) {  return function() {    while (!f()) { }    return {};  };};
function whileE(f) {  return function(a) {    return function() {      while (f()) {        a();      }      return {};    };  };};
function forE(lo) {  return function(hi) {    return function(f) {      return function() {        for (var i = lo; i < hi; i++) {          f(i)();        }      };    };  };};
function foreachE(as) {  return function(f) {    for (var i = 0; i < as.length; i++) {      f(as[i])();    }  };};
var applicativeEff = function (_) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyEff({});
            }
        }, 
        pure: returnE
    };
};
var applyEff = function (_) {
    return {
        "__superclasses": {
            "Prelude.Functor_0": function (_) {
                return functorEff({});
            }
        }, 
        "<*>": Prelude.ap(monadEff({}))
    };
};
var functorEff = function (_) {
    return {
        "__superclasses": {}, 
        "<$>": Prelude.liftA1(applicativeEff({}))
    };
};
var monadEff = function (_) {
    return {
        "__superclasses": {
            "Prelude.Applicative_0": function (_) {
                return applicativeEff({});
            }, 
            "Prelude.Bind_1": function (_) {
                return bindEff({});
            }
        }
    };
};
var bindEff = function (_) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyEff({});
            }
        }, 
        ">>=": bindE
    };
};
module.exports = {
    foreachE: foreachE, 
    forE: forE, 
    whileE: whileE, 
    untilE: untilE, 
    runPure: runPure, 
    bindE: bindE, 
    returnE: returnE, 
    functorEff: functorEff, 
    applyEff: applyEff, 
    applicativeEff: applicativeEff, 
    bindEff: bindEff, 
    monadEff: monadEff
};
},{"Prelude":16}],4:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Pure = function (value0) {
    return {
        ctor: "Control.Monad.Free.Pure", 
        values: [ value0 ]
    };
};
var Free = function (value0) {
    return {
        ctor: "Control.Monad.Free.Free", 
        values: [ value0 ]
    };
};
function wrap(dict) {
    return dict["wrap"];
};
var monadTransFree = function (_) {
    return {
        "__superclasses": {}, 
        lift: function (__dict_Monad_0) {
            return function (f) {
                return Free(Prelude[">>="](__dict_Monad_0["__superclasses"]["Prelude.Bind_1"]({}))(f)(function (_1) {
                    return Prelude["return"](__dict_Monad_0)(Pure(_1));
                }));
            };
        }
    };
};
var monadFreeFree = function (__dict_Functor_1) {
    return {
        "__superclasses": {}, 
        wrap: Free
    };
};
var liftF = function (__dict_Functor_3) {
    return function (__dict_Monad_4) {
        return function (__dict_MonadFree_5) {
            return function (fa) {
                return wrap(__dict_MonadFree_5)(Prelude["<$>"](__dict_Functor_3)(Prelude["return"](__dict_Monad_4))(fa));
            };
        };
    };
};
var iterM = function (__dict_Functor_6) {
    return function (__dict_Monad_7) {
        return function (_1) {
            return function (_2) {
                if (_2.ctor === "Control.Monad.Free.Pure") {
                    return Prelude["return"](__dict_Monad_7)(_2.values[0]);
                };
                if (_2.ctor === "Control.Monad.Free.Free") {
                    return _1(Prelude["<$>"](__dict_Functor_6)(iterM(__dict_Functor_6)(__dict_Monad_7)(_1))(_2.values[0]));
                };
                throw "Failed pattern match";
            };
        };
    };
};
var functorFree = function (__dict_Functor_8) {
    return {
        "__superclasses": {}, 
        "<$>": function (f) {
            var go = function (_1) {
                if (_1.ctor === "Control.Monad.Free.Pure") {
                    return Pure(f(_1.values[0]));
                };
                if (_1.ctor === "Control.Monad.Free.Free") {
                    return Free(Prelude["<$>"](__dict_Functor_8)(go)(_1.values[0]));
                };
                throw "Failed pattern match";
            };
            return go;
        }
    };
};
var applicativeFree = function (__dict_Functor_11) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyFree(__dict_Functor_11);
            }
        }, 
        pure: Pure
    };
};
var applyFree = function (__dict_Functor_10) {
    return {
        "__superclasses": {
            "Prelude.Functor_0": function (_) {
                return functorFree(__dict_Functor_10);
            }
        }, 
        "<*>": Prelude.ap(monadFree(__dict_Functor_10))
    };
};
var monadFree = function (__dict_Functor_2) {
    return {
        "__superclasses": {
            "Prelude.Applicative_0": function (_) {
                return applicativeFree(__dict_Functor_2);
            }, 
            "Prelude.Bind_1": function (_) {
                return bindFree(__dict_Functor_2);
            }
        }
    };
};
var bindFree = function (__dict_Functor_9) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyFree(__dict_Functor_9);
            }
        }, 
        ">>=": function (_1) {
            return function (_2) {
                if (_1.ctor === "Control.Monad.Free.Pure") {
                    return _2(_1.values[0]);
                };
                if (_1.ctor === "Control.Monad.Free.Free") {
                    return Free(Prelude["<$>"](__dict_Functor_9)(function (a) {
                        return Prelude[">>="](bindFree(__dict_Functor_9))(a)(_2);
                    })(_1.values[0]));
                };
                throw "Failed pattern match";
            };
        }
    };
};
module.exports = {
    Pure: Pure, 
    Free: Free, 
    iterM: iterM, 
    liftF: liftF, 
    wrap: wrap, 
    functorFree: functorFree, 
    applyFree: applyFree, 
    applicativeFree: applicativeFree, 
    bindFree: bindFree, 
    monadFree: monadFree, 
    monadTransFree: monadTransFree, 
    monadFreeFree: monadFreeFree
};
},{"Prelude":16}],5:[function(require,module,exports){
"use strict";
function select(selector) {   return function () {     return jQuery(selector);   }; };
function create(html) {   return function () {     return jQuery(html);   }; };
function setAttr(attr) {   return function(val) {     return function(ob) {       return function () {         return ob.attr(attr, val);      };     };   }; };
function attr(attrs) {   return function(ob) {     return function () {       return ob.attr(attrs);    };   }; };
function css(props) {   return function(ob) {     return function () {       return ob.css(props);     };   }; };
function setProp(p) {   return function(val) {     return function(ob) {       return function () {         return ob.prop(p, val);      };     };   }; };
function getProp(p) {   return function(ob) {     return function () {       return ob.prop(p);    };   }; };
function append(ob1) {   return function(ob) {     return function () {       return ob.append(ob1);     };   }; };
function appendAtIndex(i) {   return function(ob1) {     return function(ob) {       return function () {         var children = ob.children();        if (children.length > 0) {          if (i <= 0) {             ob.prepend(ob1);          } else if (i >= children.length) {             ob.append(ob1);          } else {             ob1.insertBefore(jQuery(children[i]));          }          return ob;        } else {          return ob.append(ob1);         }      };     };   }; };
function remove(ob) {   return function () {     return ob.remove();   }; };
function before(ob) {   return function(ob1) {     return function () {       return ob1.before(ob);     };   }; };
function appendText(s) {   return function(ob) {     return function () {       return ob.append(s);     };   }; };
function body() {   return jQuery(document.body); };
function getText(ob) {   return function() {     return ob.text();   }; };
function setText(text) {   return function(ob) {     return function() {       ob.text(text);     };  };};
function getValue(ob) {   return function() {     return ob.val();   }; };
function setValue(val) {   return function(ob) {     return function() {       return ob.val(val);     };   }; };
function on(evt) {   return function(act) {     return function(ob) {       return function() {         return ob.on(evt, function() {           act(jQuery(this))();         });       };     };   }; };
module.exports = {
    on: on, 
    setValue: setValue, 
    getValue: getValue, 
    setText: setText, 
    getText: getText, 
    body: body, 
    appendText: appendText, 
    before: before, 
    remove: remove, 
    appendAtIndex: appendAtIndex, 
    append: append, 
    getProp: getProp, 
    setProp: setProp, 
    css: css, 
    attr: attr, 
    setAttr: setAttr, 
    create: create, 
    select: select
};
},{}],6:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Data_Maybe = require("Data.Maybe");
var Prelude_Unsafe = require("Prelude.Unsafe");
function map (f) {  return function (arr) {    var l = arr.length;    var result = new Array(l);    for (var i = 0; i < l; i++) {      result[i] = f(arr[i]);    }    return result;  };};
function length (xs) {  return xs.length;};
function indexOf (l) {  return function (e) {    return l.indexOf(e);  };};
function elem(l) {  return function (e) {    return l.indexOf(e) !== -1;  };};
function lastIndexOf (l) {  return function (e) {    return l.lastIndexOf(e);  };};
function concat (l1) {  return function (l2) {    return l1.concat(l2);  };};
function joinWith (l) {  return function (s) {    return l.join(s);  };};
function reverse (l) {  return l.slice().reverse();};
function drop (n) {  return function (l) {    return l.slice(n);  };};
function take (n) {  return function (l) {    return l.slice(0, n);  };};
function slice (s) {  return function (e) {    return function (l) {      return l.slice(s, e);    };  };};
function insertAt (index) {  return function (a) {    return function (l) {      var l1 = l.slice();      l1.splice(index, 0, a);      return l1;    };   };};
function deleteAt (index) {  return function (n) {    return function (l) {      var l1 = l.slice();      l1.splice(index, n);      return l1;    };   };};
function updateAt (index) {  return function (a) {    return function (l) {      var l1 = l.slice();      l1[index] = a;      return l1;    };   };};
function concatMap (f) {  return function (arr) {    var result = [];    for (var i = 0, l = arr.length; i < l; i++) {      Array.prototype.push.apply(result, f(arr[i]));    }    return result;  };};
function filter (f) {  return function (arr) {    var n = 0;    var result = [];    for (var i = 0, l = arr.length; i < l; i++) {      if (f(arr[i])) {        result[n++] = arr[i];      }    }    return result;  };};
function zipWith (f) {  return function (xs) {    return function (ys) {      var l = xs.length < ys.length ? xs.length : ys.length;      var result = new Array(l);      for (var i = 0; i < l; i++) {        result[i] = f(xs[i])(ys[i]);      }      return result;    };  };};
function sortJS (f) {  return function (l) {    return l.slice().sort(function (x, y) {      return f(x)(y);    });  };};
var $bang$bang = function (xs) {
    return function (n) {
        var isInt = function (n) {
            return n !== ~~n;
        };
        return (n < 0 || n >= length(xs) || isInt(n)) ? Data_Maybe.Nothing : Data_Maybe.Just(xs[n]);
    };
};
var tail = function (_1) {
    if (_1.length > 0) {
        var _4 = _1.slice(1);
        return Data_Maybe.Just(_4);
    };
    return Data_Maybe.Nothing;
};
var sort = function (__dict_Ord_0) {
    return function (xs) {
        var comp = function (x) {
            return function (y) {
                return (function (_1) {
                    if (_1.ctor === "Prelude.GT") {
                        return 1;
                    };
                    if (_1.ctor === "Prelude.EQ") {
                        return 0;
                    };
                    if (_1.ctor === "Prelude.LT") {
                        return -1;
                    };
                    throw "Failed pattern match";
                })(Prelude.compare(__dict_Ord_0)(x)(y));
            };
        };
        return sortJS(comp)(xs);
    };
};
var singleton = function (a) {
    return [ a ];
};
var semigroupArray = function (_) {
    return {
        "__superclasses": {}, 
        "<>": concat
    };
};
var range = function (_1) {
    return function (_2) {
        if (_1 > _2) {
            return [  ];
        };
        return Prelude[":"](_1)(range(_1 + 1)(_2));
    };
};
var nubBy = function (_1) {
    return function (_2) {
        if (_2.length === 0) {
            return [  ];
        };
        if (_2.length > 0) {
            var _6 = _2.slice(1);
            return Prelude[":"](_2[0])(nubBy(_1)(filter(function (y) {
                return !_1(_2[0])(y);
            })(_6)));
        };
        throw "Failed pattern match";
    };
};
var nub = function (__dict_Eq_1) {
    return nubBy(Prelude["=="](__dict_Eq_1));
};
var monoidArray = function (_) {
    return {
        "__superclasses": {
            "Prelude.Semigroup_0": function (_) {
                return semigroupArray({});
            }
        }, 
        mempty: [  ]
    };
};
var isEmpty = function (_1) {
    if (_1.length === 0) {
        return true;
    };
    return false;
};
var head = function (_1) {
    if (_1.length > 0) {
        return Data_Maybe.Just(_1[0]);
    };
    return Data_Maybe.Nothing;
};
var functorArray = function (_) {
    return {
        "__superclasses": {}, 
        "<$>": map
    };
};
var applicativeArray = function (_) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyArray({});
            }
        }, 
        pure: singleton
    };
};
var applyArray = function (_) {
    return {
        "__superclasses": {
            "Prelude.Functor_0": function (_) {
                return functorArray({});
            }
        }, 
        "<*>": Prelude.ap(monadArray({}))
    };
};
var monadArray = function (_) {
    return {
        "__superclasses": {
            "Prelude.Applicative_0": function (_) {
                return applicativeArray({});
            }, 
            "Prelude.Bind_1": function (_) {
                return bindArray({});
            }
        }
    };
};
var bindArray = function (_) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyArray({});
            }
        }, 
        ">>=": Prelude.flip(concatMap)
    };
};
var alternativeArray = function (_) {
    return {
        "__superclasses": {}, 
        empty: [  ], 
        "<|>": concat
    };
};
module.exports = {
    sort: sort, 
    nubBy: nubBy, 
    nub: nub, 
    zipWith: zipWith, 
    range: range, 
    isEmpty: isEmpty, 
    filter: filter, 
    concatMap: concatMap, 
    updateAt: updateAt, 
    deleteAt: deleteAt, 
    insertAt: insertAt, 
    slice: slice, 
    take: take, 
    drop: drop, 
    reverse: reverse, 
    joinWith: joinWith, 
    concat: concat, 
    lastIndexOf: lastIndexOf, 
    indexOf: indexOf, 
    length: length, 
    map: map, 
    tail: tail, 
    head: head, 
    singleton: singleton, 
    "!!": $bang$bang, 
    functorArray: functorArray, 
    applyArray: applyArray, 
    applicativeArray: applicativeArray, 
    bindArray: bindArray, 
    monadArray: monadArray, 
    semigroupArray: semigroupArray, 
    monoidArray: monoidArray, 
    alternativeArray: alternativeArray
};
},{"Data.Maybe":12,"Prelude":16,"Prelude.Unsafe":15}],7:[function(require,module,exports){
"use strict";
var Data_DOM = require("Data.DOM");
var style = Data_DOM.Attribute("style");
module.exports = {
    style: style
};
},{"Data.DOM":10}],8:[function(require,module,exports){
"use strict";
var Data_DOM = require("Data.DOM");
var ul = Data_DOM.element("ul");
var p = Data_DOM.element("p");
var li = Data_DOM.element("li");
var div = Data_DOM.element("div");
var button = Data_DOM.element("button");
module.exports = {
    button: button, 
    p: p, 
    li: li, 
    ul: ul, 
    div: div
};
},{"Data.DOM":10}],9:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Control_Monad_Eff = require("Control.Monad.Eff");
var Control_Monad_JQuery = require("Control.Monad.JQuery");
var Data_Foldable = require("Data.Foldable");
var Control_Monad_Free = require("Control.Monad.Free");
var Data_DOM = require("Data.DOM");
var renderJQuery = function (root) {
    var go = function (_2) {
        return (function (_3) {
            if (_3.ctor === "Data.DOM.Element") {
                return function __do() {
                    var _1 = Control_Monad_JQuery.create("<" + _3.values[0] + ">")();
                    return (function (_2) {
                        return function __do() {
                            Data_Foldable["for_"](Control_Monad_Eff.functorEff({}))(Control_Monad_Eff.applicativeEff({}))(Data_Foldable.foldableArray({}))(_3.values[1])(function (_1) {
                                return Control_Monad_JQuery.setAttr(_1.values[0])(_1.values[1])(_2);
                            })();
                            renderJQuery(_2)(_3.values[2])();
                            Control_Monad_JQuery.append(_2)(root)();
                            return _3.values[3]();
                        };
                    })(_1)();
                };
            };
            if (_3.ctor === "Data.DOM.Text") {
                return function __do() {
                    Control_Monad_JQuery.appendText(_3.values[0])(root)();
                    return _3.values[1]();
                };
            };
            throw "Failed pattern match";
        })(_2);
    };
    return Control_Monad_Free.iterM(Data_DOM.functorHtmlF({}))(Control_Monad_Eff.monadEff({}))(go);
};
module.exports = {
    renderJQuery: renderJQuery
};
},{"Control.Monad.Eff":3,"Control.Monad.Free":4,"Control.Monad.JQuery":5,"Data.DOM":10,"Data.Foldable":11,"Prelude":16}],10:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Control_Monad_Free = require("Control.Monad.Free");
var Attribute = function (value0) {
    return function (value1) {
        return {
            ctor: "Data.DOM.Attribute", 
            values: [ value0, value1 ]
        };
    };
};
var Element = function (value0) {
    return function (value1) {
        return function (value2) {
            return function (value3) {
                return {
                    ctor: "Data.DOM.Element", 
                    values: [ value0, value1, value2, value3 ]
                };
            };
        };
    };
};
var Text = function (value0) {
    return function (value1) {
        return {
            ctor: "Data.DOM.Text", 
            values: [ value0, value1 ]
        };
    };
};
var functorHtmlF = function (_) {
    return {
        "__superclasses": {}, 
        "<$>": function (_1) {
            return function (_2) {
                if (_2.ctor === "Data.DOM.Element") {
                    return Element(_2.values[0])(_2.values[1])(_2.values[2])(_1(_2.values[3]));
                };
                if (_2.ctor === "Data.DOM.Text") {
                    return Text(_2.values[0])(_1(_2.values[1]));
                };
                throw "Failed pattern match";
            };
        }
    };
};
var text = function (s) {
    return Control_Monad_Free.liftF(functorHtmlF({}))(Control_Monad_Free.monadFree(functorHtmlF({})))(Control_Monad_Free.monadFreeFree(functorHtmlF({})))(Text(s)({}));
};
var element = function (elem) {
    return function (attrs) {
        return function (children) {
            return Control_Monad_Free.Free(Element(elem)(attrs)(children)(Control_Monad_Free.Pure({})));
        };
    };
};
module.exports = {
    Element: Element, 
    Text: Text, 
    Attribute: Attribute, 
    text: text, 
    element: element, 
    functorHtmlF: functorHtmlF
};
},{"Control.Monad.Free":4,"Prelude":16}],11:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Control_Applicative = require("Control.Applicative");
var Data_Monoid = require("Data.Monoid");
var Data_Array = require("Data.Array");
var Data_Maybe = require("Data.Maybe");
function foldr(dict) {
    return dict["foldr"];
};
function foldl(dict) {
    return dict["foldl"];
};
function foldMap(dict) {
    return dict["foldMap"];
};
var traverse_ = function (__dict_Functor_0) {
    return function (__dict_Applicative_1) {
        return function (__dict_Foldable_2) {
            return function (f) {
                return foldr(__dict_Foldable_2)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Applicative["*>"](__dict_Functor_0)(__dict_Applicative_1))(f))(Prelude.pure(__dict_Applicative_1)({}));
            };
        };
    };
};
var sum = function (__dict_Foldable_3) {
    return foldl(__dict_Foldable_3)(Prelude["+"](Prelude.numNumber({})))(0);
};
var sequence_ = function (__dict_Functor_4) {
    return function (__dict_Applicative_5) {
        return function (__dict_Foldable_6) {
            return traverse_(__dict_Functor_4)(__dict_Applicative_5)(__dict_Foldable_6)(Prelude.id(Prelude.categoryArr({})));
        };
    };
};
var product = function (__dict_Foldable_7) {
    return foldl(__dict_Foldable_7)(Prelude["*"](Prelude.numNumber({})))(1);
};
var or = function (__dict_Foldable_8) {
    return foldl(__dict_Foldable_8)(Prelude["||"](Prelude.boolLikeBoolean({})))(false);
};
var mconcat = function (__dict_Foldable_9) {
    return function (__dict_Monoid_10) {
        return foldl(__dict_Foldable_9)(Prelude["<>"](__dict_Monoid_10["__superclasses"]["Prelude.Semigroup_0"]({})))(Data_Monoid.mempty(__dict_Monoid_10));
    };
};
var for_ = function (__dict_Functor_11) {
    return function (__dict_Applicative_12) {
        return function (__dict_Foldable_13) {
            return Prelude.flip(traverse_(__dict_Functor_11)(__dict_Applicative_12)(__dict_Foldable_13));
        };
    };
};
var foldableTuple = function (_) {
    return {
        "__superclasses": {}, 
        foldr: function (_1) {
            return function (_2) {
                return function (_3) {
                    return _1(_3.values[1])(_2);
                };
            };
        }, 
        foldl: function (_1) {
            return function (_2) {
                return function (_3) {
                    return _1(_2)(_3.values[1]);
                };
            };
        }, 
        foldMap: function (__dict_Monoid_14) {
            return function (_1) {
                return function (_2) {
                    return _1(_2.values[1]);
                };
            };
        }
    };
};
var foldableRef = function (_) {
    return {
        "__superclasses": {}, 
        foldr: function (_1) {
            return function (_2) {
                return function (_3) {
                    return _1(_3.values[0])(_2);
                };
            };
        }, 
        foldl: function (_1) {
            return function (_2) {
                return function (_3) {
                    return _1(_2)(_3.values[0]);
                };
            };
        }, 
        foldMap: function (__dict_Monoid_15) {
            return function (_1) {
                return function (_2) {
                    return _1(_2.values[0]);
                };
            };
        }
    };
};
var foldableMaybe = function (_) {
    return {
        "__superclasses": {}, 
        foldr: function (_1) {
            return function (_2) {
                return function (_3) {
                    if (_3.ctor === "Data.Maybe.Nothing") {
                        return _2;
                    };
                    if (_3.ctor === "Data.Maybe.Just") {
                        return _1(_3.values[0])(_2);
                    };
                    throw "Failed pattern match";
                };
            };
        }, 
        foldl: function (_1) {
            return function (_2) {
                return function (_3) {
                    if (_3.ctor === "Data.Maybe.Nothing") {
                        return _2;
                    };
                    if (_3.ctor === "Data.Maybe.Just") {
                        return _1(_2)(_3.values[0]);
                    };
                    throw "Failed pattern match";
                };
            };
        }, 
        foldMap: function (__dict_Monoid_16) {
            return function (_1) {
                return function (_2) {
                    if (_2.ctor === "Data.Maybe.Nothing") {
                        return Data_Monoid.mempty(__dict_Monoid_16);
                    };
                    if (_2.ctor === "Data.Maybe.Just") {
                        return _1(_2.values[0]);
                    };
                    throw "Failed pattern match";
                };
            };
        }
    };
};
var foldableEither = function (_) {
    return {
        "__superclasses": {}, 
        foldr: function (_1) {
            return function (_2) {
                return function (_3) {
                    if (_3.ctor === "Data.Either.Left") {
                        return _2;
                    };
                    if (_3.ctor === "Data.Either.Right") {
                        return _1(_3.values[0])(_2);
                    };
                    throw "Failed pattern match";
                };
            };
        }, 
        foldl: function (_1) {
            return function (_2) {
                return function (_3) {
                    if (_3.ctor === "Data.Either.Left") {
                        return _2;
                    };
                    if (_3.ctor === "Data.Either.Right") {
                        return _1(_2)(_3.values[0]);
                    };
                    throw "Failed pattern match";
                };
            };
        }, 
        foldMap: function (__dict_Monoid_17) {
            return function (_1) {
                return function (_2) {
                    if (_2.ctor === "Data.Either.Left") {
                        return Data_Monoid.mempty(__dict_Monoid_17);
                    };
                    if (_2.ctor === "Data.Either.Right") {
                        return _1(_2.values[0]);
                    };
                    throw "Failed pattern match";
                };
            };
        }
    };
};
var foldableArray = function (_) {
    return {
        "__superclasses": {}, 
        foldr: function (_1) {
            return function (_2) {
                return function (_3) {
                    if (_3.length === 0) {
                        return _2;
                    };
                    if (_3.length > 0) {
                        var _8 = _3.slice(1);
                        return _1(_3[0])(foldr(foldableArray({}))(_1)(_2)(_8));
                    };
                    throw "Failed pattern match";
                };
            };
        }, 
        foldl: function (_1) {
            return function (_2) {
                return function (_3) {
                    if (_3.length === 0) {
                        return _2;
                    };
                    if (_3.length > 0) {
                        var _8 = _3.slice(1);
                        return foldl(foldableArray({}))(_1)(_1(_2)(_3[0]))(_8);
                    };
                    throw "Failed pattern match";
                };
            };
        }, 
        foldMap: function (__dict_Monoid_18) {
            return function (_1) {
                return function (_2) {
                    if (_2.length === 0) {
                        return Data_Monoid.mempty(__dict_Monoid_18);
                    };
                    if (_2.length > 0) {
                        var _6 = _2.slice(1);
                        return Prelude["<>"](__dict_Monoid_18["__superclasses"]["Prelude.Semigroup_0"]({}))(_1(_2[0]))(foldMap(foldableArray({}))(__dict_Monoid_18)(_1)(_6));
                    };
                    throw "Failed pattern match";
                };
            };
        }
    };
};
var fold = function (__dict_Foldable_19) {
    return function (__dict_Monoid_20) {
        return foldMap(__dict_Foldable_19)(__dict_Monoid_20)(Prelude.id(Prelude.categoryArr({})));
    };
};
var find = function (__dict_Foldable_21) {
    return function (p) {
        return function (f) {
            return (function (_1) {
                if (_1.length > 0) {
                    return Data_Maybe.Just(_1[0]);
                };
                if (_1.length === 0) {
                    return Data_Maybe.Nothing;
                };
                throw "Failed pattern match";
            })(foldMap(__dict_Foldable_21)(Data_Array.monoidArray({}))(function (x) {
                return p(x) ? [ x ] : [  ];
            })(f));
        };
    };
};
var any = function (__dict_Foldable_22) {
    return function (p) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(or(foldableArray({})))(foldMap(__dict_Foldable_22)(Data_Array.monoidArray({}))(function (x) {
            return [ p(x) ];
        }));
    };
};
var elem = function (__dict_Eq_23) {
    return function (__dict_Foldable_24) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(any(__dict_Foldable_24))(Prelude["=="](__dict_Eq_23));
    };
};
var notElem = function (__dict_Eq_25) {
    return function (__dict_Foldable_26) {
        return function (x) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.not(Prelude.boolLikeBoolean({})))(elem(__dict_Eq_25)(__dict_Foldable_26)(x));
        };
    };
};
var and = function (__dict_Foldable_27) {
    return foldl(__dict_Foldable_27)(Prelude["&&"](Prelude.boolLikeBoolean({})))(true);
};
var all = function (__dict_Foldable_28) {
    return function (p) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(and(foldableArray({})))(foldMap(__dict_Foldable_28)(Data_Array.monoidArray({}))(function (x) {
            return [ p(x) ];
        }));
    };
};
module.exports = {
    find: find, 
    notElem: notElem, 
    elem: elem, 
    product: product, 
    sum: sum, 
    all: all, 
    any: any, 
    or: or, 
    and: and, 
    mconcat: mconcat, 
    "sequence_": sequence_, 
    "for_": for_, 
    "traverse_": traverse_, 
    fold: fold, 
    foldMap: foldMap, 
    foldl: foldl, 
    foldr: foldr, 
    foldableArray: foldableArray, 
    foldableEither: foldableEither, 
    foldableMaybe: foldableMaybe, 
    foldableRef: foldableRef, 
    foldableTuple: foldableTuple
};
},{"Control.Applicative":2,"Data.Array":6,"Data.Maybe":12,"Data.Monoid":13,"Prelude":16}],12:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Nothing = {
    ctor: "Data.Maybe.Nothing", 
    values: [  ]
};
var Just = function (value0) {
    return {
        ctor: "Data.Maybe.Just", 
        values: [ value0 ]
    };
};
var showMaybe = function (__dict_Show_0) {
    return {
        "__superclasses": {}, 
        show: function (_1) {
            if (_1.ctor === "Data.Maybe.Just") {
                return "Just " + Prelude.show(__dict_Show_0)(_1.values[0]);
            };
            if (_1.ctor === "Data.Maybe.Nothing") {
                return "Nothing";
            };
            throw "Failed pattern match";
        }
    };
};
var maybe = function (_1) {
    return function (_2) {
        return function (_3) {
            if (_3.ctor === "Data.Maybe.Nothing") {
                return _1;
            };
            if (_3.ctor === "Data.Maybe.Just") {
                return _2(_3.values[0]);
            };
            throw "Failed pattern match";
        };
    };
};
var isNothing = maybe(true)(Prelude["const"](false));
var isJust = maybe(false)(Prelude["const"](true));
var functorMaybe = function (_) {
    return {
        "__superclasses": {}, 
        "<$>": function (_1) {
            return function (_2) {
                if (_2.ctor === "Data.Maybe.Just") {
                    return Just(_1(_2.values[0]));
                };
                return Nothing;
            };
        }
    };
};
var fromMaybe = function (a) {
    return maybe(a)(Prelude.id(Prelude.categoryArr({})));
};
var eqMaybe = function (__dict_Eq_2) {
    return {
        "__superclasses": {}, 
        "==": function (_1) {
            return function (_2) {
                if (_1.ctor === "Data.Maybe.Nothing") {
                    if (_2.ctor === "Data.Maybe.Nothing") {
                        return true;
                    };
                };
                if (_1.ctor === "Data.Maybe.Just") {
                    if (_2.ctor === "Data.Maybe.Just") {
                        return Prelude["=="](__dict_Eq_2)(_1.values[0])(_2.values[0]);
                    };
                };
                return false;
            };
        }, 
        "/=": function (a) {
            return function (b) {
                return !Prelude["=="](eqMaybe(__dict_Eq_2))(a)(b);
            };
        }
    };
};
var ordMaybe = function (__dict_Ord_1) {
    return {
        "__superclasses": {
            "Prelude.Eq_0": function (_) {
                return eqMaybe(__dict_Ord_1["__superclasses"]["Prelude.Eq_0"]({}));
            }
        }, 
        compare: function (_1) {
            return function (_2) {
                if (_1.ctor === "Data.Maybe.Just") {
                    if (_2.ctor === "Data.Maybe.Just") {
                        return Prelude.compare(__dict_Ord_1)(_1.values[0])(_2.values[0]);
                    };
                };
                if (_1.ctor === "Data.Maybe.Nothing") {
                    if (_2.ctor === "Data.Maybe.Nothing") {
                        return Prelude.EQ;
                    };
                };
                if (_1.ctor === "Data.Maybe.Nothing") {
                    return Prelude.LT;
                };
                if (_2.ctor === "Data.Maybe.Nothing") {
                    return Prelude.GT;
                };
                throw "Failed pattern match";
            };
        }
    };
};
var applyMaybe = function (_) {
    return {
        "__superclasses": {
            "Prelude.Functor_0": function (_) {
                return functorMaybe({});
            }
        }, 
        "<*>": function (_1) {
            return function (_2) {
                if (_1.ctor === "Data.Maybe.Just") {
                    return Prelude["<$>"](functorMaybe({}))(_1.values[0])(_2);
                };
                if (_1.ctor === "Data.Maybe.Nothing") {
                    return Nothing;
                };
                throw "Failed pattern match";
            };
        }
    };
};
var bindMaybe = function (_) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyMaybe({});
            }
        }, 
        ">>=": function (_1) {
            return function (_2) {
                if (_1.ctor === "Data.Maybe.Just") {
                    return _2(_1.values[0]);
                };
                if (_1.ctor === "Data.Maybe.Nothing") {
                    return Nothing;
                };
                throw "Failed pattern match";
            };
        }
    };
};
var applicativeMaybe = function (_) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyMaybe({});
            }
        }, 
        pure: Just
    };
};
var monadMaybe = function (_) {
    return {
        "__superclasses": {
            "Prelude.Applicative_0": function (_) {
                return applicativeMaybe({});
            }, 
            "Prelude.Bind_1": function (_) {
                return bindMaybe({});
            }
        }
    };
};
var alternativeMaybe = function (_) {
    return {
        "__superclasses": {}, 
        empty: Nothing, 
        "<|>": function (_1) {
            return function (_2) {
                if (_1.ctor === "Data.Maybe.Nothing") {
                    return _2;
                };
                return _1;
            };
        }
    };
};
module.exports = {
    Nothing: Nothing, 
    Just: Just, 
    isNothing: isNothing, 
    isJust: isJust, 
    fromMaybe: fromMaybe, 
    maybe: maybe, 
    functorMaybe: functorMaybe, 
    applyMaybe: applyMaybe, 
    applicativeMaybe: applicativeMaybe, 
    alternativeMaybe: alternativeMaybe, 
    bindMaybe: bindMaybe, 
    monadMaybe: monadMaybe, 
    showMaybe: showMaybe, 
    eqMaybe: eqMaybe, 
    ordMaybe: ordMaybe
};
},{"Prelude":16}],13:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
function mempty(dict) {
    return dict["mempty"];
};
var monoidString = function (_) {
    return {
        "__superclasses": {
            "Prelude.Semigroup_0": function (_) {
                return Prelude.semigroupString({});
            }
        }, 
        mempty: ""
    };
};
module.exports = {
    mempty: mempty, 
    monoidString: monoidString
};
},{"Prelude":16}],14:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Data_DOM_Elements = require("Data.DOM.Elements");
var Control_Monad_Free = require("Control.Monad.Free");
var Data_DOM = require("Data.DOM");
var Data_DOM_Attributes = require("Data.DOM.Attributes");
var Control_Monad_Eff = require("Control.Monad.Eff");
var Control_Monad_JQuery = require("Control.Monad.JQuery");
var Data_DOM_Render_JQuery = require("Data.DOM.Render.JQuery");
var test = Data_DOM_Elements.div([  ])(Data_DOM_Elements.ul([  ])(Prelude[">>="](Control_Monad_Free.bindFree(Data_DOM.functorHtmlF({})))(Data_DOM_Elements.li([  ])(Data_DOM.text("Item 1")))(function (_) {
    return Prelude[">>="](Control_Monad_Free.bindFree(Data_DOM.functorHtmlF({})))(Data_DOM_Elements.li([ Data_DOM_Attributes.style("color: red;") ])(Data_DOM.text("Item 2")))(function (_) {
        return Data_DOM_Elements.li([  ])(Data_DOM.text("Item 3"));
    });
})));
var main = function __do() {
    var _1 = Control_Monad_JQuery.select("body")();
    return Data_DOM_Render_JQuery.renderJQuery(_1)(test)();
};
module.exports = {
    main: main, 
    test: test
};
},{"Control.Monad.Eff":3,"Control.Monad.Free":4,"Control.Monad.JQuery":5,"Data.DOM":10,"Data.DOM.Attributes":7,"Data.DOM.Elements":8,"Data.DOM.Render.JQuery":9,"Prelude":16}],15:[function(require,module,exports){
"use strict";
function unsafeIndex(xs) {  return function(n) {    return xs[n];  };};
module.exports = {
    unsafeIndex: unsafeIndex
};
},{}],16:[function(require,module,exports){
"use strict";
var LT = {
    ctor: "Prelude.LT", 
    values: [  ]
};
var GT = {
    ctor: "Prelude.GT", 
    values: [  ]
};
var EQ = {
    ctor: "Prelude.EQ", 
    values: [  ]
};
function $less$less$less(dict) {
    return dict["<<<"];
};
function id(dict) {
    return dict["id"];
};
function cons(e) {  return function (l) {    return [e].concat(l);  };};
function show(dict) {
    return dict["show"];
};
function showStringImpl(s) {  return JSON.stringify(s);};
function showNumberImpl(n) {  return n.toString();};
function showArrayImpl (f) {  return function (xs) {    var ss = [];    for (var i = 0, l = xs.length; i < l; i++) {      ss[i] = f(xs[i]);    }    return '[' + ss.join(',') + ']';  };};
function $less$dollar$greater(dict) {
    return dict["<$>"];
};
function $less$times$greater(dict) {
    return dict["<*>"];
};
function pure(dict) {
    return dict["pure"];
};
function empty(dict) {
    return dict["empty"];
};
function $less$bar$greater(dict) {
    return dict["<|>"];
};
function $greater$greater$eq(dict) {
    return dict[">>="];
};
function $plus(dict) {
    return dict["+"];
};
function $minus(dict) {
    return dict["-"];
};
function $times(dict) {
    return dict["*"];
};
function $div(dict) {
    return dict["/"];
};
function $percent(dict) {
    return dict["%"];
};
function negate(dict) {
    return dict["negate"];
};
function numAdd(n1) {  return function(n2) {    return n1 + n2;  };};
function numSub(n1) {  return function(n2) {    return n1 - n2;  };};
function numMul(n1) {  return function(n2) {    return n1 * n2;  };};
function numDiv(n1) {  return function(n2) {    return n1 / n2;  };};
function numMod(n1) {  return function(n2) {    return n1 % n2;  };};
function numNegate(n) {  return -n;};
function $eq$eq(dict) {
    return dict["=="];
};
function $div$eq(dict) {
    return dict["/="];
};
function refEq(r1) {  return function(r2) {    return r1 === r2;  };};
function refIneq(r1) {  return function(r2) {    return r1 !== r2;  };};
function compare(dict) {
    return dict["compare"];
};
function numCompare(n1) {  return function(n2) {    return n1 < n2 ? LT : n1 > n2 ? GT : EQ;  };};
function $amp(dict) {
    return dict["&"];
};
function $bar(dict) {
    return dict["|"];
};
function $up(dict) {
    return dict["^"];
};
function shl(dict) {
    return dict["shl"];
};
function shr(dict) {
    return dict["shr"];
};
function zshr(dict) {
    return dict["zshr"];
};
function complement(dict) {
    return dict["complement"];
};
function numShl(n1) {  return function(n2) {    return n1 << n2;  };};
function numShr(n1) {  return function(n2) {    return n1 >> n2;  };};
function numZshr(n1) {  return function(n2) {    return n1 >>> n2;  };};
function numAnd(n1) {  return function(n2) {    return n1 & n2;  };};
function numOr(n1) {  return function(n2) {    return n1 | n2;  };};
function numXor(n1) {  return function(n2) {    return n1 ^ n2;  };};
function numComplement(n) {  return ~n;};
function $amp$amp(dict) {
    return dict["&&"];
};
function $bar$bar(dict) {
    return dict["||"];
};
function not(dict) {
    return dict["not"];
};
function boolAnd(b1) {  return function(b2) {    return b1 && b2;  };};
function boolOr(b1) {  return function(b2) {    return b1 || b2;  };};
function boolNot(b) {  return !b;};
function $less$greater(dict) {
    return dict["<>"];
};
function concatString(s1) {  return function(s2) {    return s1 + s2;  };};
var $greater$greater$greater = function (__dict_Semigroupoid_0) {
    return function (f) {
        return function (g) {
            return $less$less$less(__dict_Semigroupoid_0)(g)(f);
        };
    };
};
var $greater$eq = function (__dict_Ord_1) {
    return function (a1) {
        return function (a2) {
            return (function (_1) {
                if (_1.ctor === "Prelude.LT") {
                    return false;
                };
                return true;
            })(compare(__dict_Ord_1)(a1)(a2));
        };
    };
};
var $greater = function (__dict_Ord_2) {
    return function (a1) {
        return function (a2) {
            return (function (_1) {
                if (_1.ctor === "Prelude.GT") {
                    return true;
                };
                return false;
            })(compare(__dict_Ord_2)(a1)(a2));
        };
    };
};
var $less$eq = function (__dict_Ord_3) {
    return function (a1) {
        return function (a2) {
            return (function (_1) {
                if (_1.ctor === "Prelude.GT") {
                    return false;
                };
                return true;
            })(compare(__dict_Ord_3)(a1)(a2));
        };
    };
};
var $less = function (__dict_Ord_4) {
    return function (a1) {
        return function (a2) {
            return (function (_1) {
                if (_1.ctor === "Prelude.LT") {
                    return true;
                };
                return false;
            })(compare(__dict_Ord_4)(a1)(a2));
        };
    };
};
var $colon = cons;
var $plus$plus = function (__dict_Semigroup_5) {
    return $less$greater(__dict_Semigroup_5);
};
var $dollar = function (f) {
    return function (x) {
        return f(x);
    };
};
var $hash = function (x) {
    return function (f) {
        return f(x);
    };
};
var showString = function (_) {
    return {
        "__superclasses": {}, 
        show: showStringImpl
    };
};
var showOrdering = function (_) {
    return {
        "__superclasses": {}, 
        show: function (_1) {
            if (_1.ctor === "Prelude.LT") {
                return "LT";
            };
            if (_1.ctor === "Prelude.GT") {
                return "GT";
            };
            if (_1.ctor === "Prelude.EQ") {
                return "EQ";
            };
            throw "Failed pattern match";
        }
    };
};
var showNumber = function (_) {
    return {
        "__superclasses": {}, 
        show: showNumberImpl
    };
};
var showBoolean = function (_) {
    return {
        "__superclasses": {}, 
        show: function (_1) {
            if (_1) {
                return "true";
            };
            if (!_1) {
                return "false";
            };
            throw "Failed pattern match";
        }
    };
};
var showArray = function (__dict_Show_6) {
    return {
        "__superclasses": {}, 
        show: showArrayImpl(show(__dict_Show_6))
    };
};
var semigroupoidArr = function (_) {
    return {
        "__superclasses": {}, 
        "<<<": function (f) {
            return function (g) {
                return function (x) {
                    return f(g(x));
                };
            };
        }
    };
};
var semigroupString = function (_) {
    return {
        "__superclasses": {}, 
        "<>": concatString
    };
};
var $$return = function (__dict_Monad_7) {
    return pure(__dict_Monad_7["__superclasses"]["Prelude.Applicative_0"]({}));
};
var numNumber = function (_) {
    return {
        "__superclasses": {}, 
        "+": numAdd, 
        "-": numSub, 
        "*": numMul, 
        "/": numDiv, 
        "%": numMod, 
        negate: numNegate
    };
};
var liftM1 = function (__dict_Monad_8) {
    return function (f) {
        return function (a) {
            return $greater$greater$eq(__dict_Monad_8["__superclasses"]["Prelude.Bind_1"]({}))(a)(function (_1) {
                return $$return(__dict_Monad_8)(f(_1));
            });
        };
    };
};
var liftA1 = function (__dict_Applicative_9) {
    return function (f) {
        return function (a) {
            return $less$times$greater(__dict_Applicative_9["__superclasses"]["Prelude.Apply_0"]({}))(pure(__dict_Applicative_9)(f))(a);
        };
    };
};
var flip = function (f) {
    return function (b) {
        return function (a) {
            return f(a)(b);
        };
    };
};
var eqString = function (_) {
    return {
        "__superclasses": {}, 
        "==": refEq, 
        "/=": refIneq
    };
};
var eqNumber = function (_) {
    return {
        "__superclasses": {}, 
        "==": refEq, 
        "/=": refIneq
    };
};
var ordNumber = function (_) {
    return {
        "__superclasses": {
            "Prelude.Eq_0": function (_) {
                return eqNumber({});
            }
        }, 
        compare: numCompare
    };
};
var eqBoolean = function (_) {
    return {
        "__superclasses": {}, 
        "==": refEq, 
        "/=": refIneq
    };
};
var $$const = function (_1) {
    return function (_2) {
        return _1;
    };
};
var categoryArr = function (_) {
    return {
        "__superclasses": {
            "Prelude.Semigroupoid_0": function (_) {
                return semigroupoidArr({});
            }
        }, 
        id: function (x) {
            return x;
        }
    };
};
var boolLikeBoolean = function (_) {
    return {
        "__superclasses": {}, 
        "&&": boolAnd, 
        "||": boolOr, 
        not: boolNot
    };
};
var eqArray = function (__dict_Eq_10) {
    return {
        "__superclasses": {}, 
        "==": function (_1) {
            return function (_2) {
                if (_1.length === 0) {
                    if (_2.length === 0) {
                        return true;
                    };
                };
                if (_1.length > 0) {
                    var _8 = _1.slice(1);
                    if (_2.length > 0) {
                        var _6 = _2.slice(1);
                        return $amp$amp(boolLikeBoolean({}))($eq$eq(__dict_Eq_10)(_1[0])(_2[0]))($eq$eq(eqArray(__dict_Eq_10))(_8)(_6));
                    };
                };
                return false;
            };
        }, 
        "/=": function (xs) {
            return function (ys) {
                return not(boolLikeBoolean({}))($eq$eq(eqArray(__dict_Eq_10))(xs)(ys));
            };
        }
    };
};
var eqOrdering = function (_) {
    return {
        "__superclasses": {}, 
        "==": function (_1) {
            return function (_2) {
                if (_1.ctor === "Prelude.LT") {
                    if (_2.ctor === "Prelude.LT") {
                        return true;
                    };
                };
                if (_1.ctor === "Prelude.GT") {
                    if (_2.ctor === "Prelude.GT") {
                        return true;
                    };
                };
                if (_1.ctor === "Prelude.EQ") {
                    if (_2.ctor === "Prelude.EQ") {
                        return true;
                    };
                };
                return false;
            };
        }, 
        "/=": function (x) {
            return function (y) {
                return not(boolLikeBoolean({}))($eq$eq(eqOrdering({}))(x)(y));
            };
        }
    };
};
var bitsNumber = function (_) {
    return {
        "__superclasses": {}, 
        "&": numAnd, 
        "|": numOr, 
        "^": numXor, 
        shl: numShl, 
        shr: numShr, 
        zshr: numZshr, 
        complement: numComplement
    };
};
var asTypeOf = function (_1) {
    return function (_2) {
        return _1;
    };
};
var ap = function (__dict_Monad_11) {
    return function (f) {
        return function (a) {
            return $greater$greater$eq(__dict_Monad_11["__superclasses"]["Prelude.Bind_1"]({}))(f)(function (_2) {
                return $greater$greater$eq(__dict_Monad_11["__superclasses"]["Prelude.Bind_1"]({}))(a)(function (_1) {
                    return $$return(__dict_Monad_11)(_2(_1));
                });
            });
        };
    };
};
module.exports = {
    LT: LT, 
    GT: GT, 
    EQ: EQ, 
    "++": $plus$plus, 
    concatString: concatString, 
    "<>": $less$greater, 
    boolNot: boolNot, 
    boolOr: boolOr, 
    boolAnd: boolAnd, 
    not: not, 
    "||": $bar$bar, 
    "&&": $amp$amp, 
    numComplement: numComplement, 
    numXor: numXor, 
    numOr: numOr, 
    numAnd: numAnd, 
    numZshr: numZshr, 
    numShr: numShr, 
    numShl: numShl, 
    complement: complement, 
    zshr: zshr, 
    shr: shr, 
    shl: shl, 
    "^": $up, 
    "|": $bar, 
    "&": $amp, 
    numCompare: numCompare, 
    ">=": $greater$eq, 
    "<=": $less$eq, 
    ">": $greater, 
    "<": $less, 
    compare: compare, 
    refIneq: refIneq, 
    refEq: refEq, 
    "/=": $div$eq, 
    "==": $eq$eq, 
    numNegate: numNegate, 
    numMod: numMod, 
    numDiv: numDiv, 
    numMul: numMul, 
    numSub: numSub, 
    numAdd: numAdd, 
    negate: negate, 
    "%": $percent, 
    "/": $div, 
    "*": $times, 
    "-": $minus, 
    "+": $plus, 
    ap: ap, 
    liftM1: liftM1, 
    "return": $$return, 
    ">>=": $greater$greater$eq, 
    "<|>": $less$bar$greater, 
    empty: empty, 
    liftA1: liftA1, 
    pure: pure, 
    "<*>": $less$times$greater, 
    "<$>": $less$dollar$greater, 
    showArrayImpl: showArrayImpl, 
    showNumberImpl: showNumberImpl, 
    showStringImpl: showStringImpl, 
    show: show, 
    cons: cons, 
    ":": $colon, 
    "#": $hash, 
    "$": $dollar, 
    id: id, 
    ">>>": $greater$greater$greater, 
    "<<<": $less$less$less, 
    asTypeOf: asTypeOf, 
    "const": $$const, 
    flip: flip, 
    semigroupoidArr: semigroupoidArr, 
    categoryArr: categoryArr, 
    showString: showString, 
    showBoolean: showBoolean, 
    showNumber: showNumber, 
    showArray: showArray, 
    numNumber: numNumber, 
    eqString: eqString, 
    eqNumber: eqNumber, 
    eqBoolean: eqBoolean, 
    eqArray: eqArray, 
    eqOrdering: eqOrdering, 
    showOrdering: showOrdering, 
    ordNumber: ordNumber, 
    bitsNumber: bitsNumber, 
    boolLikeBoolean: boolLikeBoolean, 
    semigroupString: semigroupString
};
},{}]},{},[1]);