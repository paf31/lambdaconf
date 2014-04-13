module Main where

import Data.DOM
import Data.DOM.Elements
import Data.DOM.Attributes
import Data.DOM.Render.JQuery

import Data.Foreign

import Control.Reactive
import Control.Monad.Eff
import qualified Control.Monad.JQuery as JQuery

type Model = RVar String

view :: Model -> Html Subscription
view model = do
  s1 <- div [] $ do
    text "This value: "
    textBox model [] 
  s2 <- div [] $ do
    text "should be the same as this value: "
    textBox model []
  return $ s1 <> s2

main = do
  model <- newRVar "Test"
  body <- JQuery.select "body"
  renderJQuery body (view model) 
