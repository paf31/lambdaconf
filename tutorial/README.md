# PureScript Tutorial

This tutorial can be run in `psci`. 

Use the `starter-kit` project to ensure that necessary libraries are available.

Executable lines of code will be prefixed with `> `:

```
> 1 + 1

  2
```

After each line, press _Return_, and finally use _Ctrl+D_ to evaluate the expression.

## Literal Values

Literal values evaluate to themselves:

```
> 10

  10

> 1.5

  1.5

> 0xFF

  255

> "Testing"

  Testing
  
> true

  true
```

Array literals are enclosed in square brackets:

```
> [1, 2, 3]

Error in declaration main
No instance found for Prelude.Show [Prim.Number]
```

This error means that `psci` does not know how to print arrays of numbers. Solve this problem by importing `Data.Array`:

```
> :i Data.Array

> [1, 2, 3]

  [1,2,3]
```

Objects are enclosed in curly braces, just like in Javascript:

```
> { foo: 1, bar: "Test" }

Error in declaration main
No instance found for Prelude.Show { foo :: Prim.Number, bar :: Prim.String }
```

Again, the REPL does not know how to print a value of this type.

Instead, assign the object to a name:

```
> let o = { foo: 1, bar: "Test" }
```

Now try evaluating its fields:

```
> o.foo
  
  1

> o.bar
  
  Test
```

Try evaluating a field which does not exist:

```
> o.baz

Error at  line 1, column 1: 
Error in declaration it
Cannot unify () with (baz :: u2160 | u2163)
```

This error indicates that the `baz` property does not exist on the object provided.

## Calling Functions

Let's call the `range` function in the `Data.Array` library.

```
> range 1 10

[1,2,3,4,5,6,7,8,9,10]
```

Function arguments are separated with spaces.

Functions can be partially applied. Create a version of `range` which fixes its first argument:

```
> let upTo = range 1
  
> upTo 5
  
[1,2,3,4,5]
```

## Writing Functions

Functions are introduced by specifying their argument names on the left of the equals sign:

```
> let plusOne n = n + 1
```

Try evaluating `f`:

```
> f 1

  2
```

Now try using `f` in conjunction with some other functions:

```
> map plusOne (upTo 5)

  [2,3,4,5,6]
```

Here, `map` is being used as a higher order function: we are passing another function as an argument.

## Recursion

Functions can be defined recursively. Enter each case on a new line at the same indentation level:

```
> let
    even 0 = true
    even 1 = false
    even n = even (n - 2)
```

Try evaulating `even`:

```
> even 10

  true
  
> even 15

  false
```

Find all the even numbers between 1 and 10:

```
> filter even (upTo 10)

  [2,4,6,8,10]
```

#### Exercise 1

Write a function `divBy3` which tests if a number is divisible by `3`. Test your function, and use it to find all numbers between 1 and 10 which are divisible by 3.

#### Exercise 2

Write a function which counts the number of numbers between 1 and `n` which are divisble by 3. (`n` should be an argument to your function). _Hint_: You may like to use the `length` function from `Data.Array`.

## Inline functions

This way of writing functions is used when writing top-level declarations.

When using a function as an expression, you may not want to give it a name. In this case, you can introduce a function using a backslash and arrow:

```
> map (\n -> n + 1) (upTo 10)
```

## Binary Operators

Binary operators are just like functions but are written infix. We've already seen `+` and `-`. Try a few others now:

```
> true && false

  false
  
> 0xFF | 0xFF00

  65535
```

These operators are not built into the language - they are just functions. You can write your own by wrapping the operator in parentheses:

```
> let (..) = range

> 1 .. 5

  [1,2,3,4,5]
```

## Pattern Matching

We can define a function case-by-case, just like we did for `even`.

There are several types of patterns. We've already seen literal patterns:

```
> let f 0 = 0
      f n = f (n - 1) * 2
```

Here `0` is a literal pattern. It only matches the constant `0`. `n` is a variable pattern, which matches any input.

An underscore indicates a wildcard pattern. It is like a variable pattern, but does not bind a name:

```
> let isZero 0 = true
      isZero _ = false
```

We can also match fixed length arrays:

```
> let oneOrTwo [x] = x
      oneOrTwo [x, _] = x
      oneOrTow _ = 0
```

We can also match the head and tail of an array using a _cons_-pattern:

```
> let first (x : _) = x

> first [] :: Number

Failed pattern match

> first [1, 2, 3]

1

> let second (_ : x : _) = x
```

#### Exercise 3

Write a function `sum` which sums the values in an array of numbers. _Hint_: use pattern matching and recursion.

## Algebraic Data Types

Algebraic data types encapsulate different types of data in a similar way to structs and unions from C-like languages.

A simple example is the `Maybe` data type, defined in `Data.Maybe`:

```
data Maybe a = Nothing | Just a
```

Find out some types and print some values.

```
> :i Data.Maybe
> :t Nothing

  forall a. Data.Maybe.Maybe a
 
> :t Just

  forall a. a -> Data.Maybe.Maybe a
 
> Just 10
  
  Just 10
```

We can pattern match based on which constructor was used:

```
> let maybeToNumber Nothing = 0
      maybeToNumber (Just n) = n
      
> maybeToNumber Nothing

  0
```

Another example is `Tuple` from `Data.Tuple`:

```
> :i Data.Tuple
> :t Tuple

  forall a b. a -> b -> Data.Tuple.Tuple a b
  
> let sumTuple (Tuple a b) = a + b

> sumTuple (Tuple 1 2)

  3
```

#### Exercise 4

Write a function `tupleToMaybe` which takes a tuple-of-maybe values to a maybe-tuple value. After defining your function, the following should work:

```
> :t tupleToMaybe

  forall t1 t2. Data.Tuple.Tuple (Data.Maybe.Maybe t1) (Data.Maybe.Maybe t2) 
             -> Data.Maybe.Maybe (Data.Tuple.Tuple t1 t2)
```

## Do Notation

`do` notation is a simpler way of writing expressions with values-in-contexts, e.g. `Maybe a`:

```
> let bothJust x y = do 
    a <- x
    b <- y
    Just (a + b)
    
> bothJust (Just 1) (Just 2)

> bothJust Nothing (Just 2)
```

`bothJust` is actually a specific version of the `lift2` function from the `Control.Applicative` module:

```
> :i Control.Applicative

> let addTwo = lift2 (+)

> addTwo (Just 1) (Just 2)
```

But the new version doesn't just work with

```
> :i Data.Either

> addTwo (Left "Error") (Right 3)
  
  Left Error
  
> addTwo [1,2,3] [4,5,6]
  
  [5,6,7,6,7,8,7,8,9]
```

Another example: find all pairs of numbers `a < b < 10` which add to 10:

```
> do a <- range 1 10
     b <- range 1 10
     if a + b == 10 then return (Tuple a b) else empty
  
  [Tuple(1, 9),Tuple(2, 8),Tuple(3, 7),Tuple(4, 6),Tuple(5, 5),Tuple(6, 4),Tuple(7, 3),Tuple(8, 2),Tuple(9, 1)]
```

### Exercise 5

Find all Pythagorean triples `x^2 + y^2 = z^2` where `x < y < 100`.

## Extensible Records


