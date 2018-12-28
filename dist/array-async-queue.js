(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      return resolve();
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
},{}]},{},[1]);
