import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('gru-user-icons', 'Integration | Component | gru user icons', {
  integration: true
});

test('it renders all users when the number of users is less than the view threshold', function(assert) {

  const users = [
    Ember.Object.create({
      id: 1,
      name: "Bobby Fisher"
    })
  ];

  this.set('users', users);

  this.render(hbs`{{gru-user-icons users=users viewThreshold=2}}`);

  const $component = this.$('.gru-user-icons');
  const $firstView = $component.find('.first-view');

  assert.ok($component, 'Component does not have the component class');
  assert.equal($firstView.find('.user').length, 1, 'Incorrect number of users at first view');
  assert.ok(!$firstView.find('.num-left').length, 'User number indicator should not be present');
  assert.ok(!$firstView.hasClass('clickable'), 'First view container should not have class "clickable"');
});

test('it renders all users when the number of users is equal to the view threshold', function(assert) {

  const users = [
    Ember.Object.create({
      id: 1,
      name: "Bobby Fisher"
    }),
    Ember.Object.create({
      id: 2,
      name: "John Doe"
    })
  ];

  this.set('users', users);

  this.render(hbs`{{gru-user-icons users=users viewThreshold=2}}`);

  const $component = this.$('.gru-user-icons');
  const $firstView = $component.find('.first-view');

  assert.ok($component, 'Component does not have the component class');
  assert.equal($firstView.find('.user').length, 2, 'Incorrect number of users at first view');
  assert.ok(!$firstView.find('.num-left').length, 'User number indicator should not be present');
  assert.ok(!$firstView.hasClass('clickable'), 'First view container should not have class "clickable"');
});


test('it renders all users when the number of users is greater than the view threshold', function(assert) {

  const users = [
    Ember.Object.create({
      id: 1,
      name: "Bobby Fisher"
    }),
    Ember.Object.create({
      id: 2,
      name: "John Doe"
    }),
    Ember.Object.create({
      id: 3,
      name: "Martha Stewart"
    }),
    Ember.Object.create({
      id: 4,
      name: "John Fitzgerald"
    })
  ];

  this.set('users', users);

  this.render(hbs`{{gru-user-icons users=users viewThreshold=3}}`);

  const $component = this.$('.gru-user-icons');
  assert.equal($component.find('.first-view .user').length, 2);
  assert.equal($component.find('.first-view .num-left').length, 1);
  assert.equal($component.find('.remaining .user').length, 2);
});

test('users are sorted first by state (active first), then ascending alphabetically by name', function(assert) {

  const users = [
    Ember.Object.create({
      id: 1,
      name: "John Fitzgerald",
      active: false
    }),
    Ember.Object.create({
      id: 2,
      name: "Bobby Fisher",
      active: false
    }),
    Ember.Object.create({
      id: 3,
      name: "John Doe",
      active: true
    }),
    Ember.Object.create({
      id: 4,
      name: "Martha Stewart",
      active: false
    }),
    Ember.Object.create({
      id: 5,
      name: "Bennie King",
      active: true
    }),
    Ember.Object.create({
      id: 8,
      name: "Kennie Wong",
      active: true
    })
  ];

  this.set('users', users);

  this.render(hbs`{{gru-user-icons users=users viewThreshold=3}}`);

  const $component = this.$('.gru-user-icons');
  const $firstViewSection = $component.find('.first-view');
  const $remainingSection = $component.find('.remaining');

  assert.equal($firstViewSection.find('.user').length, 2);
  assert.equal($firstViewSection.find('.user:eq(0) img').prop('title'), 'Bennie King', 'First name does not coincide');
  assert.equal($firstViewSection.find('.user:eq(1) img').prop('title'), 'John Doe', 'Second name does not coincide');

  assert.equal($remainingSection.find('.user:eq(0) img').prop('title'), 'Kennie Wong', 'Third name does not coincide');
  assert.equal($remainingSection.find('.user:eq(1) img').prop('title'), 'Bobby Fisher', 'Fourth name does not coincide');
  assert.equal($remainingSection.find('.user:eq(2) img').prop('title'), 'John Fitzgerald', 'Fifth name does not coincide');
  assert.equal($remainingSection.find('.user:eq(3) img').prop('title'), 'Martha Stewart', 'Sixth name does not coincide');
});

test('it opens/closes a tooltip to view more users when the number of users exceeds the view threshold', function(assert) {

  const users = [
    Ember.Object.create({
      id: 1,
      name: "Bobby Fisher"
    }),
    Ember.Object.create({
      id: 2,
      name: "John Doe"
    }),
    Ember.Object.create({
      id: 3,
      name: "Martha Stewart"
    }),
    Ember.Object.create({
      id: 4,
      name: "John Fitzgerald"
    })
  ];

  this.set('users', users);

  this.render(hbs`{{gru-user-icons users=users viewThreshold=3 viewMoreIn='tooltip'}}`);

  const $component = this.$('.gru-user-icons');
  const $anchor = $component.find('.first-view');
  var $popover;

  assert.ok($anchor.hasClass('clickable'), 'Anchor is missing class "clickable"');

  // Open the tooltip
  $anchor.click();
  $popover = $component.find('.popover');
  assert.ok($popover.length, 'Tooltip should be present');
  assert.ok($popover.hasClass('in'), 'Tooltip should be visible');
  assert.equal($popover.find('.popover-content .user').length, 2, 'Tooltip does not show the correct number of users');

  // Close the tooltip
  $anchor.click();
  $popover = $component.find('.popover');
  assert.ok(!$popover.length, 'Tooltip should have been hidden');
});

test('it opens/closes a modal to view more users when the number of users exceeds the view threshold', function(assert) {

  const users = [
    Ember.Object.create({
      id: 1,
      name: "Bobby Fisher"
    }),
    Ember.Object.create({
      id: 2,
      name: "John Doe"
    }),
    Ember.Object.create({
      id: 3,
      name: "Martha Stewart"
    }),
    Ember.Object.create({
      id: 4,
      name: "John Fitzgerald"
    })
  ];

  this.set('users', users);

  this.render(hbs`{{gru-user-icons users=users viewThreshold=3 viewMoreIn='modal'}}`);

  const $component = this.$('.gru-user-icons');
  const $anchor = $component.find('.first-view');
  const $modal = $component.find('.remaining.modal');

  assert.ok($anchor.hasClass('clickable'), 'Anchor is missing class "clickable"');
  assert.ok($modal.length, 'Modal element should be present');
  assert.ok(!$modal.hasClass('in'), 'Modal should not be visible');

  // Open the modal
  $anchor.click();
  assert.ok($modal.hasClass('in'), 'Modal should be visible');
  assert.equal($modal.find('.modal-body .user').length, 2, 'Modal does not show the correct number of users');

  // Close the modal
  $anchor.click();
  assert.ok(!$modal.hasClass('in'), 'Modal should have been hidden');
});
