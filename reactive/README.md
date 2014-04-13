# Functional MVC!

### Scrap Your Markup

Scrap Your Markup is a PureScript library for building user interfaces using the MVC pattern.

The model is a collection of _reactive variables_ from the `purescript-reactive` library.

The view is a function which takes a model and uses `purescript-reactive-jquery` to bind it to elements on the screen.

### HTML DSL

The first building block is a typed DSL for describing HTML elements:

```
example :: Html {}
example = do
  div [] $ do
    text "Here is some text, "
    text "and here is some more text."
  p [] $ text "This is a paragraph."
  ul [style "color: red;"] $ do
    li [] $ text "This is ..."
    li [] $ text "... a red list."
```

Which renders as

> Here is some text, and here is some more text.
> 
> This is a paragraph.
> 
> - This is ...
> - ... a red list.

### Reactive Variables

    newRVar :: forall a eff. a -> Eff (reactive :: Reactive | eff) (RVar a)

    readRVar :: forall a eff. RVar a -> Eff (reactive :: Reactive | eff) a
    
    modifyRVar :: forall a eff. RVar a -> (a -> a) -> Eff (reactive :: Reactive | eff) {}

    writeRVar :: forall a eff. RVar a -> a -> Eff (reactive :: Reactive | eff) {}
    
### Reactive Arrays
    
    newRArray :: forall a eff. Eff (reactive :: Reactive | eff) (RArray a)
    
    readRArray :: forall a eff. RArray a -> Eff (reactive :: Reactive | eff) [a]

    insertRArray :: forall a eff. RArray a -> a -> Number -> Eff (reactive :: Reactive | eff) {}

    updateRArray :: forall a eff. RArray a -> a -> Number -> Eff (reactive :: Reactive | eff) {}

    removeRArray :: forall a eff. RArray a -> Number -> Eff (reactive :: Reactive | eff) a
    
    peekRArray :: forall a eff. RArray a -> Number -> Eff (reactive :: Reactive | eff) a
    
### Computed Values
    
    readComputed :: forall a eff. Computed a -> Eff (reactive :: Reactive | eff) a

    toComputed :: forall a. RVar a -> Computed a

    toComputedArray :: forall a. RArray a -> Computed [a]
    
### Working with computed values

#### Computed is Applicative

This means that you can take a function of several variables and apply it to a set of computed values to get another computed value, which updates when any of the inputs updates:

```
greet first last = "Hello, " ++ first ++ " " ++ last ++ "!"

type Person = { first :: RVar String, last :: RVar String }

greeting :: Person -> Computed String
greeting p = greet <$> toComputed p.first <*> toComputed p.last
```

#### Computed is a Monad

This means that you can look at the value inside a `Computed` value and compute a new value based on the result:

```
greeting :: Person -> Computed String
greeting p = do
  first <- toComputed p.first
  case first of
    "John" -> return "Hey John!"
    _ -> greet <$> toComputed p.first <*> toComputed p.last 
```

Both of these facts mean that there are _lots_ of functions available for building computed values in the standard libraries!

### Simple Example

First, define the model:

```
type Model = RVar String
```

Now define a view:

```
view :: Model -> Html Subscription
view model = div [] $ do
  text "The value is: "
  textBox model []
```

### Demo
