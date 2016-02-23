import Ember from 'ember';
/**
 * Convenience helper to truncate texts
 *
 * {{truncate text='my text' maxLength=10 type='name' suffix=true}}
 *
 * maxLength, used if type is not provided
 * type, optional parameters, indicates the type of truncation, it looks into configuration
 * suffix, default value is true, used to add ... as text suffix
 *
 * @param {[]} params
 * @param {{}} hash, it has helper parameters
 * @returns {*}
 */
export function truncate(params, hash) {
  let config = { //TODO product owner will provide max lengths, this will be moved to the configuration
    "name": 20,
    "short": 10,
    "player-nav-sm": 30,
    "medium": 50,
    "large": 200
  };
  let defaultType = "short";
  var txt = document.createElement("p");
  txt.innerHTML = hash.text;
  let text = $(txt).text();
  let maxLength = hash.maxLength;
  let type = hash.type;
  let suffix = hash.suffix !== false; //suffix is disabled by passing false

  if (!maxLength && !type){ //default behavior
    type = defaultType;
  }

  if (type) {
    maxLength = config[type] || config[defaultType];
  }

  let truncated = text;
  if (text.length > maxLength) {
    truncated = text.substring(0, maxLength);
    if (suffix) {
      truncated = truncated + "...";
    }
  }
  return truncated;
}

export default Ember.Helper.helper(truncate);
