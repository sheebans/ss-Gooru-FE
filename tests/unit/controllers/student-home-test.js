import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

var applicationController = Ember.Object.create ({
  profile:Ember.Object.create ({id:'profile-id'}),
  myClasses: {
    classes: [
      Ember.Object.create ({id:'class2',isArchived:false,isTeacher:function(){return false;}})
    ],
    getStudentActiveClasses: function() {
      return this.classes;
    },

  },
  getLocalStorage: () => (
    {getItem: () => null}
  )
});
moduleFor('controller:student-home', 'Unit | Controller | student-home', {

});

test('profile', function(assert) {
  assert.expect(1);
  let controller = this.subject({applicationController});
  assert.deepEqual(controller.get('profile'),applicationController.profile, 'profile should be equal than application controller classes');
});

test('activeClasses', function(assert) {
  assert.expect(1);
  let controller = this.subject({applicationController});
  assert.equal(controller.get('activeClasses').length, 1, 'Should have one active classes');
});

test('totalJoinedClasses', function(assert) {
  assert.expect(1);
  let controller = this.subject({applicationController});
  assert.equal(controller.get('totalJoinedClasses'),1, 'Total joined should be 1');
});

test('hasClasses', function(assert) {
  assert.expect(1);
  let controller = this.subject({applicationController});
  assert.equal(controller.get('hasClasses'),true, 'Should have classes');
});

test('announcementsClasses', function(assert) {
  assert.expect(1);
  let controller = this.subject({applicationController});
  assert.equal(controller.get('announcementsClasses').length,1, 'Should have 1 announcement');
});

test('hasMoreAnnouncements', function(assert) {
  assert.expect(1);
  let controller = this.subject({applicationController});
  assert.equal(controller.get('hasMoreAnnouncements'),false, 'Should not have more announcements');
});
