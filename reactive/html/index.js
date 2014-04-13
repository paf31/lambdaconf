(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function() {
  require("Main").main();
});

},{"Main":25}],2:[function(require,module,exports){
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
},{"Prelude":27}],3:[function(require,module,exports){
"use strict";
function unsafeRunRef(f) {  return f;};
module.exports = {
    unsafeRunRef: unsafeRunRef
};
},{}],4:[function(require,module,exports){
"use strict";
function newRef(val) {  return function () {    return { value: val };  };};
function readRef(ref) {  return function() {    return ref.value;  };};
function modifyRef(ref) {  return function(f) {    return function() {      ref.value = f(ref.value);      return {};    };  };};
function writeRef(ref) {  return function(val) {    return function() {      ref.value = val;      return {};    };  };};
module.exports = {
    writeRef: writeRef, 
    modifyRef: modifyRef, 
    readRef: readRef, 
    newRef: newRef
};
},{}],5:[function(require,module,exports){
"use strict";
function unsafeInterleaveEff(f) {  return f;};
module.exports = {
    unsafeInterleaveEff: unsafeInterleaveEff
};
},{}],6:[function(require,module,exports){
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
},{"Prelude":27}],7:[function(require,module,exports){
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
},{"Prelude":27}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Control_Monad_Eff = require("Control.Monad.Eff");
var Control_Reactive = require("Control.Reactive");
var Control_Monad_JQuery = require("Control.Monad.JQuery");
var Data_Foreign = require("Data.Foreign");
var Control_Monad_Eff_Ref_Unsafe = require("Control.Monad.Eff.Ref.Unsafe");
var Data_Traversable = require("Data.Traversable");
var Control_Monad_Eff_Unsafe = require("Control.Monad.Eff.Unsafe");
var Data_Array = require("Data.Array");
var Control_Monad_Eff_Ref = require("Control.Monad.Eff.Ref");
var Prelude_Unsafe = require("Prelude.Unsafe");
var bindValueTwoWay = function (__dict_ReadForeign_0) {
    return function (ref) {
        return function (input) {
            return function __do() {
                var _2 = Control_Reactive.readRVar(ref)();
                Control_Monad_JQuery.setValue(_2)(input)();
                Prelude.flip(Control_Monad_JQuery.on("change"))(input)(function (_) {
                    return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Prelude["<$>"](Control_Monad_Eff.functorEff({}))(Data_Foreign.parseForeign(Data_Foreign.read(__dict_ReadForeign_0)))(Control_Monad_JQuery.getValue(input)))(function (_1) {
                        if (_1.ctor === "Data.Either.Right") {
                            return Control_Reactive.writeRVar(ref)(_1.values[0]);
                        };
                        throw "Failed pattern match";
                    });
                })();
                return Control_Reactive.subscribe(ref)(function (newValue) {
                    return function __do() {
                        Control_Monad_JQuery.setValue(newValue)(input)();
                        return {};
                    };
                })();
            };
        };
    };
};
var bindTextOneWay = function (comp) {
    return function (el) {
        return function __do() {
            var _1 = Control_Reactive.readComputed(comp)();
            var text = _1;
            Control_Monad_JQuery.setText(text)(el)();
            return Control_Reactive.subscribeComputed(comp)(function (text) {
                return function __do() {
                    Control_Monad_JQuery.setText(text)(el)();
                    return {};
                };
            })();
        };
    };
};
var bindCheckedTwoWay = function (ref) {
    return function (checkbox) {
        return function __do() {
            var _2 = Control_Reactive.readRVar(ref)();
            Control_Monad_JQuery.setProp("checked")(_2)(checkbox)();
            Prelude.flip(Control_Monad_JQuery.on("change"))(checkbox)(function (_) {
                return Prelude[">>="](Control_Monad_Eff.bindEff({}))(Prelude["<$>"](Control_Monad_Eff.functorEff({}))(Data_Foreign.parseForeign(Data_Foreign.read(Data_Foreign.readBoolean({}))))(Control_Monad_JQuery.getProp("checked")(checkbox)))(function (_1) {
                    if (_1.ctor === "Data.Either.Right") {
                        return Control_Reactive.writeRVar(ref)(_1.values[0]);
                    };
                    throw "Failed pattern match";
                });
            })();
            return Control_Reactive.subscribe(ref)(function (newValue) {
                return function __do() {
                    Control_Monad_JQuery.setProp("checked")(newValue)(checkbox)();
                    return {};
                };
            })();
        };
    };
};
var bindArray = function (arr) {
    return function (el) {
        return function (create) {
            return Control_Monad_Eff_Ref_Unsafe.unsafeRunRef(function __do() {
                var _6 = Control_Reactive.readRArray(arr)();
                return (function (_7) {
                    return function __do() {
                        var _5 = Data_Traversable.zipWithA(Control_Monad_Eff.functorEff({}))(Control_Monad_Eff.applicativeEff({}))(function (a) {
                            return function (index) {
                                return function __do() {
                                    var _2 = Control_Reactive.newRVar(index)();
                                    var _1 = Control_Monad_Eff_Unsafe.unsafeInterleaveEff(create(a)(_2))();
                                    Control_Monad_JQuery.append(_1.el)(el)();
                                    return {
                                        el: _1.el, 
                                        subscription: _1.subscription, 
                                        index: _2
                                    };
                                };
                            };
                        })(_7)(Data_Array.range(0)(Data_Array.length(_7) - 1))();
                        return (function (_6) {
                            var elements$prime = _6;
                            return function __do() {
                                var _4 = Control_Monad_Eff_Ref.newRef(elements$prime)();
                                return (function (_5) {
                                    var elements = _5;
                                    return Control_Reactive.subscribeArray(arr)(function (change) {
                                        return (function (_4) {
                                            if (_4.ctor === "Control.Reactive.Inserted") {
                                                var _5 = _4.values[0];
                                                var _6 = _4.values[1];
                                                return function __do() {
                                                    var _3 = Control_Reactive.newRVar(_6)();
                                                    return (function (_4) {
                                                        return function __do() {
                                                            var _2 = Control_Monad_Eff_Unsafe.unsafeInterleaveEff(create(_5)(_4))();
                                                            return (function (_3) {
                                                                return function __do() {
                                                                    var _1 = Control_Monad_Eff_Ref.readRef(elements)();
                                                                    return (function (_2) {
                                                                        return function __do() {
                                                                            Data_Traversable.traverse(Data_Traversable.traversableArray({}))(Control_Monad_Eff.functorEff({}))(Control_Monad_Eff.applicativeEff({}))(function (_1) {
                                                                                return Control_Reactive.modifyRVar(_1.index)(function (i) {
                                                                                    return (i > _6) ? i + 1 : i;
                                                                                });
                                                                            })(_2)();
                                                                            Control_Monad_Eff_Ref.modifyRef(elements)(Data_Array.insertAt(_6)({
                                                                                el: _3.el, 
                                                                                subscription: _3.subscription, 
                                                                                index: _4
                                                                            }))();
                                                                            Control_Monad_JQuery.appendAtIndex(_6)(_3.el)(el)();
                                                                            return {};
                                                                        };
                                                                    })(_1)();
                                                                };
                                                            })(_2)();
                                                        };
                                                    })(_3)();
                                                };
                                            };
                                            if (_4.ctor === "Control.Reactive.Updated") {
                                                return function __do() {
                                                    var _2 = Prelude["<$>"](Control_Monad_Eff.functorEff({}))(Prelude.flip(Prelude_Unsafe.unsafeIndex)(_4.values[1]))(Control_Monad_Eff_Ref.readRef(elements))();
                                                    _2.subscription.values[0]();
                                                    Control_Monad_JQuery.remove(_2.el)();
                                                    var _1 = Control_Monad_Eff_Unsafe.unsafeInterleaveEff(create(_4.values[0])(_2.index))();
                                                    Control_Monad_Eff_Ref.modifyRef(elements)(Data_Array.updateAt(_4.values[1])({
                                                        el: _1.el, 
                                                        subscription: _1.subscription, 
                                                        index: _2.index
                                                    }))();
                                                    Control_Monad_JQuery.appendAtIndex(_4.values[1])(_1.el)(el)();
                                                    return {};
                                                };
                                            };
                                            if (_4.ctor === "Control.Reactive.Removed") {
                                                return function __do() {
                                                    var _2 = Prelude["<$>"](Control_Monad_Eff.functorEff({}))(Prelude.flip(Prelude_Unsafe.unsafeIndex)(_4.values[0]))(Control_Monad_Eff_Ref.readRef(elements))();
                                                    return (function (_3) {
                                                        return function __do() {
                                                            _3.subscription.values[0]();
                                                            Control_Monad_JQuery.remove(_3.el)();
                                                            Control_Monad_Eff_Ref.modifyRef(elements)(Data_Array.deleteAt(_4.values[0])(1))();
                                                            var _1 = Control_Monad_Eff_Ref.readRef(elements)();
                                                            return (function (_2) {
                                                                return function __do() {
                                                                    Data_Traversable.traverse(Data_Traversable.traversableArray({}))(Control_Monad_Eff.functorEff({}))(Control_Monad_Eff.applicativeEff({}))(function (_1) {
                                                                        return Control_Reactive.modifyRVar(_1.index)(function (i) {
                                                                            return (i > _4.values[0]) ? i - 1 : i;
                                                                        });
                                                                    })(_2)();
                                                                    return {};
                                                                };
                                                            })(_1)();
                                                        };
                                                    })(_2)();
                                                };
                                            };
                                            throw "Failed pattern match";
                                        })(change);
                                    });
                                })(_4)();
                            };
                        })(_5)();
                    };
                })(_6)();
            });
        };
    };
};
module.exports = {
    bindArray: bindArray, 
    bindTextOneWay: bindTextOneWay, 
    bindCheckedTwoWay: bindCheckedTwoWay, 
    bindValueTwoWay: bindValueTwoWay
};
},{"Control.Monad.Eff":6,"Control.Monad.Eff.Ref":4,"Control.Monad.Eff.Ref.Unsafe":3,"Control.Monad.Eff.Unsafe":5,"Control.Monad.JQuery":8,"Control.Reactive":10,"Data.Array":11,"Data.Foreign":19,"Data.Traversable":22,"Prelude":27,"Prelude.Unsafe":26}],10:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Control_Monad_Eff = require("Control.Monad.Eff");
var Data_Monoid = require("Data.Monoid");
var Control_Monad_Eff_Ref_Unsafe = require("Control.Monad.Eff.Ref.Unsafe");
var Control_Monad_Eff_Ref = require("Control.Monad.Eff.Ref");
var Subscription = function (value0) {
    return {
        ctor: "Control.Reactive.Subscription", 
        values: [ value0 ]
    };
};
var Inserted = function (value0) {
    return function (value1) {
        return {
            ctor: "Control.Reactive.Inserted", 
            values: [ value0, value1 ]
        };
    };
};
var Updated = function (value0) {
    return function (value1) {
        return {
            ctor: "Control.Reactive.Updated", 
            values: [ value0, value1 ]
        };
    };
};
var Removed = function (value0) {
    return {
        ctor: "Control.Reactive.Removed", 
        values: [ value0 ]
    };
};
var Computed = function (value0) {
    return {
        ctor: "Control.Reactive.Computed", 
        values: [ value0 ]
    };
};
function newRVar(value) {  return function() {    return (function () {      function RVar(value) {        var self = this;        self.value = value;        self.listeners = [];        self.subscribe = function (listener) {          this.listeners.push(listener);          return Subscription(function() {            for (var i = 0; i < self.listeners.length; i++) {              if (self.listeners[i] === listener) {                self.listeners.splice(i, 1);                break;              }            }          });        };        self.update = function (value) {          self.value = value;          for (var i = 0; i < self.listeners.length; i++) {            self.listeners[i](value);          }        };      };      return new RVar(value);    })();  };};
function newRArray() {    return (function () {      function RArray() {        var self = this;        self.values = [];        self.listeners = [];        self.subscribe = function (listener) {          this.listeners.push(listener);          return Subscription(function() {            for (var i = 0; i < self.listeners.length; i++) {              if (self.listeners[i] === listener) {                self.listeners.splice(i, 1);                break;              }            }          });        };        self.insert = function (value, index) {          self.values.splice(index, 0, value);          for (var i = 0; i < self.listeners.length; i++) {            self.listeners[i](Inserted(value)(index));          }        };        self.remove = function (index) {          self.values.splice(index, 1);          for (var i = 0; i < self.listeners.length; i++) {            self.listeners[i](Removed(index));          }        };        self.update = function (value, index) {          self.values[index] = index;          for (var i = 0; i < self.listeners.length; i++) {            self.listeners[i](Updated(value)(index));          }        };      };      return new RArray();    })();};
function readRVar(ref) {  return function() {    return ref.value;  };};
function readRArray(arr) {  return function() {    return arr.values;  };};
function writeRVar(ref) {  return function (value) {    return function() {      ref.update(value);    };  };};
function peekRArray(arr) {  return function(i) {    return arr.values[i];  };};
function insertRArray(arr) {  return function (value) {    return function(index) {      return function() {        arr.insert(value, index);      };    };  };};
function removeRArray(arr) {  return function(index) {    return function() {      arr.remove(index);    };  };};
function updateRArray(arr) {  return function (value) {    return function(index) {      return function() {        arr.update(value, index);      };    };  };};
function subscribe(ref) {  return function(f) {    return function() {      return ref.subscribe(function(value) {        f(value)();      });    };  };};
function subscribeArray(arr) {  return function(f) {    return function() {      return arr.subscribe(function(value) {        f(value)();      });    };  };};
var toComputedArray = function (arr) {
    return Computed({
        read: readRArray(arr), 
        subscribe: function (f) {
            return subscribeArray(arr)(function (_) {
                return Prelude[">>="](Control_Monad_Eff.bindEff({}))(readRArray(arr))(f);
            });
        }
    });
};
var toComputed = function (ref) {
    return Computed({
        read: readRVar(ref), 
        subscribe: subscribe(ref)
    });
};
var subscribeComputed = function (_1) {
    return function (_2) {
        return (_1.values[0]).subscribe(_2);
    };
};
var showArrayChange = function (__dict_Show_0) {
    return {
        "__superclasses": {}, 
        show: function (_1) {
            if (_1.ctor === "Control.Reactive.Inserted") {
                return "Inserted " + Prelude.show(__dict_Show_0)(_1.values[0]) + " at " + Prelude.show(Prelude.showNumber({}))(_1.values[1]);
            };
            if (_1.ctor === "Control.Reactive.Updated") {
                return "Updated " + Prelude.show(Prelude.showNumber({}))(_1.values[1]) + " to " + Prelude.show(__dict_Show_0)(_1.values[0]);
            };
            if (_1.ctor === "Control.Reactive.Removed") {
                return "Removed at index " + Prelude.show(Prelude.showNumber({}))(_1.values[0]);
            };
            throw "Failed pattern match";
        }
    };
};
var semigroupSubscription = function (_) {
    return {
        "__superclasses": {}, 
        "<>": function (_1) {
            return function (_2) {
                return Subscription(function __do() {
                    _1.values[0]();
                    return _2.values[0]();
                });
            };
        }
    };
};
var readComputed = function (_1) {
    return (_1.values[0]).read;
};
var monoidSubscription = function (_) {
    return {
        "__superclasses": {
            "Prelude.Semigroup_0": function (_) {
                return semigroupSubscription({});
            }
        }, 
        mempty: Subscription(Prelude["return"](Control_Monad_Eff.monadEff({}))({}))
    };
};
var modifyRVar = function (v) {
    return function (f) {
        return function __do() {
            var _1 = readRVar(v)();
            return writeRVar(v)(f(_1))();
        };
    };
};
var applicativeComputed = function (_) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyComputed({});
            }
        }, 
        pure: function (a) {
            return Computed({
                read: Prelude.pure(Control_Monad_Eff.applicativeEff({}))(a), 
                subscribe: function (_) {
                    return Prelude.pure(Control_Monad_Eff.applicativeEff({}))(Data_Monoid.mempty(monoidSubscription({})));
                }
            });
        }
    };
};
var applyComputed = function (_) {
    return {
        "__superclasses": {
            "Prelude.Functor_0": function (_) {
                return functorComputed({});
            }
        }, 
        "<*>": function (_3) {
            return function (_4) {
                return Computed({
                    read: function __do() {
                        var _2 = (_3.values[0]).read();
                        var _1 = (_4.values[0]).read();
                        return _2(_1);
                    }, 
                    subscribe: function (ob) {
                        return function __do() {
                            var _2 = (_3.values[0]).subscribe(function (f$prime) {
                                return function __do() {
                                    var _1 = (_4.values[0]).read();
                                    return ob(f$prime(_1))();
                                };
                            })();
                            var _1 = (_4.values[0]).subscribe(function (x$prime) {
                                return function __do() {
                                    var _1 = (_3.values[0]).read();
                                    return ob(_1(x$prime))();
                                };
                            })();
                            return Prelude["<>"](semigroupSubscription({}))(_2)(_1);
                        };
                    }
                });
            };
        }
    };
};
var functorComputed = function (_) {
    return {
        "__superclasses": {}, 
        "<$>": Prelude.liftA1(applicativeComputed({}))
    };
};
var bindComputed = function (_) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyComputed({});
            }
        }, 
        ">>=": function (_6) {
            return function (_7) {
                return (function (_8, _9) {
                    return Computed({
                        read: function __do() {
                            var _1 = (_8.values[0]).read();
                            return (function (_2) {
                                return (function (_1) {
                                    return (_1.values[0]).read;
                                })(_9(_2));
                            })(_1)();
                        }, 
                        subscribe: function (ob) {
                            return function __do() {
                                var _5 = (_8.values[0]).read();
                                return (function (_6) {
                                    var initial = _6;
                                    return (function (_5) {
                                        var _6 = _5.values[0];
                                        return function __do() {
                                            var _4 = _6.subscribe(ob)();
                                            return (function (_5) {
                                                return function __do() {
                                                    var _3 = Control_Monad_Eff_Ref_Unsafe.unsafeRunRef(Control_Monad_Eff_Ref.newRef(_5))();
                                                    return (function (_4) {
                                                        return function __do() {
                                                            var _2 = (_8.values[0]).subscribe(function (a$prime) {
                                                                return function __do() {
                                                                    var _2 = Control_Monad_Eff_Ref_Unsafe.unsafeRunRef(Control_Monad_Eff_Ref.readRef(_4))();
                                                                    return (function (_3) {
                                                                        return function __do() {
                                                                            _3.values[0]();
                                                                            return (function (_2) {
                                                                                return function __do() {
                                                                                    Prelude[">>="](Control_Monad_Eff.bindEff({}))((_2.values[0]).read)(ob)();
                                                                                    var _1 = (_2.values[0]).subscribe(ob)();
                                                                                    return Control_Monad_Eff_Ref_Unsafe.unsafeRunRef(Control_Monad_Eff_Ref.writeRef(_4)(_1))();
                                                                                };
                                                                            })(_9(a$prime))();
                                                                        };
                                                                    })(_2)();
                                                                };
                                                            })();
                                                            return Prelude["<>"](semigroupSubscription({}))(_2)(Subscription(function __do() {
                                                                var _1 = Control_Monad_Eff_Ref_Unsafe.unsafeRunRef(Control_Monad_Eff_Ref.readRef(_4))();
                                                                return _1.values[0]();
                                                            }));
                                                        };
                                                    })(_3)();
                                                };
                                            })(_4)();
                                        };
                                    })(_9(initial));
                                })(_5)();
                            };
                        }
                    });
                })(_6, _7);
            };
        }
    };
};
var monadComputed = function (_) {
    return {
        "__superclasses": {
            "Prelude.Applicative_0": function (_) {
                return applicativeComputed({});
            }, 
            "Prelude.Bind_1": function (_) {
                return bindComputed({});
            }
        }
    };
};
module.exports = {
    Computed: Computed, 
    Inserted: Inserted, 
    Updated: Updated, 
    Removed: Removed, 
    Subscription: Subscription, 
    subscribeComputed: subscribeComputed, 
    readComputed: readComputed, 
    toComputedArray: toComputedArray, 
    toComputed: toComputed, 
    modifyRVar: modifyRVar, 
    subscribeArray: subscribeArray, 
    subscribe: subscribe, 
    updateRArray: updateRArray, 
    removeRArray: removeRArray, 
    insertRArray: insertRArray, 
    peekRArray: peekRArray, 
    writeRVar: writeRVar, 
    readRArray: readRArray, 
    readRVar: readRVar, 
    newRArray: newRArray, 
    newRVar: newRVar, 
    semigroupSubscription: semigroupSubscription, 
    monoidSubscription: monoidSubscription, 
    showArrayChange: showArrayChange, 
    bindComputed: bindComputed, 
    applicativeComputed: applicativeComputed, 
    applyComputed: applyComputed, 
    functorComputed: functorComputed, 
    monadComputed: monadComputed
};
},{"Control.Monad.Eff":6,"Control.Monad.Eff.Ref":4,"Control.Monad.Eff.Ref.Unsafe":3,"Data.Monoid":21,"Prelude":27}],11:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Data_Maybe = require("Data.Maybe");
var Prelude_Unsafe = require("Prelude.Unsafe");
function snoc(l) {  return function (e) {    var l1 = l.slice();    l1.push(e);     return l1;  };};
function length (xs) {  return xs.length;};
function elem(l) {  return function (e) {    return l.indexOf(e) !== -1;  };};
function elemIndex (l) {  return function (e) {    return l.indexOf(e);  };};
function elemLastIndex (l) {  return function (e) {    return l.lastIndexOf(e);  };};
function append (l1) {  return function (l2) {    return l1.concat(l2);  };};
function concat (xss) {  var result = [];  for (var i = 0, l = xss.length; i < l; i++) {    result.push.apply(result, xss[i]);  }  return result;};
function reverse (l) {  return l.slice().reverse();};
function drop (n) {  return function (l) {    return l.slice(n);  };};
function take (n) {  return function (l) {    return l.slice(0, n);  };};
function slice (s) {  return function (e) {    return function (l) {      return l.slice(s, e);    };  };};
function insertAt (index) {  return function (a) {    return function (l) {      var l1 = l.slice();      l1.splice(index, 0, a);      return l1;    };   };};
function deleteAt (index) {  return function (n) {    return function (l) {      var l1 = l.slice();      l1.splice(index, n);      return l1;    };   };};
function updateAt (index) {  return function (a) {    return function (l) {      var l1 = l.slice();      l1[index] = a;      return l1;    };   };};
function concatMap (f) {  return function (arr) {    var result = [];    for (var i = 0, l = arr.length; i < l; i++) {      Array.prototype.push.apply(result, f(arr[i]));    }    return result;  };};
function map (f) {  return function (arr) {    var l = arr.length;    var result = new Array(l);    for (var i = 0; i < l; i++) {      result[i] = f(arr[i]);    }    return result;  };};
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
        "<>": append
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
var $$null = function (_1) {
    if (_1.length === 0) {
        return true;
    };
    return false;
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
var last = function (__copy__1) {
    var _1 = __copy__1;
    tco: while (true) {
        if (_1.length > 0) {
            var _4 = _1.slice(1);
            if (_4.length === 0) {
                return Data_Maybe.Just(_1[0]);
            };
        };
        if (_1.length > 0) {
            var _6 = _1.slice(1);
            _1 = _6;
            continue tco;
        };
        return Data_Maybe.Nothing;
    };
};
var init = function (_1) {
    if (_1.length === 0) {
        return Data_Maybe.Nothing;
    };
    return Data_Maybe.Just(slice(0)(length(_1) - 1)(_1));
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
        "<|>": append
    };
};
module.exports = {
    sort: sort, 
    nubBy: nubBy, 
    nub: nub, 
    zipWith: zipWith, 
    range: range, 
    filter: filter, 
    concatMap: concatMap, 
    updateAt: updateAt, 
    deleteAt: deleteAt, 
    insertAt: insertAt, 
    slice: slice, 
    take: take, 
    drop: drop, 
    reverse: reverse, 
    concat: concat, 
    append: append, 
    elemLastIndex: elemLastIndex, 
    elemIndex: elemIndex, 
    elem: elem, 
    length: length, 
    map: map, 
    "null": $$null, 
    init: init, 
    tail: tail, 
    last: last, 
    head: head, 
    singleton: singleton, 
    snoc: snoc, 
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
},{"Data.Maybe":20,"Prelude":27,"Prelude.Unsafe":26}],12:[function(require,module,exports){
"use strict";
var Data_DOM = require("Data.DOM");
var style = Data_DOM.Attribute("style");
module.exports = {
    style: style
};
},{"Data.DOM":15}],13:[function(require,module,exports){
"use strict";
var Data_DOM = require("Data.DOM");
var ul = Data_DOM.element("ul");
var p = Data_DOM.element("p");
var li = Data_DOM.element("li");
var div = Data_DOM.element("div");
module.exports = {
    p: p, 
    li: li, 
    ul: ul, 
    div: div
};
},{"Data.DOM":15}],14:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Control_Monad_Eff = require("Control.Monad.Eff");
var Control_Monad_JQuery = require("Control.Monad.JQuery");
var Data_Foldable = require("Data.Foldable");
var Data_DOM = require("Data.DOM");
var Control_Reactive_JQuery = require("Control.Reactive.JQuery");
var Data_Foreign = require("Data.Foreign");
var Data_Monoid = require("Data.Monoid");
var Control_Reactive = require("Control.Reactive");
var Control_Monad_Free = require("Control.Monad.Free");
var createElement = function (elem) {
    return function (attrs) {
        return function __do() {
            var _1 = Control_Monad_JQuery.create("<" + elem + ">")();
            return (function (_2) {
                return function __do() {
                    Data_Foldable["for_"](Control_Monad_Eff.functorEff({}))(Control_Monad_Eff.applicativeEff({}))(Data_Foldable.foldableArray({}))(attrs)(function (_1) {
                        return Control_Monad_JQuery.setAttr(_1.values[0])(_1.values[1])(_2);
                    })();
                    return _2;
                };
            })(_1)();
        };
    };
};
var renderJQuery = function (root) {
    var go = function (_4) {
        if (_4.ctor === "Data.DOM.Element") {
            return Data_DOM.runElementData(_4.values[0])(function (elem) {
                return function (attrs) {
                    return function (children) {
                        return function (k) {
                            return function __do() {
                                var _2 = createElement(elem)(attrs)();
                                var _1 = renderJQuery(_2)(children)();
                                Control_Monad_JQuery.append(_2)(root)();
                                return k(_1)();
                            };
                        };
                    };
                };
            });
        };
        if (_4.ctor === "Data.DOM.Text") {
            return function __do() {
                Control_Monad_JQuery.appendText(_4.values[0])(root)();
                return _4.values[1]();
            };
        };
        if (_4.ctor === "Data.DOM.Label") {
            return function __do() {
                var _2 = createElement("span")(_4.values[1])();
                var _1 = Control_Reactive_JQuery.bindTextOneWay(_4.values[0])(_2)();
                Control_Monad_JQuery.append(_2)(root)();
                return _4.values[2](_1)();
            };
        };
        if (_4.ctor === "Data.DOM.TextBox") {
            return function __do() {
                var _2 = createElement("input")(_4.values[1])();
                var _1 = Control_Reactive_JQuery.bindValueTwoWay(Data_Foreign.readString({}))(_4.values[0])(_2)();
                Control_Monad_JQuery.append(_2)(root)();
                return _4.values[2](_1)();
            };
        };
        if (_4.ctor === "Data.DOM.CheckBox") {
            return function __do() {
                var _2 = createElement("input")(Prelude[":"](Data_DOM.Attribute("type")("checkbox"))(_4.values[1]))();
                var _1 = Control_Reactive_JQuery.bindCheckedTwoWay(_4.values[0])(_2)();
                Control_Monad_JQuery.append(_2)(root)();
                return _4.values[2](_1)();
            };
        };
        if (_4.ctor === "Data.DOM.Button") {
            return function __do() {
                var _1 = createElement("button")(_4.values[1])();
                Prelude.flip(Control_Monad_JQuery.on("click"))(_1)(function (_) {
                    return _4.values[2];
                })();
                Control_Monad_JQuery.appendText(_4.values[0])(_1)();
                Control_Monad_JQuery.append(_1)(root)();
                return _4.values[3](Data_Monoid.mempty(Control_Reactive.monoidSubscription({})))();
            };
        };
        if (_4.ctor === "Data.DOM.ForEach") {
            return Data_DOM.runForEachData(_4.values[0])(function (arr) {
                return function (attrs) {
                    return function (body) {
                        return function (k) {
                            return function __do() {
                                var _3 = createElement("div")(attrs)();
                                var _1 = Control_Reactive_JQuery.bindArray(arr)(_3)(function (item) {
                                    return function (index) {
                                        return function __do() {
                                            var _2 = createElement("div")([  ])();
                                            var _1 = renderJQuery(_2)(body(item)(index))();
                                            return {
                                                el: _2, 
                                                subscription: _1
                                            };
                                        };
                                    };
                                })();
                                Control_Monad_JQuery.append(_3)(root)();
                                return k(_1)();
                            };
                        };
                    };
                };
            });
        };
        throw "Failed pattern match";
    };
    return Control_Monad_Free.iterM(Data_DOM.functorHtmlF({}))(Control_Monad_Eff.monadEff({}))(go);
};
module.exports = {
    renderJQuery: renderJQuery, 
    createElement: createElement
};
},{"Control.Monad.Eff":6,"Control.Monad.Free":7,"Control.Monad.JQuery":8,"Control.Reactive":10,"Control.Reactive.JQuery":9,"Data.DOM":15,"Data.Foldable":18,"Data.Foreign":19,"Data.Monoid":21,"Prelude":27}],15:[function(require,module,exports){
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
    return {
        ctor: "Data.DOM.Element", 
        values: [ value0 ]
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
var Label = function (value0) {
    return function (value1) {
        return function (value2) {
            return {
                ctor: "Data.DOM.Label", 
                values: [ value0, value1, value2 ]
            };
        };
    };
};
var TextBox = function (value0) {
    return function (value1) {
        return function (value2) {
            return {
                ctor: "Data.DOM.TextBox", 
                values: [ value0, value1, value2 ]
            };
        };
    };
};
var CheckBox = function (value0) {
    return function (value1) {
        return function (value2) {
            return {
                ctor: "Data.DOM.CheckBox", 
                values: [ value0, value1, value2 ]
            };
        };
    };
};
var Button = function (value0) {
    return function (value1) {
        return function (value2) {
            return function (value3) {
                return {
                    ctor: "Data.DOM.Button", 
                    values: [ value0, value1, value2, value3 ]
                };
            };
        };
    };
};
var ForEach = function (value0) {
    return {
        ctor: "Data.DOM.ForEach", 
        values: [ value0 ]
    };
};
var MkElementData = function (value0) {
    return {
        ctor: "Data.DOM.MkElementData", 
        values: [ value0 ]
    };
};
var MkForEachData = function (value0) {
    return {
        ctor: "Data.DOM.MkForEachData", 
        values: [ value0 ]
    };
};
var runForEachData = function (_1) {
    return function (_2) {
        return _1.values[0](_2);
    };
};
var runElementData = function (_1) {
    return function (_2) {
        return _1.values[0](_2);
    };
};
var mkForEachData = function (arr) {
    return function (attrs) {
        return function (body) {
            return function (a) {
                return MkForEachData(function (f) {
                    return f(arr)(attrs)(body)(a);
                });
            };
        };
    };
};
var mkElementData = function (elem) {
    return function (attrs) {
        return function (children) {
            return function (k) {
                return MkElementData(function (f) {
                    return f(elem)(attrs)(children)(k);
                });
            };
        };
    };
};
var functorForEachData = function (_) {
    return {
        "__superclasses": {}, 
        "<$>": function (f) {
            return function (fed) {
                return runForEachData(fed)(function (arr) {
                    return function (attrs) {
                        return function (body) {
                            return function (k) {
                                return mkForEachData(arr)(attrs)(body)(Prelude["<<<"](Prelude.semigroupoidArr({}))(f)(k));
                            };
                        };
                    };
                });
            };
        }
    };
};
var functorElementData = function (_) {
    return {
        "__superclasses": {}, 
        "<$>": function (f) {
            return function (ed) {
                return runElementData(ed)(function (elem) {
                    return function (attrs) {
                        return function (children) {
                            return function (k) {
                                return mkElementData(elem)(attrs)(children)(Prelude["<<<"](Prelude.semigroupoidArr({}))(f)(k));
                            };
                        };
                    };
                });
            };
        }
    };
};
var functorHtmlF = function (_) {
    return {
        "__superclasses": {}, 
        "<$>": function (_1) {
            return function (_2) {
                if (_2.ctor === "Data.DOM.Element") {
                    return Element(Prelude["<$>"](functorElementData({}))(_1)(_2.values[0]));
                };
                if (_2.ctor === "Data.DOM.Text") {
                    return Text(_2.values[0])(_1(_2.values[1]));
                };
                if (_2.ctor === "Data.DOM.Label") {
                    return Label(_2.values[0])(_2.values[1])(Prelude["<<<"](Prelude.semigroupoidArr({}))(_1)(_2.values[2]));
                };
                if (_2.ctor === "Data.DOM.TextBox") {
                    return TextBox(_2.values[0])(_2.values[1])(Prelude["<<<"](Prelude.semigroupoidArr({}))(_1)(_2.values[2]));
                };
                if (_2.ctor === "Data.DOM.CheckBox") {
                    return CheckBox(_2.values[0])(_2.values[1])(Prelude["<<<"](Prelude.semigroupoidArr({}))(_1)(_2.values[2]));
                };
                if (_2.ctor === "Data.DOM.Button") {
                    return Button(_2.values[0])(_2.values[1])(_2.values[2])(Prelude["<<<"](Prelude.semigroupoidArr({}))(_1)(_2.values[3]));
                };
                if (_2.ctor === "Data.DOM.ForEach") {
                    return ForEach(Prelude["<$>"](functorForEachData({}))(_1)(_2.values[0]));
                };
                throw "Failed pattern match";
            };
        }
    };
};
var text = function (s) {
    return Control_Monad_Free.liftF(functorHtmlF({}))(Control_Monad_Free.monadFree(functorHtmlF({})))(Control_Monad_Free.monadFreeFree(functorHtmlF({})))(Text(s)({}));
};
var label = function (c) {
    return function (attrs) {
        return Control_Monad_Free.liftF(functorHtmlF({}))(Control_Monad_Free.monadFree(functorHtmlF({})))(Control_Monad_Free.monadFreeFree(functorHtmlF({})))(Label(c)(attrs)(function (s) {
            return s;
        }));
    };
};
var textBox = function ($$var) {
    return function (attrs) {
        return Control_Monad_Free.liftF(functorHtmlF({}))(Control_Monad_Free.monadFree(functorHtmlF({})))(Control_Monad_Free.monadFreeFree(functorHtmlF({})))(TextBox($$var)(attrs)(function (s) {
            return s;
        }));
    };
};
var forEach = function (arr) {
    return function (attrs) {
        return function (body) {
            return Control_Monad_Free.liftF(functorHtmlF({}))(Control_Monad_Free.monadFree(functorHtmlF({})))(Control_Monad_Free.monadFreeFree(functorHtmlF({})))(ForEach(mkForEachData(arr)(attrs)(body)(function (s) {
                return s;
            })));
        };
    };
};
var element = function (elem) {
    return function (attrs) {
        return function (children) {
            return Control_Monad_Free.liftF(functorHtmlF({}))(Control_Monad_Free.monadFree(functorHtmlF({})))(Control_Monad_Free.monadFreeFree(functorHtmlF({})))(Element(mkElementData(elem)(attrs)(children)(function (b) {
                return b;
            })));
        };
    };
};
var checkBox = function ($$var) {
    return function (attrs) {
        return Control_Monad_Free.liftF(functorHtmlF({}))(Control_Monad_Free.monadFree(functorHtmlF({})))(Control_Monad_Free.monadFreeFree(functorHtmlF({})))(CheckBox($$var)(attrs)(function (s) {
            return s;
        }));
    };
};
var button = function (text) {
    return function (attrs) {
        return function (action) {
            return Control_Monad_Free.liftF(functorHtmlF({}))(Control_Monad_Free.monadFree(functorHtmlF({})))(Control_Monad_Free.monadFreeFree(functorHtmlF({})))(Button(text)(attrs)(action)(function (s) {
                return s;
            }));
        };
    };
};
module.exports = {
    Element: Element, 
    Text: Text, 
    Label: Label, 
    TextBox: TextBox, 
    CheckBox: CheckBox, 
    Button: Button, 
    ForEach: ForEach, 
    MkForEachData: MkForEachData, 
    MkElementData: MkElementData, 
    Attribute: Attribute, 
    button: button, 
    forEach: forEach, 
    checkBox: checkBox, 
    textBox: textBox, 
    label: label, 
    text: text, 
    element: element, 
    runForEachData: runForEachData, 
    mkForEachData: mkForEachData, 
    runElementData: runElementData, 
    mkElementData: mkElementData, 
    functorElementData: functorElementData, 
    functorForEachData: functorForEachData, 
    functorHtmlF: functorHtmlF
};
},{"Control.Monad.Free":7,"Prelude":27}],16:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Left = function (value0) {
    return {
        ctor: "Data.Either.Left", 
        values: [ value0 ]
    };
};
var Right = function (value0) {
    return {
        ctor: "Data.Either.Right", 
        values: [ value0 ]
    };
};
var showEither = function (__dict_Show_0) {
    return function (__dict_Show_1) {
        return {
            "__superclasses": {}, 
            show: function (_1) {
                if (_1.ctor === "Data.Either.Left") {
                    return "Left " + Prelude.show(__dict_Show_0)(_1.values[0]);
                };
                if (_1.ctor === "Data.Either.Right") {
                    return "Right " + Prelude.show(__dict_Show_1)(_1.values[0]);
                };
                throw "Failed pattern match";
            }
        };
    };
};
var functorEither = function (_) {
    return {
        "__superclasses": {}, 
        "<$>": function (_1) {
            return function (_2) {
                if (_2.ctor === "Data.Either.Left") {
                    return Left(_2.values[0]);
                };
                if (_2.ctor === "Data.Either.Right") {
                    return Right(_1(_2.values[0]));
                };
                throw "Failed pattern match";
            };
        }
    };
};
var eqEither = function (__dict_Eq_2) {
    return function (__dict_Eq_3) {
        return {
            "__superclasses": {}, 
            "==": function (_1) {
                return function (_2) {
                    if (_1.ctor === "Data.Either.Left") {
                        if (_2.ctor === "Data.Either.Left") {
                            return Prelude["=="](__dict_Eq_2)(_1.values[0])(_2.values[0]);
                        };
                    };
                    if (_1.ctor === "Data.Either.Right") {
                        if (_2.ctor === "Data.Either.Right") {
                            return Prelude["=="](__dict_Eq_3)(_1.values[0])(_2.values[0]);
                        };
                    };
                    return false;
                };
            }, 
            "/=": function (a) {
                return function (b) {
                    return !Prelude["=="](eqEither(__dict_Eq_2)(__dict_Eq_3))(a)(b);
                };
            }
        };
    };
};
var either = function (_1) {
    return function (_2) {
        return function (_3) {
            if (_3.ctor === "Data.Either.Left") {
                return _1(_3.values[0]);
            };
            if (_3.ctor === "Data.Either.Right") {
                return _2(_3.values[0]);
            };
            throw "Failed pattern match";
        };
    };
};
var isLeft = either(Prelude["const"](true))(Prelude["const"](false));
var isRight = either(Prelude["const"](false))(Prelude["const"](true));
var applyEither = function (_) {
    return {
        "__superclasses": {
            "Prelude.Functor_0": function (_) {
                return functorEither({});
            }
        }, 
        "<*>": function (_1) {
            return function (_2) {
                if (_1.ctor === "Data.Either.Left") {
                    return Left(_1.values[0]);
                };
                if (_1.ctor === "Data.Either.Right") {
                    return Prelude["<$>"](functorEither({}))(_1.values[0])(_2);
                };
                throw "Failed pattern match";
            };
        }
    };
};
var bindEither = function (_) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyEither({});
            }
        }, 
        ">>=": either(function (e) {
            return function (_) {
                return Left(e);
            };
        })(function (a) {
            return function (f) {
                return f(a);
            };
        })
    };
};
var applicativeEither = function (_) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyEither({});
            }
        }, 
        pure: Right
    };
};
var monadEither = function (_) {
    return {
        "__superclasses": {
            "Prelude.Applicative_0": function (_) {
                return applicativeEither({});
            }, 
            "Prelude.Bind_1": function (_) {
                return bindEither({});
            }
        }
    };
};
module.exports = {
    Left: Left, 
    Right: Right, 
    isRight: isRight, 
    isLeft: isLeft, 
    either: either, 
    functorEither: functorEither, 
    applyEither: applyEither, 
    applicativeEither: applicativeEither, 
    bindEither: bindEither, 
    monadEither: monadEither, 
    showEither: showEither, 
    eqEither: eqEither
};
},{"Prelude":27}],17:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Ref = function (value0) {
    return {
        ctor: "Data.Eq.Ref", 
        values: [ value0 ]
    };
};
var liftRef = function (_1) {
    return function (_2) {
        return function (_3) {
            return _1(_2.values[0])(_3.values[0]);
        };
    };
};
var eqRef = function (_) {
    return {
        "__superclasses": {}, 
        "==": liftRef(Prelude.refEq), 
        "/=": liftRef(Prelude.refIneq)
    };
};
module.exports = {
    Ref: Ref, 
    liftRef: liftRef, 
    eqRef: eqRef
};
},{"Prelude":27}],18:[function(require,module,exports){
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
},{"Control.Applicative":2,"Data.Array":11,"Data.Maybe":20,"Data.Monoid":21,"Prelude":27}],19:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Data_Either = require("Data.Either");
var Data_Traversable = require("Data.Traversable");
var Data_Tuple = require("Data.Tuple");
var Data_Array = require("Data.Array");
var Data_Maybe = require("Data.Maybe");
var ForeignParser = function (value0) {
    return {
        ctor: "Data.Foreign.ForeignParser", 
        values: [ value0 ]
    };
};
function fromString (str) {   try {     return Data_Either.Right(JSON.parse(str));   } catch (e) {     return Data_Either.Left(e.toString());   } };
function readPrimType (typeName) {   return function (value) {     if (toString.call(value) == '[object ' + typeName + ']') {       return Data_Either.Right(value);    }     return Data_Either.Left('Value is not a ' + typeName + '');   }; };
function readMaybeImpl (value) {   return value === undefined || value === null ? Data_Maybe.Nothing : Data_Maybe.Just(value); };
function readPropImpl (k) {   return function (obj) {     return Data_Either.Right(obj[k]);  }; };
var showForeignImpl = JSON.stringify;;
function read(dict) {
    return dict["read"];
};
var showForeign = function (_) {
    return {
        "__superclasses": {}, 
        show: showForeignImpl
    };
};
var readString = function (_) {
    return {
        "__superclasses": {}, 
        read: ForeignParser(readPrimType("String"))
    };
};
var readNumber = function (_) {
    return {
        "__superclasses": {}, 
        read: ForeignParser(readPrimType("Number"))
    };
};
var readBoolean = function (_) {
    return {
        "__superclasses": {}, 
        read: ForeignParser(readPrimType("Boolean"))
    };
};
var parseForeign = function (_1) {
    return function (_2) {
        return _1.values[0](_2);
    };
};
var parseJSON = function (__dict_ReadForeign_0) {
    return function (json) {
        return Prelude[">>="](Data_Either.bindEither({}))(fromString(json))(parseForeign(read(__dict_ReadForeign_0)));
    };
};
var functorForeignParser = function (_) {
    return {
        "__superclasses": {}, 
        "<$>": function (_1) {
            return function (_2) {
                return ForeignParser(function (x) {
                    return Prelude["<$>"](Data_Either.functorEither({}))(_1)(_2.values[0](x));
                });
            };
        }
    };
};
var applyForeignParser = function (_) {
    return {
        "__superclasses": {
            "Prelude.Functor_0": function (_) {
                return functorForeignParser({});
            }
        }, 
        "<*>": function (_1) {
            return function (_2) {
                return (function (_3, _4) {
                    return ForeignParser(function (x) {
                        return (function (_1) {
                            if (_1.ctor === "Data.Either.Left") {
                                return Data_Either.Left(_1.values[0]);
                            };
                            if (_1.ctor === "Data.Either.Right") {
                                return Prelude["<$>"](Data_Either.functorEither({}))(_1.values[0])(_4.values[0](x));
                            };
                            throw "Failed pattern match";
                        })(_3.values[0](x));
                    });
                })(_1, _2);
            };
        }
    };
};
var bindForeignParser = function (_) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyForeignParser({});
            }
        }, 
        ">>=": function (_1) {
            return function (_2) {
                return (function (_3, _4) {
                    return ForeignParser(function (x) {
                        return (function (_1) {
                            if (_1.ctor === "Data.Either.Left") {
                                return Data_Either.Left(_1.values[0]);
                            };
                            if (_1.ctor === "Data.Either.Right") {
                                return parseForeign(_4(_1.values[0]))(x);
                            };
                            throw "Failed pattern match";
                        })(_3.values[0](x));
                    });
                })(_1, _2);
            };
        }
    };
};
var prop = function (__dict_ReadForeign_1) {
    return function (p) {
        return Prelude[">>="](bindForeignParser({}))(ForeignParser(function (x) {
            return readPropImpl(p)(x);
        }))(function (x) {
            return ForeignParser(function (_) {
                return (function (_1) {
                    if (_1.ctor === "Data.Either.Right") {
                        return Data_Either.Right(_1.values[0]);
                    };
                    if (_1.ctor === "Data.Either.Left") {
                        return Data_Either.Left("Error reading property '" + p + "':\n" + _1.values[0]);
                    };
                    throw "Failed pattern match";
                })(parseForeign(read(__dict_ReadForeign_1))(x));
            });
        });
    };
};
var readArray = function (__dict_ReadForeign_2) {
    return {
        "__superclasses": {}, 
        read: (function () {
            var arrayItem = function (_1) {
                return (function (_2) {
                    return (function (_1) {
                        if (_1.ctor === "Data.Either.Right") {
                            return Data_Either.Right(_1.values[0]);
                        };
                        if (_1.ctor === "Data.Either.Left") {
                            return Data_Either.Left("Error reading item at index " + Prelude.show(Prelude.showNumber({}))(_2.values[0]) + ":\n" + _1.values[0]);
                        };
                        throw "Failed pattern match";
                    })(parseForeign(read(__dict_ReadForeign_2))(_2.values[1]));
                })(_1);
            };
            return Prelude[">>="](bindForeignParser({}))(ForeignParser(readPrimType("Array")))(function (xs) {
                return ForeignParser(function (_) {
                    return Data_Traversable.traverse(Data_Traversable.traversableArray({}))(Data_Either.functorEither({}))(Data_Either.applicativeEither({}))(arrayItem)(Data_Tuple.zip(Data_Array.range(0)(Data_Array.length(xs)))(xs));
                });
            });
        })()
    };
};
var readMaybe = function (__dict_ReadForeign_3) {
    return {
        "__superclasses": {}, 
        read: Prelude[">>="](bindForeignParser({}))(ForeignParser(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Either.Right)(readMaybeImpl)))(function (x) {
            return ForeignParser(function (_) {
                if (x.ctor === "Data.Maybe.Just") {
                    return Prelude[">>="](Data_Either.bindEither({}))(parseForeign(read(__dict_ReadForeign_3))(x.values[0]))(Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude["return"](Data_Either.monadEither({})))(Data_Maybe.Just));
                };
                if (x.ctor === "Data.Maybe.Nothing") {
                    return Prelude["return"](Data_Either.monadEither({}))(Data_Maybe.Nothing);
                };
                throw "Failed pattern match";
            });
        })
    };
};
var applicativeForeignParser = function (_) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyForeignParser({});
            }
        }, 
        pure: function (x) {
            return ForeignParser(function (_) {
                return Data_Either.Right(x);
            });
        }
    };
};
var monadForeignParser = function (_) {
    return {
        "__superclasses": {
            "Prelude.Applicative_0": function (_) {
                return applicativeForeignParser({});
            }, 
            "Prelude.Bind_1": function (_) {
                return bindForeignParser({});
            }
        }
    };
};
module.exports = {
    ForeignParser: ForeignParser, 
    prop: prop, 
    read: read, 
    parseJSON: parseJSON, 
    parseForeign: parseForeign, 
    showForeign: showForeign, 
    functorForeignParser: functorForeignParser, 
    bindForeignParser: bindForeignParser, 
    applyForeignParser: applyForeignParser, 
    applicativeForeignParser: applicativeForeignParser, 
    monadForeignParser: monadForeignParser, 
    readString: readString, 
    readNumber: readNumber, 
    readBoolean: readBoolean, 
    readArray: readArray, 
    readMaybe: readMaybe
};
},{"Data.Array":11,"Data.Either":16,"Data.Maybe":20,"Data.Traversable":22,"Data.Tuple":23,"Prelude":27}],20:[function(require,module,exports){
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
},{"Prelude":27}],21:[function(require,module,exports){
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
},{"Prelude":27}],22:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Data_Tuple = require("Data.Tuple");
var Data_Eq = require("Data.Eq");
var Data_Maybe = require("Data.Maybe");
var Data_Either = require("Data.Either");
var Data_Array = require("Data.Array");
function traverse(dict) {
    return dict["traverse"];
};
function sequence(dict) {
    return dict["sequence"];
};
var traversableTuple = function (_) {
    return {
        "__superclasses": {}, 
        traverse: function (__dict_Functor_2) {
            return function (__dict_Applicative_3) {
                return function (_1) {
                    return function (_2) {
                        return Prelude["<$>"](__dict_Functor_2)(Data_Tuple.Tuple(_2.values[0]))(_1(_2.values[1]));
                    };
                };
            };
        }, 
        sequence: function (__dict_Functor_4) {
            return function (__dict_Applicative_5) {
                return function (_1) {
                    return Prelude["<$>"](__dict_Functor_4)(Data_Tuple.Tuple(_1.values[0]))(_1.values[1]);
                };
            };
        }
    };
};
var traversableRef = function (_) {
    return {
        "__superclasses": {}, 
        traverse: function (__dict_Functor_6) {
            return function (__dict_Applicative_7) {
                return function (_1) {
                    return function (_2) {
                        return Prelude["<$>"](__dict_Functor_6)(Data_Eq.Ref)(_1(_2.values[0]));
                    };
                };
            };
        }, 
        sequence: function (__dict_Functor_8) {
            return function (__dict_Applicative_9) {
                return function (_1) {
                    return Prelude["<$>"](__dict_Functor_8)(Data_Eq.Ref)(_1.values[0]);
                };
            };
        }
    };
};
var traversableMaybe = function (_) {
    return {
        "__superclasses": {}, 
        traverse: function (__dict_Functor_10) {
            return function (__dict_Applicative_11) {
                return function (_1) {
                    return function (_2) {
                        if (_2.ctor === "Data.Maybe.Nothing") {
                            return Prelude.pure(__dict_Applicative_11)(Data_Maybe.Nothing);
                        };
                        if (_2.ctor === "Data.Maybe.Just") {
                            return Prelude["<$>"](__dict_Functor_10)(Data_Maybe.Just)(_1(_2.values[0]));
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        }, 
        sequence: function (__dict_Functor_12) {
            return function (__dict_Applicative_13) {
                return function (_1) {
                    if (_1.ctor === "Data.Maybe.Nothing") {
                        return Prelude.pure(__dict_Applicative_13)(Data_Maybe.Nothing);
                    };
                    if (_1.ctor === "Data.Maybe.Just") {
                        return Prelude["<$>"](__dict_Functor_12)(Data_Maybe.Just)(_1.values[0]);
                    };
                    throw "Failed pattern match";
                };
            };
        }
    };
};
var traversableEither = function (_) {
    return {
        "__superclasses": {}, 
        traverse: function (__dict_Functor_14) {
            return function (__dict_Applicative_15) {
                return function (_1) {
                    return function (_2) {
                        if (_2.ctor === "Data.Either.Left") {
                            return Prelude.pure(__dict_Applicative_15)(Data_Either.Left(_2.values[0]));
                        };
                        if (_2.ctor === "Data.Either.Right") {
                            return Prelude["<$>"](__dict_Functor_14)(Data_Either.Right)(_1(_2.values[0]));
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        }, 
        sequence: function (__dict_Functor_16) {
            return function (__dict_Applicative_17) {
                return function (_1) {
                    if (_1.ctor === "Data.Either.Left") {
                        return Prelude.pure(__dict_Applicative_17)(Data_Either.Left(_1.values[0]));
                    };
                    if (_1.ctor === "Data.Either.Right") {
                        return Prelude["<$>"](__dict_Functor_16)(Data_Either.Right)(_1.values[0]);
                    };
                    throw "Failed pattern match";
                };
            };
        }
    };
};
var traversableArray = function (_) {
    return {
        "__superclasses": {}, 
        traverse: function (__dict_Functor_18) {
            return function (__dict_Applicative_19) {
                return function (_1) {
                    return function (_2) {
                        if (_2.length === 0) {
                            return Prelude.pure(__dict_Applicative_19)([  ]);
                        };
                        if (_2.length > 0) {
                            var _6 = _2.slice(1);
                            return Prelude["<*>"](__dict_Applicative_19["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"](__dict_Functor_18)(Prelude[":"])(_1(_2[0])))(traverse(traversableArray({}))(__dict_Functor_18)(__dict_Applicative_19)(_1)(_6));
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        }, 
        sequence: function (__dict_Functor_20) {
            return function (__dict_Applicative_21) {
                return function (_1) {
                    if (_1.length === 0) {
                        return Prelude.pure(__dict_Applicative_21)([  ]);
                    };
                    if (_1.length > 0) {
                        var _4 = _1.slice(1);
                        return Prelude["<*>"](__dict_Applicative_21["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"](__dict_Functor_20)(Prelude[":"])(_1[0]))(sequence(traversableArray({}))(__dict_Functor_20)(__dict_Applicative_21)(_4));
                    };
                    throw "Failed pattern match";
                };
            };
        }
    };
};
var zipWithA = function (__dict_Functor_0) {
    return function (__dict_Applicative_1) {
        return function (f) {
            return function (xs) {
                return function (ys) {
                    return sequence(traversableArray({}))(__dict_Functor_0)(__dict_Applicative_1)(Data_Array.zipWith(f)(xs)(ys));
                };
            };
        };
    };
};
var $$for = function (__dict_Functor_22) {
    return function (__dict_Applicative_23) {
        return function (__dict_Traversable_24) {
            return function (x) {
                return function (f) {
                    return traverse(__dict_Traversable_24)(__dict_Functor_22)(__dict_Applicative_23)(f)(x);
                };
            };
        };
    };
};
module.exports = {
    zipWithA: zipWithA, 
    "for": $$for, 
    sequence: sequence, 
    traverse: traverse, 
    traversableArray: traversableArray, 
    traversableEither: traversableEither, 
    traversableRef: traversableRef, 
    traversableMaybe: traversableMaybe, 
    traversableTuple: traversableTuple
};
},{"Data.Array":11,"Data.Either":16,"Data.Eq":17,"Data.Maybe":20,"Data.Tuple":23,"Prelude":27}],23:[function(require,module,exports){
"use strict";
var Data_Array = require("Data.Array");
var Prelude = require("Prelude");
var Data_Monoid = require("Data.Monoid");
var Tuple = function (value0) {
    return function (value1) {
        return {
            ctor: "Data.Tuple.Tuple", 
            values: [ value0, value1 ]
        };
    };
};
var zip = Data_Array.zipWith(Tuple);
var unzip = function (_1) {
    return (function (_2) {
        if (_2.length > 0) {
            var _4 = _2.slice(1);
            return (function (_1) {
                return Tuple(Prelude[":"]((_2[0]).values[0])(_1.values[0]))(Prelude[":"]((_2[0]).values[1])(_1.values[1]));
            })(unzip(_4));
        };
        if (_2.length === 0) {
            return Tuple([  ])([  ]);
        };
        throw "Failed pattern match";
    })(_1);
};
var uncurry = function (_1) {
    return function (_2) {
        return _1(_2.values[0])(_2.values[1]);
    };
};
var swap = function (_1) {
    return Tuple(_1.values[1])(_1.values[0]);
};
var snd = function (_1) {
    return _1.values[1];
};
var showTuple = function (__dict_Show_0) {
    return function (__dict_Show_1) {
        return {
            "__superclasses": {}, 
            show: function (_1) {
                return "Tuple(" + Prelude.show(__dict_Show_0)(_1.values[0]) + ", " + Prelude.show(__dict_Show_1)(_1.values[1]) + ")";
            }
        };
    };
};
var functorTuple = function (_) {
    return {
        "__superclasses": {}, 
        "<$>": function (_1) {
            return function (_2) {
                return Tuple(_2.values[0])(_1(_2.values[1]));
            };
        }
    };
};
var fst = function (_1) {
    return _1.values[0];
};
var eqTuple = function (__dict_Eq_5) {
    return function (__dict_Eq_6) {
        return {
            "__superclasses": {}, 
            "==": function (_1) {
                return function (_2) {
                    return Prelude["=="](__dict_Eq_5)(_1.values[0])(_2.values[0]) && Prelude["=="](__dict_Eq_6)(_1.values[1])(_2.values[1]);
                };
            }, 
            "/=": function (t1) {
                return function (t2) {
                    return !Prelude["=="](eqTuple(__dict_Eq_5)(__dict_Eq_6))(t1)(t2);
                };
            }
        };
    };
};
var ordTuple = function (__dict_Ord_2) {
    return function (__dict_Ord_3) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqTuple(__dict_Ord_2["__superclasses"]["Prelude.Eq_0"]({}))(__dict_Ord_3["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_1) {
                return function (_2) {
                    return (function (_3, _4) {
                        return (function (_1) {
                            if (_1.ctor === "Prelude.EQ") {
                                return Prelude.compare(__dict_Ord_3)(_3.values[1])(_4.values[1]);
                            };
                            return _1;
                        })(Prelude.compare(__dict_Ord_2)(_3.values[0])(_4.values[0]));
                    })(_1, _2);
                };
            }
        };
    };
};
var curry = function (f) {
    return function (a) {
        return function (b) {
            return f(Tuple(a)(b));
        };
    };
};
var applyTuple = function (__dict_Semigroup_8) {
    return {
        "__superclasses": {
            "Prelude.Functor_0": function (_) {
                return functorTuple({});
            }
        }, 
        "<*>": function (_1) {
            return function (_2) {
                return Tuple(Prelude["<>"](__dict_Semigroup_8)(_1.values[0])(_2.values[0]))(_1.values[1](_2.values[1]));
            };
        }
    };
};
var bindTuple = function (__dict_Semigroup_7) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyTuple(__dict_Semigroup_7);
            }
        }, 
        ">>=": function (_1) {
            return function (_2) {
                return (function (_3, _4) {
                    return (function (_1) {
                        return Tuple(Prelude["<>"](__dict_Semigroup_7)(_3.values[0])(_1.values[0]))(_1.values[1]);
                    })(_4(_3.values[1]));
                })(_1, _2);
            };
        }
    };
};
var applicativeTuple = function (__dict_Monoid_9) {
    return {
        "__superclasses": {
            "Prelude.Apply_0": function (_) {
                return applyTuple(__dict_Monoid_9["__superclasses"]["Prelude.Semigroup_0"]({}));
            }
        }, 
        pure: Tuple(Data_Monoid.mempty(__dict_Monoid_9))
    };
};
var monadTuple = function (__dict_Monoid_4) {
    return {
        "__superclasses": {
            "Prelude.Applicative_0": function (_) {
                return applicativeTuple(__dict_Monoid_4);
            }, 
            "Prelude.Bind_1": function (_) {
                return bindTuple(__dict_Monoid_4["__superclasses"]["Prelude.Semigroup_0"]({}));
            }
        }
    };
};
module.exports = {
    Tuple: Tuple, 
    swap: swap, 
    unzip: unzip, 
    zip: zip, 
    uncurry: uncurry, 
    curry: curry, 
    snd: snd, 
    fst: fst, 
    showTuple: showTuple, 
    eqTuple: eqTuple, 
    ordTuple: ordTuple, 
    functorTuple: functorTuple, 
    applyTuple: applyTuple, 
    applicativeTuple: applicativeTuple, 
    bindTuple: bindTuple, 
    monadTuple: monadTuple
};
},{"Data.Array":11,"Data.Monoid":21,"Prelude":27}],24:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Control_Monad_Free = require("Control.Monad.Free");
var Data_DOM = require("Data.DOM");
var Data_DOM_Elements = require("Data.DOM.Elements");
var Data_DOM_Attributes = require("Data.DOM.Attributes");
var Control_Monad_Eff = require("Control.Monad.Eff");
var Control_Monad_JQuery = require("Control.Monad.JQuery");
var Data_DOM_Render_JQuery = require("Data.DOM.Render.JQuery");
var example = Prelude[">>="](Control_Monad_Free.bindFree(Data_DOM.functorHtmlF({})))(Data_DOM_Elements.div([  ])(Prelude[">>="](Control_Monad_Free.bindFree(Data_DOM.functorHtmlF({})))(Data_DOM.text("Here is some text, "))(function (_) {
    return Data_DOM.text("and here is some more text.");
})))(function (_) {
    return Prelude[">>="](Control_Monad_Free.bindFree(Data_DOM.functorHtmlF({})))(Data_DOM_Elements.p([  ])(Data_DOM.text("This is a paragraph.")))(function (_) {
        return Data_DOM_Elements.ul([ Data_DOM_Attributes.style("color: red;") ])(Prelude[">>="](Control_Monad_Free.bindFree(Data_DOM.functorHtmlF({})))(Data_DOM_Elements.li([  ])(Data_DOM.text("This is ...")))(function (_) {
            return Data_DOM_Elements.li([  ])(Data_DOM.text("... a red list."));
        }));
    });
});
var main = function __do() {
    var _1 = Control_Monad_JQuery.select("body")();
    return Data_DOM_Render_JQuery.renderJQuery(_1)(example)();
};
module.exports = {
    main: main, 
    example: example
};
},{"Control.Monad.Eff":6,"Control.Monad.Free":7,"Control.Monad.JQuery":8,"Data.DOM":15,"Data.DOM.Attributes":12,"Data.DOM.Elements":13,"Data.DOM.Render.JQuery":14,"Prelude":27}],25:[function(require,module,exports){
"use strict";
var Example0 = require("Example0");
var main = Example0.main;
module.exports = {
    main: main
};
},{"Example0":24}],26:[function(require,module,exports){
"use strict";
function unsafeIndex(xs) {  return function(n) {    return xs[n];  };};
module.exports = {
    unsafeIndex: unsafeIndex
};
},{}],27:[function(require,module,exports){
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