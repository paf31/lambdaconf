module Underscore where

import Prelude ()

foreign import map
  "function map(f) {\
  \  return function (arr) {\
  \    return require('underscore').map(arr, f);\
  \  };\
  \}" :: forall a b. (a -> b) -> [a] -> [b]

foreign import reduce
  "function reduce(f) {\
  \  return function (memo) {\
  \    return function (arr) {\
  \      return require('underscore').reduce(arr, function(memo, a) {\
  \        return f(memo)(a);\
  \      }, memo);\
  \    };\
  \  };\
  \}" :: forall a b. (a -> b -> a) -> a -> [b] -> a

foreign import reduceRight
  "function reduceRight(f) {\
  \  return function (memo) {\
  \    return function (arr) {\
  \      return require('underscore').reduceRight(arr, function(memo, a) {\
  \        return f(memo)(a);\
  \      }, memo);\
  \    };\
  \  };\
  \}" :: forall a b. (a -> b -> a) -> a -> [b] -> a

foreign import data Undefined :: * -> *

foreign import isDefined 
  "function isDefined(a) {\
  \  return a !== undefined; \
  \}" :: forall a. Undefined a -> Boolean

foreign import unsafeGetDefinedValue
  "function unsafeGetDefinedValue(a) {\
  \  return a; \
  \}" :: forall a. Undefined a -> a

foreign import find
  "function find(f) {\
  \  return function (arr) {\
  \    return require('underscore').find(arr, f);\
  \  };\
  \}" :: forall a. (a -> Boolean) -> [a] -> Undefined a

foreign import filter
  "function filter(f) {\
  \  return function (arr) {\
  \    return require('underscore').filter(arr, f);\
  \  };\
  \}" :: forall a. (a -> Boolean) -> [a] -> [a]

foreign import contains
  "function contains(a) {\
  \  return function (arr) {\
  \    return require('underscore').contains(arr, a);\
  \  };\
  \}" :: forall a. a -> [a] -> Boolean

foreign import sortBy
  "function sortBy(f) {\
  \  return function (arr) {\
  \    return require('underscore').sortBy(arr, f);\
  \  };\
  \}" :: forall a. (a -> Number) -> [a] -> [a]

foreign import shuffle
  "function shuffle(arr) {\
  \  return require('underscore').shuffle(arr);\
  \}" :: forall a. [a] -> [a]

foreign import uniq
  "function uniq(arr) {\
  \  return require('underscore').uniq(arr);\
  \}" :: forall a. [a] -> [a]

