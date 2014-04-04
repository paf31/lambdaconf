module Data.Queue 
  ( Queue()
  , toList
  , fromList
  , nil 
  , enqueue
  , dequeue
  , peek
  , removeMin
  ) where

import Data.Array
import Data.Maybe
import Data.Tuple

import Test.QuickCheck

data Queue priority a = Queue [Tuple priority a]

instance showQueue :: (Show a, Show priority) => Show (Queue priority a) where
  show (Queue q) = "fromList " ++ show q

instance eqQueue :: (Eq a, Eq priority) => Eq (Queue priority a) where
  (==) (Queue q1) (Queue q2) = q1 == q2
  (/=) (Queue q1) (Queue q2) = q1 /= q2

instance arbQueue :: (Arb a, Arb priority) => Arb (Queue priority a) where
  arb = Queue <$> arb

toList :: forall priority a. Queue priority a -> [Tuple priority a]
toList (Queue q) = q

fromList :: forall priority a. [Tuple priority a] -> Queue priority a
fromList = Queue

nil :: forall priority a. Queue priority a
nil = Queue []

dequeue :: forall priority a. Queue priority a -> Maybe (Tuple a (Queue priority a))
dequeue (Queue []) = Nothing
dequeue (Queue (Tuple _ h : t)) = Just (Tuple h (Queue t))

enqueue :: forall priority a. (Ord priority) => priority -> a -> Queue priority a -> Queue priority a
enqueue priority a (Queue s) = Queue $ insert s
  where
  insert [] = [Tuple priority a]
  insert ((t@(Tuple p _)) : tail) | priority > p = Tuple priority a : t : tail
  insert (t : tail) = t : insert tail 

peek :: forall priority a. Queue priority a -> Maybe a
peek s = fst <$> dequeue s

removeMin :: forall priority a. Queue priority a -> Maybe (Queue priority a)
removeMin s = snd <$> dequeue s
