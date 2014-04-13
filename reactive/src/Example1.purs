module Example1 where

import Data.DOM
import Data.DOM.Elements
import Data.DOM.Attributes
import Data.DOM.Render.JQuery

import Control.Reactive
import Control.Monad.Eff

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

bind root = do
  model <- newRVar ""
  renderJQuery root (view model)

