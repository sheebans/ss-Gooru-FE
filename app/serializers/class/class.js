import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  normalizeQueryRecordResponse: function(store, primaryModelClass, payload) {
    var classModel = { data: [] };
    var results = payload.searchResult;
    if (results && results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        var currentResult = results[i];
        var classItem = {
          id: currentResult.classUid,
          type: "class/class",
          attributes: {
            name: currentResult.name,
            code: currentResult.classCode,
            // TODO: These four properties have harcoded values until endpoint is ready to provide us this data.
            greetings: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            startDate: '9.2.2015',
            endDate: '12.15.2015',
            grades: currentResult.grades,
            visibility: currentResult.visibility,
            totalMembers: currentResult.memberCount,
            teachers: this.normalizeTeachers(Ember.A([currentResult.user]))
          }
        };
        classModel.data.push(classItem);
      }
    }
    return classModel;
  },

  normalizeTeachers: function(teachers) {
    var result = Ember.A([]);
    teachers.forEach(function(item) {
      this.push({
        id: item.gooruUId,
        username: item.username,
        avatarUrl: item.profileImageUrl
      });
    }, result);
    return result;
  }

});
