// @ts-check

function randInt(min, max) {
  return min + Math.ceil(Math.random() * (max - min)); // ceil() for both inclusive
}

function randFloat(min, max) {
  return min + Math.random() * (max - min);  
}

/**
 * Generates a random starship registry number.
 *
 * @returns {string} the generated registry number.
 */
export function randomShipRegistryNumber() {
  return `NCC-${randInt(1000, 9999)}`;
}

/**
 * Generates a random stardate.
 *
 * @returns {number} a stardate between 41000 (inclusive) and 42000 (exclusive).
 */
export function randomStardate() {
  return randFloat(41000, 42000);
}

/**
 * Generates a random planet class.
 *
 * @returns {string} a one-letter planet class.
 */
export function randomPlanetClass() {
  const planets = "DHJKLMNRTY";
  const randIndex = Math.floor(Math.random() * planets.length);
  return planets.charAt(randIndex);
}
