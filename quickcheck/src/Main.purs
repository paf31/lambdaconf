module Main where

import Data.Maybe
import Data.Tuple
import Data.Array

import qualified Data.Stack as S
import qualified Data.Queue as Q

import Test.QuickCheck

data Priority = Low | High

instance showPriority :: Show Priority where
  show Low = "Low"
  show High = "High"

instance eqPriority :: Eq Priority where
  (==) Low Low = true
  (==) High High = true
  (==) _ _ = false
  (/=) a b = not (a == b)

instance ordPriority :: Ord Priority where
  compare Low High = LT
  compare High Low = GT
  compare _ _ = EQ

instance arbPriority :: Arb Priority where
  arb = do
    b <- arb
    return $ if b then Low else High

main = do

  -- Stack

  quickCheck $ \s x -> S.pop (S.push (x :: Number) s) == Just (Tuple x s)

  quickCheck $ \s -> S.popWhile (const false) (s :: S.Stack Number) == Tuple [] s

  -- Queue

  quickCheck $ \q n1 n2 -> Q.enqueue Low (n1 :: Number) (Q.enqueue High n2 q) == Q.enqueue High n2 (Q.enqueue Low n1 q)

  Debug.Trace.trace "Done"
