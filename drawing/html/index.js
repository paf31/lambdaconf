(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.onload = function() {
  require("Main").main();
};

},{"Main":12}],2:[function(require,module,exports){
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
},{"Prelude":15}],3:[function(require,module,exports){
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
},{"Data.Maybe":6,"Prelude":15,"Prelude.Unsafe":14}],4:[function(require,module,exports){
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
},{"Prelude":15}],5:[function(require,module,exports){
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
},{"Prelude":15}],6:[function(require,module,exports){
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
},{"Prelude":15}],7:[function(require,module,exports){
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
},{"Prelude":15}],8:[function(require,module,exports){
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
},{"Data.Array":3,"Data.Either":4,"Data.Eq":5,"Data.Maybe":6,"Data.Tuple":9,"Prelude":15}],9:[function(require,module,exports){
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
},{"Data.Array":3,"Data.Monoid":7,"Prelude":15}],10:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Data_Array = require("Data.Array");
var Graphics_Canvas = require("Graphics.Canvas");
var Control_Monad_Eff = require("Control.Monad.Eff");
var Data_Traversable = require("Data.Traversable");
var Math = require("Math");
var Path = function (value0) {
    return {
        ctor: "Graphics.Canvas.Drawing.Path", 
        values: [ value0 ]
    };
};
var Rectangle = function (value0) {
    return {
        ctor: "Graphics.Canvas.Drawing.Rectangle", 
        values: [ value0 ]
    };
};
var Arc = function (value0) {
    return {
        ctor: "Graphics.Canvas.Drawing.Arc", 
        values: [ value0 ]
    };
};
var Composite = function (value0) {
    return {
        ctor: "Graphics.Canvas.Drawing.Composite", 
        values: [ value0 ]
    };
};
var Scaled = function (value0) {
    return function (value1) {
        return {
            ctor: "Graphics.Canvas.Drawing.Scaled", 
            values: [ value0, value1 ]
        };
    };
};
var semigroupDrawing = function (_) {
    return {
        "__superclasses": {}, 
        "<>": function (_1) {
            return function (_2) {
                if (_1.ctor === "Graphics.Canvas.Drawing.Composite") {
                    return Composite(Prelude["<>"](Data_Array.semigroupArray({}))(_1.values[0])([ _2 ]));
                };
                if (_2.ctor === "Graphics.Canvas.Drawing.Composite") {
                    return Composite(Prelude[":"](_1)(_2.values[0]));
                };
                return Composite([ _1, _2 ]);
            };
        }
    };
};
var renderIn = function (box) {
    return function (ctx) {
        return function (drawing) {
            var go = function (_2) {
                if (_2.ctor === "Graphics.Canvas.Drawing.Path") {
                    if ((_2.values[0]).length > 0) {
                        var _6 = (_2.values[0]).slice(1);
                        return Graphics_Canvas.fillPath(ctx)(function __do() {
                            Graphics_Canvas.moveTo(ctx)((_2.values[0][0]).values[0])((_2.values[0][0]).values[1])();
                            Data_Traversable["for"](Control_Monad_Eff.functorEff({}))(Control_Monad_Eff.applicativeEff({}))(Data_Traversable.traversableArray({}))(_6)(function (_1) {
                                return Graphics_Canvas.lineTo(ctx)(_1.values[0])(_1.values[1]);
                            })();
                            return ctx;
                        });
                    };
                };
                if (_2.ctor === "Graphics.Canvas.Drawing.Rectangle") {
                    return Graphics_Canvas.fillRect(ctx)(_2.values[0]);
                };
                if (_2.ctor === "Graphics.Canvas.Drawing.Arc") {
                    return Graphics_Canvas.fillPath(ctx)(Graphics_Canvas.arc(ctx)(_2.values[0]));
                };
                if (_2.ctor === "Graphics.Canvas.Drawing.Composite") {
                    return function __do() {
                        Data_Traversable.traverse(Data_Traversable.traversableArray({}))(Control_Monad_Eff.functorEff({}))(Control_Monad_Eff.applicativeEff({}))(go)(_2.values[0])();
                        return ctx;
                    };
                };
                if (_2.ctor === "Graphics.Canvas.Drawing.Scaled") {
                    return renderIn(_2.values[0])(ctx)(_2.values[1]);
                };
                throw "Failed pattern match";
            };
            return Graphics_Canvas.withContext(ctx)((function () {
                var offsetX = (box.w > box.h) ? box.x : box.x + (box.h - box.w) / 2;
                return (function () {
                    var offsetY = (box.h > box.w) ? box.y : box.y + (box.w - box.h) / 2;
                    return function __do() {
                        Graphics_Canvas.translate({
                            translateX: offsetX, 
                            translateY: offsetY
                        })(ctx)();
                        var factor = Math.min(box.w)(box.h);
                        Graphics_Canvas.scale({
                            scaleX: factor, 
                            scaleY: factor
                        })(ctx)();
                        return go(drawing)();
                    };
                })();
            })());
        };
    };
};
var monoidDrawing = function (_) {
    return {
        "__superclasses": {
            "Prelude.Semigroup_0": function (_) {
                return semigroupDrawing({});
            }
        }, 
        mempty: Composite([  ])
    };
};
var everywhere = function (_1) {
    return function (_2) {
        if (_2.ctor === "Graphics.Canvas.Drawing.Composite") {
            return _1(Composite(Data_Array.map(everywhere(_1))(_2.values[0])));
        };
        if (_2.ctor === "Graphics.Canvas.Drawing.Scaled") {
            return _1(Scaled(_2.values[0])(everywhere(_1)(_2.values[1])));
        };
        return _1(_2);
    };
};
module.exports = {
    Path: Path, 
    Rectangle: Rectangle, 
    Arc: Arc, 
    Composite: Composite, 
    Scaled: Scaled, 
    renderIn: renderIn, 
    everywhere: everywhere, 
    semigroupDrawing: semigroupDrawing, 
    monoidDrawing: monoidDrawing
};
},{"Control.Monad.Eff":2,"Data.Array":3,"Data.Traversable":8,"Graphics.Canvas":11,"Math":13,"Prelude":15}],11:[function(require,module,exports){
"use strict";
var Prelude = require("Prelude");
var Control_Monad_Eff = require("Control.Monad.Eff");
function getContext2D(c) {  return function() {    return c.getContext('2d');  };};
function setLineWidth(width) {  return function(ctx) {    return function() {      ctx.lineWidth = width;      return ctx;    };  };};
function setFillStyle(style) {  return function(ctx) {    return function() {      ctx.fillStyle = style;      return ctx;    };  };};
function setStrokeStyle(style) {  return function(ctx) {    return function() {      ctx.strokeStyle = style;      return ctx;    };  };};
function setShadowColor(color) {  return function(ctx) {    return function() {      ctx.shadowColor = color;      return ctx;    };  };};
function setShadowBlur(blur) {  return function(ctx) {    return function() {      ctx.shadowBlur = blur;      return ctx;    };  };};
function setShadowOffsetX(offset) {  return function(ctx) {    return function() {      ctx.shadowOffsetX = offsetX;      return ctx;    };  };};
function setShadowOffsetY(offsetY) {  return function(ctx) {    return function() {      ctx.shadowOffsetY = offsetY;      return ctx;    };  };};
function beginPath(ctx) {  return function() {    ctx.beginPath();    return ctx;  };};
function stroke(ctx) {  return function() {    ctx.stroke();    return ctx;  };};
function fill(ctx) {  return function() {    ctx.fill();    return ctx;  };};
function clip(ctx) {  return function() {    ctx.clip();    return ctx;  };};
function lineTo(ctx) {  return function(x) {    return function(y) {      return function() {        ctx.lineTo(x, y);        return ctx;      };    };  };};
function moveTo(ctx) {  return function(x) {    return function(y) {      return function() {        ctx.moveTo(x, y);        return ctx;      };    };  };};
function arc(ctx) {  return function(a) {    return function() {      ctx.arc(a.cx, a.cy, a.r, a.start, a.end);      return ctx;    };  };};
function rect(ctx) {  return function(r) {    return function() {      ctx.rect(r.x, r.y, r.w, r.h);      return ctx;    };  };};
function fillRect(ctx) {  return function(r) {    return function() {      ctx.fillRect(r.x, r.y, r.w, r.h);      return ctx;    };  };};
function strokeRect(ctx) {  return function(r) {    return function() {      ctx.strokeRect(r.x, r.y, r.w, r.h);      return ctx;    };  };};
function clearRect(ctx) {  return function(r) {    return function() {      ctx.clearRect(r.x, r.y, r.w, r.h);      return ctx;    };  };};
function scale(t) {  return function(ctx) {    return function() {      ctx.scale(t.scaleX, t.scaleY);      return ctx;    };  };};
function rotate(angle) {  return function(ctx) {    return function() {      ctx.rotate(angle);      return ctx;    };  };};
function translate(t) {  return function(ctx) {    return function() {      ctx.translate(t.translateX, t.translateY);      return ctx;    };  };};
function transform(t) {  return function(ctx) {    return function() {      ctx.transform(t.m11, t.m12, t.m21, t.m22, t.m31, t.m32);      return ctx;    };  };};
function save(ctx) {  return function() {    ctx.save();    return ctx;  };};
function restore(ctx) {  return function() {    ctx.restore();    return ctx;  };};
var withContext = function (ctx) {
    return function (action) {
        return function __do() {
            save(ctx)();
            var _1 = action();
            restore(ctx)();
            return _1;
        };
    };
};
var strokePath = function (ctx) {
    return function (path) {
        return function __do() {
            beginPath(ctx)();
            var _1 = path();
            stroke(ctx)();
            return _1;
        };
    };
};
var fillPath = function (ctx) {
    return function (path) {
        return function __do() {
            beginPath(ctx)();
            var _1 = path();
            fill(ctx)();
            return _1;
        };
    };
};
module.exports = {
    withContext: withContext, 
    restore: restore, 
    save: save, 
    transform: transform, 
    translate: translate, 
    rotate: rotate, 
    scale: scale, 
    clearRect: clearRect, 
    strokeRect: strokeRect, 
    fillRect: fillRect, 
    rect: rect, 
    arc: arc, 
    fillPath: fillPath, 
    strokePath: strokePath, 
    moveTo: moveTo, 
    lineTo: lineTo, 
    clip: clip, 
    fill: fill, 
    stroke: stroke, 
    beginPath: beginPath, 
    setShadowOffsetY: setShadowOffsetY, 
    setShadowOffsetX: setShadowOffsetX, 
    setShadowBlur: setShadowBlur, 
    setShadowColor: setShadowColor, 
    setStrokeStyle: setStrokeStyle, 
    setFillStyle: setFillStyle, 
    setLineWidth: setLineWidth, 
    getContext2D: getContext2D
};
},{"Control.Monad.Eff":2,"Prelude":15}],12:[function(require,module,exports){
"use strict";
var Graphics_Canvas_Drawing = require("Graphics.Canvas.Drawing");
var Prelude = require("Prelude");
var Data_Array = require("Data.Array");
var Math = require("Math");
var Data_Tuple = require("Data.Tuple");
var Control_Monad_Eff = require("Control.Monad.Eff");
var Graphics_Canvas = require("Graphics.Canvas");
function getElementById(id) {  return function() {    return document.getElementById(id);  };};
var square = Graphics_Canvas_Drawing.Rectangle({
    x: 0, 
    y: 0, 
    w: 1, 
    h: 1
});
var sineWave = Graphics_Canvas_Drawing.Path(Prelude[">>="](Data_Array.bindArray({}))(Data_Array.range(0)(100))(function (_1) {
    var y = Math.sin(((_1 / 100.0) * Math.pi) * 4);
    return Prelude["return"](Data_Array.monadArray({}))(Data_Tuple.Tuple(_1 / 100.0)(y / 4 + 0.5));
}));
var circle = Graphics_Canvas_Drawing.Arc({
    cx: 0.5, 
    cy: 0.5, 
    r: 0.5, 
    start: 0, 
    end: Math.pi * 2
});
var gasket = (function () {
    var toCircle = function (_1) {
        if (_1.ctor === "Graphics.Canvas.Drawing.Rectangle") {
            return Graphics_Canvas_Drawing.Scaled(_1.values[0])(circle);
        };
        return _1;
    };
    var squaresToCircles = Graphics_Canvas_Drawing.everywhere(toCircle);
    var quarter = function (_1) {
        if (_1.ctor === "Graphics.Canvas.Drawing.Rectangle") {
            var y$prime = (_1.values[0]).y + (_1.values[0]).h * 0.6;
            var x$prime = (_1.values[0]).x + (_1.values[0]).w * 0.6;
            var w$prime = (_1.values[0]).w * 0.4;
            var h$prime = (_1.values[0]).h * 0.4;
            return Prelude["<>"](Graphics_Canvas_Drawing.semigroupDrawing({}))(Graphics_Canvas_Drawing.Rectangle({
                x: (_1.values[0]).x, 
                y: y$prime, 
                w: w$prime, 
                h: h$prime
            }))(Prelude["<>"](Graphics_Canvas_Drawing.semigroupDrawing({}))(Graphics_Canvas_Drawing.Rectangle({
                x: x$prime, 
                y: y$prime, 
                w: w$prime, 
                h: h$prime
            }))(Graphics_Canvas_Drawing.Rectangle({
                x: x$prime, 
                y: (_1.values[0]).y, 
                w: w$prime, 
                h: h$prime
            })));
        };
        return _1;
    };
    var go = Graphics_Canvas_Drawing.everywhere(quarter);
    return Prelude["<<<"](Prelude.semigroupoidArr({}))(squaresToCircles)(Prelude["<<<"](Prelude.semigroupoidArr({}))(go)(Prelude["<<<"](Prelude.semigroupoidArr({}))(go)(Prelude["<<<"](Prelude.semigroupoidArr({}))(go)(Prelude["<<<"](Prelude.semigroupoidArr({}))(go)(go)))))(square);
})();
var snowflake = function (n) {
    var replace = function (_1) {
        if (_1.ctor === "Graphics.Canvas.Drawing.Arc") {
            return Graphics_Canvas_Drawing.Composite(Prelude.flip(Data_Array.map)(Data_Array.range(0)(n - 1))(function (i) {
                var theta = ((i / n) * Math.pi) * 2;
                return Graphics_Canvas_Drawing.Arc({
                    cx: (_1.values[0]).cx + ((_1.values[0]).r * 0.7) * Math.sin(theta), 
                    cy: (_1.values[0]).cy + ((_1.values[0]).r * 0.7) * Math.cos(theta), 
                    r: (_1.values[0]).r * 0.3, 
                    start: 0, 
                    end: Math.pi * 2
                });
            }));
        };
        return _1;
    };
    var go = Graphics_Canvas_Drawing.everywhere(replace);
    return Prelude["<<<"](Prelude.semigroupoidArr({}))(go)(Prelude["<<<"](Prelude.semigroupoidArr({}))(go)(go))(circle);
};
var bounds = {
    x: 0, 
    y: 0, 
    w: 400, 
    h: 400
};
var main = function __do() {
    var _2 = getElementById("canvas")();
    var _1 = Graphics_Canvas.getContext2D(_2)();
    Graphics_Canvas.setStrokeStyle("#000000")(_1)();
    Graphics_Canvas.setLineWidth(2.0e-2)(_1)();
    var drawing = snowflake(6);
    return Graphics_Canvas_Drawing.renderIn(bounds)(_1)(drawing)();
};
module.exports = {
    main: main, 
    sineWave: sineWave, 
    gasket: gasket, 
    snowflake: snowflake, 
    square: square, 
    circle: circle, 
    getElementById: getElementById, 
    bounds: bounds
};
},{"Control.Monad.Eff":2,"Data.Array":3,"Data.Tuple":9,"Graphics.Canvas":11,"Graphics.Canvas.Drawing":10,"Math":13,"Prelude":15}],13:[function(require,module,exports){
"use strict";
var abs = Math.abs;;
var acos = Math.acos;;
var asin = Math.asin;;
var atan = Math.atan;;
function atan2(y){  return function (x) {    return Math.atan2(y, x);  };};
var ceil = Math.ceil;;
var cos = Math.cos;;
var exp = Math.exp;;
var floor = Math.floor;;
var log = Math.log;;
function max(n1){  return function(n2) {    return Math.max(n1, n2);  }};
function min(n1){  return function(n2) {    return Math.min(n1, n2);  }};
function pow(n){  return function(p) {    return Math.pow(n, p);  }};
var round = Math.round;;
var sin = Math.sin;;
var sqrt = Math.sqrt;;
var tan = Math.tan;;
var e       = Math.E;;
var ln2     = Math.LN2;;
var ln10    = Math.LN10;;
var log2e   = Math.LOG2E;;
var log10e  = Math.LOG10E;;
var pi      = Math.PI;;
var sqrt1_2 = Math.SQRT1_2;;
var sqrt2   = Math.SQRT2;;
module.exports = {
    sqrt2: sqrt2, 
    "sqrt1_2": sqrt1_2, 
    pi: pi, 
    log10e: log10e, 
    log2e: log2e, 
    ln10: ln10, 
    ln2: ln2, 
    e: e, 
    tan: tan, 
    sqrt: sqrt, 
    sin: sin, 
    round: round, 
    pow: pow, 
    min: min, 
    max: max, 
    log: log, 
    floor: floor, 
    exp: exp, 
    cos: cos, 
    ceil: ceil, 
    atan2: atan2, 
    atan: atan, 
    asin: asin, 
    acos: acos, 
    abs: abs
};
},{}],14:[function(require,module,exports){
"use strict";
function unsafeIndex(xs) {  return function(n) {    return xs[n];  };};
module.exports = {
    unsafeIndex: unsafeIndex
};
},{}],15:[function(require,module,exports){
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