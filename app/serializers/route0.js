import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  fetchInClass: function(data) {
    data.pathType = 'route0';
    data.pathId = 59;
    return data;
  },

  normalizeFetch: data => {
    data.pathType = 'route0';
    if (data && data.route0Content && data.route0Content.units) {
      data.route0Content.units.forEach(unit => (unit.pathType = 'route0'));
      data.route0Content.units;
      data.route0Content.units.forEach(function(unit) {
        unit.pathType = 'route0';
        unit.lessons.forEach(function(lesson) {
          lesson.pathType = 'route0';
          lesson.collections.forEach(function(col) {
            col.pathType = 'route0';
            col.pathId = col.path_id; //ToDo: remove 60 as pathid comes from route0 API
          });
        });
      });
    }
    return data;
  },
  updateRouteAction: function(data) {
    return data;
  }
});
