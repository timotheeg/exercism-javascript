function assert(cond, message) {
  if (!cond) throw new Error(message);
}

export const squareRoot = (n, x0 = 1) => {
    // isqrt via Newton-Heron iteration with specified initial guess. 
    // Uses 2-cycle oscillation detection.
  
    // Preconditions:
    //    n >= 0
    //    x0 > 0, defaults to 1     (initial guess)

    assert(n >= 0 && x0 > 0, 'Invalid input');

    // isqrt(0) = 0; isqrt(1) = 1
    if (n < 2) return n;

    let prev2 = -1;
    let prev1 = x0;

    while (true) {
        const x1 = Math.floor((prev1 + Math.floor(n / prev1)) / 2);

        // Case 1: converged (steady value)
        if (x1 == prev1) {
            return x1;
        }

        // Case 2: oscillation (2-cycle)
        if (x1 == prev2 && x1 != prev1) {
            // We’re flipping between prev1 and prev2
            // Choose the smaller one (the true integer sqrt)
            return Math.min(prev1, x1);
        }

        // Move forward
        prev2 = prev1;
        prev1 = x1;
    }
}
