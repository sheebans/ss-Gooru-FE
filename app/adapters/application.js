import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  //host: 'http://qa.goorulearning.org/gooruapi',
  host: 'http://localhost:8882/gooruapi',
  namespace: 'rest/v2',

  ajax: function(url, method, hash) {
    hash = hash || {};
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: false};
    return this._super(url, method, hash);
  }


});
