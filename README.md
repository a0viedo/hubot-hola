# hodor-hola

> A hodor script to greet newbies to your channel

See [`src/hola.coffee`](src/hola.coffee) for full documentation.

## Installation

In hodor project repo, run:

`npm install hodor-hola --save`

Then add **hodor-hola** to your `external-scripts.json`:

```json
[
  "hodor-hola"
]
```

## `hola`

Example: `hodor hola <hola querido %s>` Added greeting message: `hola querido %s`

## Sample Interaction

```
user1> Hey everyone I'm new!
hodor> Hola user1, nice to meet you!
```
