# Functional Drawing

## The API

### Types

    data Drawing 
      = Path [Tuple Number Number] 
      | Rectangle Rectangle
      | Arc Arc
      | Composite [Drawing]
      | Scaled Rectangle Drawing

### Type Classes

    instance monoidDrawing :: Monoid Drawing

    instance semigroupDrawing :: Semigroup Drawing

### Functions

    everywhere :: (Drawing -> Drawing) -> Drawing -> Drawing

    renderIn :: forall eff. Rectangle -> Context2D -> Drawing -> Eff (canvas :: Canvas | eff) Context2D
