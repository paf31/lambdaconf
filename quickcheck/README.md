# Testing with Type Classes - QuickCheck

## Type Classes

Type classes provide a form of ad-hoc polymorphism which can be seen as a more powerful version of interfaces from object-oriented language.

### Example

From `Prelude`:

```
class Show a where
  show :: a -> String

instance showString :: Show String where
  show s = s

instance showBoolean :: Show Boolean where
  show true = "true"
  show false = "false"
```

## Property-Based Testing

With property-based testing, properties that are expected to hold are defined, and tested by randomly generating input data.

QuickCheck uses types classes to abstract how data can be randomly generated.

## API

### Types

    type QC = forall eff. Eff (err :: Exception String, trace :: Trace, random :: Random | eff) {}

    data Result
      = Success 
      | Failed String 

### Type Classes

    class (Show t) <= Arb t where
      arb :: forall eff. Eff (random :: Random | eff) t

    class Testable prop where
      test :: forall eff. prop -> Eff (random :: Random | eff) Result

### Type Class Instances

    instance arbBoolean :: Arb Boolean

    instance arbNumber :: Arb Number

    instance arbArray :: (Arb a) => Arb [a]

    instance arbEither :: (Arb a, Arb b) => Arb (Either a b)

    instance arbMaybe :: (Arb a) => Arb (Maybe a)

    instance arbTuple :: (Arb a, Arb b) => Arb (Tuple a b)

    instance testableBoolean :: Testable Boolean

    instance testableResult :: Testable Result

    instance testableFunction :: (Arb t, Testable prop) => Testable (t -> prop)

### Functions 

    quickCheck :: forall prop. (Testable prop) => prop -> QC

## Exercises

The sample code in the `src` directory defines two data structures: a stack and a priority queue, implemented as a linked list.

We will build a set of properties used to test both data structures. We will also write some new `Arb` instances in the process.

#### Exercise 1

Build the project and verify that the tests run successfully:

```
npm install
bower update
grunt
```

You should see two tests run successfully.

#### Exercise 2

Write some new tests for the `Stack` data type. Some examples:

- Push two random values and verify that `popMany 2` yields the two values in order.
- Verify that `pop` and `peek` are compatible.
- Push two distinct random values `a` and `b` a random number of times. Verify that `popWhile ((==) a)` yields the correct number of elements. _Hint_: start by writing a `pushMany` function.

#### Exercise 3

Write `Show`, `Eq`, `Ord` and `Arb` instances for `Priority`.

Write an `Arb` instance for `Queue`.

Uncomment the one test for `Queue` and ensure it passes.

Try writing some new tests for `Queue`.
