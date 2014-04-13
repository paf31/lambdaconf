module Example0 where

import Data.DOM
import Data.DOM.Elements
import Data.DOM.Attributes
import Data.DOM.Render.JQuery

import Control.Monad.Eff
import qualified Control.Monad.JQuery as JQuery

example :: Html {}
example = do
  div [] $ do
    text "Here is some text, "
    text "and here is some more text."
  p [] $ text "This is a paragraph."
  ul [style "color: red;"] $ do
    li [] $ text "This is ..."
    li [] $ text "... a red list."

main = do
  body <- JQuery.select "body"
  renderJQuery body example 

