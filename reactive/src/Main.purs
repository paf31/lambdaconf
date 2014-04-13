module Main where

import Data.DOM
import Data.DOM.Elements
import Data.DOM.Attributes
import Data.DOM.Render.JQuery

import Data.Foreign

import Control.Reactive
import Control.Monad.Eff
import qualified Control.Monad.JQuery as JQuery

import qualified Example1 as Ex1
import qualified Example2 as Ex2
import qualified Example3 as Ex3

main = JQuery.select "body" >>= Ex3.bind

