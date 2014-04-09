module Main where

import Data.Maybe
import Data.Tuple
import Data.Array

import qualified Data.Stack as S
import qualified Data.Queue as Q

import Test.QuickCheck

data Priority = Low | High

main = do

  -- Stack

  quickCheck $ \s x -> S.pop (S.push (x :: Number) s) == Just (Tuple x s)

  quickCheck $ \s -> S.popWhile (const false) (s :: S.Stack Number) == Tuple [] s

  -- Queue

  {-
  
  -- This test should pass after appropriate instances have been written

  quickCheck $ \q n1 n2 -> Q.enqueue Low (n1 :: Number) (Q.enqueue High n2 q) == Q.enqueue High n2 (Q.enqueue Low n1 q)
  
  -}

  Debug.Trace.trace "Done"
