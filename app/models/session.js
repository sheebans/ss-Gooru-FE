import DS from 'ember-data';

export default DS.Model.extend({

  gooruUId: DS.attr('string'),
  token: DS.attr('string'),
  username: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  usernameDisplay: DS.attr('string')

});
