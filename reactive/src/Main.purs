module Main where

import Data.DOM
import Data.DOM.Elements
import Data.DOM.Attributes
import Data.DOM.Render.JQuery

import Control.Monad.Eff
import qualified Control.Monad.JQuery as JQuery

test :: Html {}
test = div [] $ do
  ul [] $ do
    li [] $ text "Item 1"
    li [style "color: red;"] $ text "Item 2"
    li [] $ text "Item 3"

main = do
  body <- JQuery.select "body"
  renderJQuery body test 
