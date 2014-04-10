module Main where

import Data.Foldable (for_)

import Control.Monad.Eff
import Control.Monad.Free

import qualified Control.Monad.JQuery as JQuery

data Attribute = Attribute String String

data HtmlF a
  = Element String [Attribute] (Html {}) a
  | Text String a

instance functorHtmlF :: Functor HtmlF where
  (<$>) f (Element elem attrs children a) = Element elem attrs children (f a)
  (<$>) f (Text s a) = Text s (f a)

type Html = Free HtmlF

element :: String -> [Attribute] -> Html {} -> Html {}
element elem attrs children = Free $ Element elem attrs children $ Pure {}

text :: String -> Html {}
text s = liftF $ Text s {}

div :: [Attribute] -> Html {} -> Html {}
div = element "div"

ul :: [Attribute] -> Html {} -> Html {}
ul = element "ul"

li :: [Attribute] -> Html {} -> Html {}
li = element "li"

p :: [Attribute] -> Html {} -> Html {}
p = element "p"

button :: [Attribute] -> Html {} -> Html {}
button = element "button"

test :: Html {}
test = div [] $ do
  ul [] $ do
    li [] $ text "Item 1"
    li [] $ text "Item 2"
    li [] $ text "Item 3"

-------

renderJQuery :: forall a eff. JQuery.JQuery -> Html a -> Eff (dom :: JQuery.DOM | eff) a
renderJQuery root = iterM go
  where
  go (Element elem attrs children rest) = do
    el <- JQuery.create $ "<" ++ elem ++ ">"
    for_ attrs $ \(Attribute key value) ->
      JQuery.setAttr key value el
    renderJQuery el children
    JQuery.append el root
    rest
  go (Text s rest) = do
    JQuery.appendText s root
    rest

main = do
  body <- JQuery.select "body"
  renderJQuery body test 
