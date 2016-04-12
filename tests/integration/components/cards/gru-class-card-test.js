import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('cards/gru-class-card', 'Integration | Component | cards/gru class card', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

var mockClass = Ember.Object.create({
  id: "class-id",
  creatorId: "creator-id",
  title: "My class - 1",
  description: "This class is intended to make awareness of good habits",
  greeting: "Hi! Welcome to my class",
  grade: [4, 5],
  classSharing: "open",
  coverImage: "cover.png",
  code: "VZFMEWH",
  minScore: 75,
  endDate: "2016-12-31",
  courseId: null,
  collaborator: [
    "collaborator-1",
    "collaborator-2"
  ],
  creatorSystem: null,
  contentVisibility: null,
  isArchived: false,
  isStudent: false
});

var classStudentCount = Ember.Object.create({
  'class-id': 4
});

test('Class Card Layout', function(assert) {

  this.set('class', mockClass);
  this.set('classStudentCount', classStudentCount);

  assert.expect(10);

  this.render(hbs`{{cards/gru-class-card class=class classStudentCount=classStudentCount}}`);

  var $component = this.$(); //component dom element

  const $classCard = $component.find(".gru-class-card");
  const $panel = $classCard.find(".panel");

  T.exists(assert, $classCard, "Missing class card section");
  T.exists(assert, $panel, "Missing class card panel");
  assert.ok($panel.hasClass("teacher"), "Must be a teacher class card");
  T.exists(assert, $classCard.find("h5 .title"), "Missing class card title");
  T.exists(assert, $classCard.find("h5 .code"), "Missing class card code");
  T.exists(assert, $classCard.find("h5 a.action"), "Missing class card action link");
  T.exists(assert, $classCard.find(".collaborators .collaborator-avatar"), "Missing collaborator avatar");
  T.exists(assert, $classCard.find(".collaborators .name"), "Missing collaborator name");
  T.exists(assert, $classCard.find(".students-info"), "Missing students info");
  T.exists(assert, $classCard.find(".description div"), "Missing class info");

});

test('Student class card', function (assert) {
  mockClass.set('isStudent', true);

  this.set('class', mockClass);
  this.set('classStudentCount', classStudentCount);

  assert.expect(1);

  this.render(hbs`{{cards/gru-class-card class=class classStudentCount=classStudentCount}}`);

  var $component = this.$(); //component dom element

  const $panel = $component.find(".panel");
  assert.ok($panel.hasClass("student"), "Must be a student class card");

});

test('Class with just one collaborator', function (assert) {
  mockClass.set('collaborator', ["collaborator-1"]);
  this.set('class', mockClass);
  this.set('classStudentCount', classStudentCount);

  assert.expect(2);

  this.render(hbs`{{cards/gru-class-card class=class classStudentCount=classStudentCount}}`);

  var $component = this.$(); //component dom element

  const $classCard = $component.find(".gru-class-card");
  T.exists(assert, $classCard, "Missing class card section");
  T.notExists(assert, $classCard.find(".collaborators-count"), "Collaborators count should not exist");

});
