module Main where

import Data.DOM
import Data.DOM.Elements
import Data.DOM.Attributes
import Data.DOM.Render.JQuery

import Data.Foreign

import Control.Reactive
import Control.Monad.Eff
import qualified Control.Monad.JQuery as JQuery

import qualified Example0 as Ex0
import qualified Example1 as Ex1
import qualified Example2 as Ex2
import qualified Example3 as Ex3

main = Ex0.main

-- main = JQuery.select "body" >>= Ex1.bind

