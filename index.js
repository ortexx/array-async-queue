"use strict";

/**
 * Asynchronously go through an array with concurrency and queue
 * 
 * @param {Array} arr
 * @param {Number} limit - concurrency
 * @param {Function} fn - iteration handler
 */
module.exports = function (arr, limit, fn) {
  return new Promise((resolve, reject) => {
    if(!arr.length) {
      return;
    }

    if(limit > arr.length) {
      limit = arr.length;
    }

    arr = [].concat(arr);
    const length = arr.length;
    let counter = 0;
    let done = 0;
    let stoped = false;

    const stop = () => {
      stoped = true;
    }

    const run = (val) => {
      return Promise.resolve(fn(val, stop)).then(() => { 
        done++;

        if(done == length || stoped) {
          return resolve();
        }

        if(!arr.length) {
          return;
        }
        
        run(arr[0]);
        arr.splice(0, 1);           
      }).catch(reject);
    }

    while(counter < limit) {  
      run(arr[0]);
      arr.splice(0, 1);
      counter++;
    }    
  });
};