import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  fetchInClass: function(data) {
    return data;
  },

  updateRouteAction: function(data) {
    return data;
  }
});
