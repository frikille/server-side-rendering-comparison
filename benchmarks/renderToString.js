'use strict';

/**
 * compare renderToString
 */

const cp = require('child_process');

const limit = 10;

// Render a component ten times parallel, and run it in independent child processes.
runRenderTask(__dirname + '/raxRenderToString.js', limit)
  .then(() => runRenderTask(__dirname + '/reactRenderToString.js', limit))
  .then(() => runRenderTask(__dirname + '/vueRenderToString.js', limit))
  .catch((err) => {
    console.log('Got Err:', err.stack);
  });

function runRenderTask(script, limit) {

  limit = limit || 10;
  return new Promise((resolve, reject) => {
    let count = 0;

    (function run() {
      if (count === limit) {
        return resolve();
      }
      count ++;
      cp.fork(script)
        .on('exit', run);
    })();
  });
}