"use strict";

let assert = require('chai').assert;
let arrayAsyncQueue = require('../index');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

describe('arrayAsyncQueue:', function() {
  let arr = [];

  for(let i = 0; i < 100; i++) {
    arr.push(i);
  }

  it('check sync handler', function () {
    let counter = 0;

    return arrayAsyncQueue(arr, 10, (val) => {
      assert.isOk(arr.indexOf(val) != -1);
      counter++;
    }).then(() => {
      assert.equal(counter, arr.length);
    });
  });  

  it('check async handler', function () {
    let counter = 0;

    return arrayAsyncQueue(arr, 10, (val) => {
      return new Promise((resolve) => {
        setTimeout(resolve);
      }).then(() => {
        assert.isOk(arr.indexOf(val) != -1);
        counter++;
      })
    }).then(() => {
      assert.equal(counter, arr.length);
    });
  });

  it('check random resolving', function () {
    let newArr = [];

    return arrayAsyncQueue(arr, 10, (val) => {
      return new Promise((resolve) => {
        setTimeout(resolve, getRandomInt(0, 50));
      }).then(() => {
        newArr.push(val);
      })
    }).then(() => {
      assert.equal(newArr.sort().toString(), arr.sort().toString());
    });
  });
  
  it('check the concurrency is greater the array length', function () {
    let counter = 0;

    return arrayAsyncQueue(arr, 108, (val) => {
      return Promise.resolve().then(() => {
        assert.isOk(arr.indexOf(val) != -1);
        counter++;
      })
    }).then(() => {
      assert.equal(counter, arr.length);
    });
  });  
});
