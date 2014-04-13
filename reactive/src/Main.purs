module Main where

import Data.DOM
import Data.DOM.Elements
import Data.DOM.Attributes
import Data.DOM.Render.JQuery

import Data.Foreign

import Control.Reactive
import Control.Monad.Eff
import qualified Control.Monad.JQuery as JQuery

type Example1Model = RVar String

example1View :: Example1Model -> Html Subscription
example1View model = do
  s1 <- div [] $ do
    text "This value: "
    textBox model [] 
  s2 <- div [] $ do
    text "should be the same as this value: "
    textBox model []
  return $ s1 <> s2

example1 root = do
  model <- newRVar "Test"
  renderJQuery root (example1View model) 

type Example2Model = 
  { firstName :: RVar String
  , lastName :: RVar String
  , morning :: RVar Boolean
  }

mkEx2Model :: RVar String -> RVar String -> RVar Boolean -> Example2Model
mkEx2Model firstName lastName morning = 
  { firstName: firstName
  , lastName: lastName
  , morning: morning
  }

example2View :: Example2Model -> Html Subscription
example2View model = do
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

example2 root = do
  model <- mkEx2Model <$> newRVar "John"
                      <*> newRVar "Smith"
                      <*> newRVar false 
  renderJQuery root (example2View model) 

main = JQuery.select "body" >>= example2

