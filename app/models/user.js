import DS from 'ember-data';

export default DS.Model.extend({

  accountCreatedType: DS.attr('string'),
  accountTypeId: DS.attr('number'),
  active: DS.attr('number'),
  confirmStatus: DS.attr('number'),
  createdOn: DS.attr('string'),
  emailId: DS.attr('string'),
  firstName: DS.attr('string'),
  gooruUId: DS.attr('string'),
  lastName: DS.attr('string'),
  organizationName: DS.attr('string'),
  partyUid: DS.attr('string'),
  profileImageUrl: DS.attr('string'),
  userRoleSetString: DS.attr('string'),
  username: DS.attr('string'),
  usernameDisplay: DS.attr('string'),
  viewFlag: DS.attr('number')

});
