module Example3 where

import Data.Maybe
import Data.Array (length, head)

import Data.DOM
import Data.DOM.Elements
import Data.DOM.Attributes
import Data.DOM.Render.JQuery

import Control.Reactive
import Control.Monad.Eff

type Task = 
  { description :: RVar String
  , completed :: RVar Boolean
  }

mkTask :: RVar String -> RVar Boolean -> Task
mkTask description completed = 
  { description: description
  , completed: completed
  }

type Model = 
  { tasks :: RArray Task
  }

view :: Model -> Html Subscription
view model = do
  s1 <- ul [] $ forEach model.tasks [] $ \task index -> li [] $ do
    s1 <- textBox task.description []
    s2 <- checkBox task.completed []
    s3 <- button "Remove" [] (do
      i <- readRVar index
      removeRArray model.tasks i
      return {})
    return $ s1 <> s2 <> s3

  s2 <- p [] $ button "New Task" [] (do
    newTask <- mkTask <$> newRVar "" <*> newRVar false
    tasks <- readRArray model.tasks
    insertRArray model.tasks newTask (length tasks))

  s3 <- p [] $ label (statusMessage <$> taskCount <*> nextTask) []

  return $ s1 <> s2 <> s3

  where

  remainingTasks = do
    tasks <- toComputedArray model.tasks
    filterM (\task -> not <$> toComputed task.completed) tasks

  nextTask = do
    task <- head <$> remainingTasks 
    case task of
      Nothing -> return "Done!"
      Just { description = description } -> toComputed description
  
  taskCount = length <$> remainingTasks
  
  statusMessage count desc = show count ++ " tasks remaining. Next task: " ++ desc

filterM :: forall m a. (Monad m) => (a -> m Boolean) -> [a] -> m [a]
filterM _ [] = pure []
filterM p (x : xs) = do
  b <- p x
  case b of
    true -> (:) x <$> filterM p xs
    false -> filterM p xs
  
bind root = do
  arr <- newRArray 
  renderJQuery root (view { tasks: arr }) 


