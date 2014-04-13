module Example2 where

import Data.DOM
import Data.DOM.Elements
import Data.DOM.Attributes
import Data.DOM.Render.JQuery

import Control.Reactive
import Control.Monad.Eff

type Model = 
  { firstName :: RVar String
  , lastName :: RVar String
  , morning :: RVar Boolean
  }

mkModel :: RVar String -> RVar String -> RVar Boolean -> Model
mkModel firstName lastName morning = 
  { firstName: firstName
  , lastName: lastName
  , morning: morning
  }

view :: Model -> Html Subscription
view model = do
  s1 <- div [] $ do
    text "First name: "
    textBox model.firstName []
  s2 <- div [] $ do
    text "Last name: "
    textBox model.lastName []
  s3 <- div [] $ do
    text "Morning: "
    checkBox model.morning []

  let greeting = greet <$> toComputed model.firstName <*> toComputed model.lastName <*> toComputed model.morning
  
  div [style "color: green;"] $ label greeting []
  
  return $ s1 <> s2 <> s3

  where

  greet firstName lastName true = "Good morning, " ++ firstName ++ " " ++ lastName ++ "!"
  greet firstName lastName _ = "Hello, " ++ firstName ++ " " ++ lastName ++ "!"

bind root = do
  model <- mkModel <$> newRVar "John"
                   <*> newRVar "Smith"
                   <*> newRVar false 
  renderJQuery root (view model) 

