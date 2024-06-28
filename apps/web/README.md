Giving a hook and a function:

```ts
const {functionA, variableA} = useHookA()
```

```ts
const {variableB, functionB} = await createB()
```

We aim to call `functionB` when `variableA` is true.

```ts
if (variableA) {
  await functionB(variableA)
}
```

Write a component with a button to call the `functionB`

Note: `variableA` will auto update when calling `functionA(variableB)` successfully

