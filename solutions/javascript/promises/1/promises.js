//
// This is only a SKELETON file for the 'Promises' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const promisify = (func) => {
  return (...args) => new Promise((resolve, reject) => {
    func(...args, (err, ...res) => {
      if (err) reject(err);
      else resolve(...res);
    });
  });
};

export const all = (promises) => {
  return new Promise((resolve, reject) => {
    if (promises === undefined) resolve();
    if (promises.length === 0) resolve([]);

    let resolved = 0;
    const results = promises.map(_ => null);

    promises.forEach((promise, pidx) => {
      promise.then(
        (val) => {
          results[pidx] = val;
          if (++resolved >= promises.length) {
            resolve(results);
          }
        },
        reject
      );
    })
  });
};

export const allSettled = (promises) => {
  return new Promise((resolve) => {
    if (promises === undefined) resolve();
    if (promises.length === 0) resolve([]);

    let resolved = 0;
    const results = promises.map(_ => null);

    promises.forEach((promise, pidx) => {
      const sharedhandler = (valOrErr) => {
        results[pidx] = valOrErr;
        if (++resolved >= promises.length) {
          resolve(results);
        }
      };
      
      promise.then(sharedhandler, sharedhandler);
    })
  });
};

export const race = (promises) => {
  return new Promise((resolve, reject) => {
    if (promises === undefined) resolve();
    if (promises.length === 0) resolve([]);

    promises.forEach((promise, pidx) => {
      // relies of promise state to be immutable, and silently ignore attempts to change state
      promise.then(resolve, reject);
    });
  });
};

export const any = (promises) => {
  return new Promise((resolve, reject) => {
    if (promises === undefined) resolve();
    if (promises.length === 0) resolve([]);

    let errored = 0;
    const errors = promises.map(_ => null);

    promises.forEach((promise, pidx) => {
      promise.then(
        resolve,
        (err) => {
          errors[pidx] = err;
          if (++errored >= promises.length) {
            reject(errors);
          }
        }
      );
    })
  });
};