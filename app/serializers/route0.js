import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  fetchInClass: function(data) {
    data.pathType = 'route0';
    data.pathId = null;
    return data;
  },

  normalizeFetch: data => {
    data.pathType = 'route0';
    if (data && data.route0Content && data.route0Content.units) {
      data.route0Content.units.forEach(unit => (unit.pathType = 'route0'));
      data.route0Content.units;
      data.route0Content.units.forEach(function(unit) {
        unit.pathType = 'route0';
        unit.id = unit.unitId;
        unit.lessons.forEach(function(lesson) {
          lesson.id = lesson.lessonId;
          lesson.pathType = 'route0';
          lesson.collections.forEach(function(col) {
            col.pathType = 'route0';
            col.pathId = col.pathId;
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
