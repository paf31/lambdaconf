# Functional Web Application Development with PureScript

PureScript is small strongly, statically typed compile-to-JS language, inspired by (and written in) Haskell.

- [#purescript on Twitter](http://twitter.com/purescript)
- [#purescript on Freenode](irc://irc.freenode.com/purescript)
- [PureScript Blog](http://purescript.org)
- [Try PureScript!](http://try.purescript.org)
- [Compiler Docs](http://docs.purescript.org)

## Agenda

- Getting Started
- Why PureScript?
- PureScript Overview
- Tutorials
    - Functional Graphics with HTML 5 Canvas
    - Property-Based Testing with QuickCheck
    - Declarative UIs with `reactive-jquery`

## Getting Started

Install the Haskell Platform:

    apt-get install haskell-platform
    
Install `purescript` from Hackage:

    cabal install purescript
    
Ensure the compiler works:

    psc
    
Try the interactive mode:

    psci
    
Clone the starter kit project and follow the instructions in the README file:

    git clone git@github.com:purescript/starter-kit.git
    
## Backup Option

If you can't install via Hackage for any reason, you can follow along by using the [Try PureScript!](http://try.purescript.org) website or use a pre-prepared [Vagrant box](http://github.com/purescript/purescript-vagrant).

## Why?

### Javascript Benefits
           				
- Universal
- Libraries
- Functions

### Libraries

- Grunt / Gulp
- Bower
- Browserify
- NPM

### But ...

JavaScript is ...

- Verbose
- Callback Hell
- Classes / Inheritance
- Type System

### Motivation

- Generate simple readable efficient Javascript
- A simple, hackable core language with a minimal feature set
- Use the simple parts of Haskell
- Trade-off between a theoretical ideal and generating high performance code

### Contemporaries

- TypeScript
- Fay, GHCJS, Haste
- Elm, Roy

### Use Cases

- End-to-end Javascript application development
- Functional application logic, JS interface to the real world via FFI
- Server-side or client-side Javascript

### Current Applications

- Async
- Reactive UI
- FRP w/ websockets
- DSLs
- Parsing

### Features

- Type Inference
- An expressive type system
    - Extensible records
    - Extensible effects
    - Type classes
    - Rank N Types
- Pattern matching
- Simple FFI
- Type safe support for mutation
