import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('cards/gru-course-card', 'Integration | Component | cards/gru course card', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Course Card Layout', function(assert) {
  var course = Ember.Object.create({
    'title': 'Water cycle',
    'totalUnits': 8,
    'subjects': ['Science'],
    'imageUrl': '/assets/gooru/profile.png',
    'isPublic':true,
    'remixedBy':  Ember.A([Ember.Object.create({
      'email': 'user_1@test.com',
      'firstName': 'firstname-1',
      'fullName': 'lastname-1 firstname-1',
      'id': 'id-1',
      'lastName': 'lastname-1',
      'avatarUrl': '/assets/gooru/profile.png',
      'username': 'username-1'
    }),Ember.Object.create({
      'email': 'user_2@test.com',
      'firstName': 'firstname-2',
      'fullName': 'lastname-2 firstname-2',
      'id': 'id-2',
      'lastName': 'lastname-2',
      'avatarUrl': '/assets/gooru/profile.png',
      'username': 'username-2'
    }),Ember.Object.create({
      'email': 'user_1@test.com',
      'firstName': 'firstname-3',
      'fullName': 'lastname-3 firstname-3',
      'id': 'id-1',
      'lastName': 'lastname-3',
      'avatarUrl': '/assets/gooru/profile.png',
      'username': 'username-3'
    })])
  });

  this.set('course', course);
  assert.expect(8);
  this.render(hbs`{{cards/gru-course-card course=course}}`);

  var $component = this.$(); //component dom element
  const $courseCard = $component.find(".gru-course-card");
  T.exists(assert, $courseCard, "Missing course card section");
  T.exists(assert, $courseCard.find("h3"), "Missing course card title");
  T.exists(assert, $courseCard.find(".total-units"), "Missing total units");
  T.exists(assert, $courseCard.find(".subject"), "Missing subject");
  T.exists(assert, $courseCard.find(".icon"), "Missing icon");
  T.exists(assert, $courseCard.find(".remixed"), "Missing Remixed By");
  T.exists(assert, $courseCard.find(".users-teaser"), "Missing users teaser");
  T.exists(assert, $courseCard.find(".remix-button  button"), "Missing remix button");

});
test('Course Card Private', function(assert) {
  var course = Ember.Object.create({
    'title': 'Water cycle',
    'totalUnits': 8,
    'subjects': ['Science'],
    'imageUrl': '/assets/gooru/profile.png',
    'isPublic':false,
    'remixedBy':  Ember.A([Ember.Object.create({
      'email': 'user_1@test.com',
      'firstName': 'firstname-1',
      'fullName': 'lastname-1 firstname-1',
      'id': 'id-1',
      'lastName': 'lastname-1',
      'avatarUrl': '/assets/gooru/profile.png',
      'username': 'username-1'
    }),Ember.Object.create({
      'email': 'user_2@test.com',
      'firstName': 'firstname-2',
      'fullName': 'lastname-2 firstname-2',
      'id': 'id-2',
      'lastName': 'lastname-2',
      'avatarUrl': '/assets/gooru/profile.png',
      'username': 'username-2'
    }),Ember.Object.create({
      'email': 'user_1@test.com',
      'firstName': 'firstname-3',
      'fullName': 'lastname-3 firstname-3',
      'id': 'id-1',
      'lastName': 'lastname-3',
      'avatarUrl': '/assets/gooru/profile.png',
      'username': 'username-3'
    })])
  });

  this.set('course', course);
  assert.expect(1);
  this.render(hbs`{{cards/gru-course-card course=course}}`);

  var $component = this.$(); //component dom element
  const $courseCard = $component.find(".gru-course-card");
  T.notExists(assert, $courseCard.find(".icon"), "Icon should not appear");


});
test('Click Title and Image', function(assert) {
  var course = Ember.Object.create({
    'title': 'Water cycle',
    'totalUnits': 8,
    'subjects': ['Science'],
    'imageUrl': '/assets/gooru/profile.png',
    'remixedBy':  Ember.A([Ember.Object.create({
      'email': 'user_1@test.com',
      'firstName': 'firstname-1',
      'fullName': 'lastname-1 firstname-1',
      'id': 'id-1',
      'lastName': 'lastname-1',
      'avatarUrl': '/assets/gooru/profile.png',
      'username': 'username-1'
    }),Ember.Object.create({
      'email': 'user_2@test.com',
      'firstName': 'firstname-2',
      'fullName': 'lastname-2 firstname-2',
      'id': 'id-2',
      'lastName': 'lastname-2',
      'avatarUrl': '/assets/gooru/profile.png',
      'username': 'username-2'
    }),Ember.Object.create({
      'email': 'user_1@test.com',
      'firstName': 'firstname-3',
      'fullName': 'lastname-3 firstname-3',
      'id': 'id-1',
      'lastName': 'lastname-3',
      'avatarUrl': '/assets/gooru/profile.png',
      'username': 'username-3'
    })])
  });

  this.set('course', course);
  assert.expect(2);

  this.on('selectCourse', function(course){
    assert.equal('Water cycle', course.title);
  });

  this.render(hbs`{{cards/gru-course-card course=course onSelectCourse='selectCourse'}}`);
  var $component = this.$(); //component dom element
  var $emotionPicker = $component.find(".course-title");
  $emotionPicker.click();
  var $thumbnail = $component.find(".thumbnail");
  $thumbnail.click();
});
test('Click Remix', function(assert) {
  var course = Ember.Object.create({
    'title': 'Water cycle',
    'totalUnits': 8,
    'subjects': ['Science'],
    'imageUrl': '/assets/gooru/profile.png',
    'isPublic':false,
    'remixedBy':  Ember.A([Ember.Object.create({
      'email': 'user_1@test.com',
      'firstName': 'firstname-1',
      'fullName': 'lastname-1 firstname-1',
      'id': 'id-1',
      'lastName': 'lastname-1',
      'avatarUrl': '/assets/gooru/profile.png',
      'username': 'username-1'
    }),Ember.Object.create({
      'email': 'user_2@test.com',
      'firstName': 'firstname-2',
      'fullName': 'lastname-2 firstname-2',
      'id': 'id-2',
      'lastName': 'lastname-2',
      'avatarUrl': '/assets/gooru/profile.png',
      'username': 'username-2'
    }),Ember.Object.create({
      'email': 'user_1@test.com',
      'firstName': 'firstname-3',
      'fullName': 'lastname-3 firstname-3',
      'id': 'id-1',
      'lastName': 'lastname-3',
      'avatarUrl': '/assets/gooru/profile.png',
      'username': 'username-3'
    })])
  });

  this.set('course', course);
  assert.expect(1);

  this.on('remixCourse', function(){
    assert.ok(true);
  });

  this.render(hbs`{{cards/gru-course-card course=course onRemixCourse='remixCourse'}}`);
  var $component = this.$(); //component dom element
  var $remixButton = $component.find(".remix-button button");
  $remixButton.click();

});
