module Data.Stack 
  ( Stack()
  , toList
  , fromList
  , nil 
  , pop
  , push
  , peek
  , popWhile
  , popMany
  ) where

import Data.Array
import Data.Maybe
import Data.Tuple

import Test.QuickCheck

data Stack a = Stack [a]

instance showStack :: (Show a) => Show (Stack a) where
  show (Stack s) = "fromList " ++ show s

instance eqStack :: (Eq a) => Eq (Stack a) where
  (==) (Stack s1) (Stack s2) = s1 == s2
  (/=) (Stack s1) (Stack s2) = s1 /= s2

instance arbStack :: (Arb a) => Arb (Stack a) where
  arb = Stack <$> arb

toList :: forall a. Stack a -> [a]
toList (Stack s) = s

fromList :: forall a. [a] -> Stack a
fromList = Stack

nil :: forall a. Stack a
nil = Stack []

pop :: forall a. Stack a -> Maybe (Tuple a (Stack a))
pop (Stack []) = Nothing
pop (Stack (h : t)) = Just (Tuple h (Stack t))

push :: forall a. a -> Stack a -> Stack a
push a (Stack s) = Stack (a : s)

peek :: forall a. Stack a -> Maybe a
peek s = fst <$> pop s

popWhile :: forall a. (a -> Boolean) -> Stack a -> Tuple [a] (Stack a)
popWhile p = go [] 
  where
  go popped (Stack (h : t)) | p h = go (h : popped) (Stack t)
  go popped s = Tuple popped s

popMany :: forall a. Number -> Stack a -> Maybe (Tuple [a] (Stack a))
popMany = go []
  where
  go popped 0 s = Just (Tuple popped s)
  go popped n s = do
    Tuple a s' <- pop s
    go (a : popped) (n - 1) s'
