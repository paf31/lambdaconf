# PureScript Tutorial

This tutorial can be run in `psci`. 

Use the `starter-kit` project to ensure that necessary libraries are available.

Executable lines of code will be prefixed with `> `:

```
> 1 + 1

  2
```

After each line, press _Return_, and then _Ctrl+D_ to evaluate the expression.

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

## Functions

## Binary Operators

## Array Indexing

## Property Accessors

## If-Then-Else Expressions

## Operators

## Record Updates

## Let Bindings

## Do Notation

## Extensible Records

## Handling Effects
