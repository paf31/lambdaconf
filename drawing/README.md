# Functional Drawing

## API

### Types

    data Drawing 
      = Path [Tuple Number Number] 
      | Rectangle Rectangle
      | Arc Arc
      | Composite [Drawing]
      | Scaled Rectangle Drawing

### Type Classes

    instance monoidDrawing :: Monoid Drawing

    instance semigroupDrawing :: Semigroup Drawing

### Functions

    everywhere :: (Drawing -> Drawing) -> Drawing -> Drawing

    renderIn :: forall eff. Rectangle -> Context2D -> Drawing -> Eff (canvas :: Canvas | eff) Context2D
    
## Exercises

#### Exercise 1

Compile and run the code:

```
npm install
bower update
grunt
open html/index.html
```

You should see the rendering of `snowflake 6`.

Experiment with the various examples: `circle`, `square`, `sineWave`, `gasket` and `snowflake`.

#### Exercise 2

The implementations of both `snowflake` and `gasket` contain some numerical constants. Refactor the code to move these into top-level function arguments.

#### Exercise 3

Both `snowflake` and `gasket` contain code of the form `go <<< ... <<< go` which applies the function `go` a number of times to an argument.

Refactor this pattern into a function

```
iterate :: (Drawing -> Drawing) -> Number -> Drawing -> Drawing
```

Also make the `Number` argument a function argument to `snowflake` and `gasket`.

#### Exercise 4

Experiment with different `Drawing`s. Some ideas:

- A [http://en.wikipedia.org/wiki/Koch_snowflake](Koch Snowflake)
- Write a function which repeats a `Drawing` along the vertices of a `Path`.
- Extend the `Drawing` data type to allow rotations (you will need to edit `bower_components/purescript-drawing/src/Graphics/Canvas/Drawing.purs`).
