# Install
`npm install array-async-queue`

# About
Asynchronously go through an array with concurrency and queue

# Example

```js
const arrayAsyncQueue = require("array-async-queue");
const arr = [];
const concurrency = 10;

for (let i = 0; i < 1000; i++) {
  arr.push(i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

arrayAsyncQueue(arr, concurrency, (val) => {
  console.log(val);
  return new Promise(resolve => setTimeout(resolve, getRandomInt(0, 50))
})
```

# Description
Initially, the functions will be launched in parallel in the quantity specified in the variable __concurrency__. After completing one of them, the next one remaining in the array will be called. At the same time, the number of parallel called functions is always equal to __concurrency__.
