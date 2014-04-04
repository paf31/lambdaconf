module Main where

import Data.Maybe
import Data.Tuple
import Data.Array

import qualified Data.Stack as S

import Test.QuickCheck

main = do

  quickCheck $ \s x -> S.pop (S.push (x :: Number) s) == Just (Tuple x s)

  quickCheck $ \s -> S.popWhile (const false) (s :: S.Stack Number) == Tuple [] s

  Debug.Trace.trace "Done"
