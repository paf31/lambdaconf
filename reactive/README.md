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

The example has type `Html {}` and can be passed to `renderJQuery` to actually render it on the screen:

```
main = do
  body <- JQuery.select "body"
  renderJQuery body example
```

Which renders as

> Here is some text, and here is some more text.
> 
> This is a paragraph.
> 
> - This is ...
> - ... a red list.

#### Exercise 1

Compile the example. Experiment with the constructors `div`, `p`, `text`, `ul`, and `li`.

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
type Model = { name :: RVar String }
```

Now define a view:

```
view :: Model -> Html Subscription
view model = div [] $ do
  text "Your name: "
  textBox model.name []
```

If we define two text boxes using the same model, they will update at the same time.

### Labels

Let's bind the model to a label:

```
view :: Model -> Html Subscription
view model = do
  s1 <- div [] $ do
    text "Your name: "
    textBox model.name []
  s2 <- label [] (greet <$> toComputed model.name)
  return $ s1 <> s2
  
  where
  
  greet name = "Hello, " ++ name
```

#### Exercise 2

Remove the comment in `Main.purs` to compile example 1. Try out the UI.

Replace the second text box with a label to display the text in the model.

### Check Boxes

If we extend our model to use a boolean value:

```
type Model = 
  { name :: RVar String
  , morning :: RVar Boolean
  }
```

then we can bind the value to a checkbox:

```
view :: Model -> Html Subscription
view model = do
  s1 <- div [] $ do
    text "Your name: "
    textBox model.name []
  s2 <- div [] $ do
    text "Morning: "
    checkBox model.morning []
  s3 <- label [] (greet <$> toComputed model.name <*> toComputed model.morning)
  return $ s1 <> s2 <> s3
  
  where
  
  greet name true = "Good morning, " ++ name
  greet name false = "Hello, " ++ name
```

#### Exercise 3

Change `Main.purs` to enable example 2. Try out the UI.

### Buttons

Buttons can be bound to actions which can modify the state of the model:

```
s4 <- button "Clear Name" [] $ do
  writeRVar model.Name ""
```

#### Exercise 4

Add a button to exercise 2 which can be used to switch the two names.

### Repeaters

A repeater can be used to display many items in a list, e.g. a table or a bulleted list:

```
type Person = { first :: RVar String, last :: String }

type Model = { people :: RArray Person }

view :: Model -> Html Subscription
view model = forEach model.people $ \person _ -> do
  s1 <- div [] $ do
    text "First name: "
    textBox person.firsy []
  s2 <- div [] $ do
    text "Last name: "
    textBox person.last []
  return $ s1 <> s2
```

#### Exercise 5

Change `Main.purs` to enable example 3. Try out the UI.

Build an address book application.
