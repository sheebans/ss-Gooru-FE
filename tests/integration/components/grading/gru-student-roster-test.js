import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';

moduleForComponent(
  'grading/gru-student-roster',
  'Integration | Component | grading/gru student roster',
  {
    integration: true
  }
);

test('Layout', function(assert) {
  let students = [
    'Melany Delgado',
    'Javier Camacho',
    'Jennifer Ajoy',
    'Martin Mendez',
    'Anai Arroyo',
    'Alejandro Rodriguez',
    'David Artavia',
    'June Wang',
    'Diana Cespedez',
    'Luis Ugalde'
  ];

  this.set('students', students);
  this.render(hbs`{{grading/gru-student-roster students=students}}`);

  const $component = this.$('.grading.gru-student-roster');

  assert.ok(
    $component.find('.header .account_circle').length,
    'Missing header icon'
  );
  assert.ok($component.find('.header .title').length, 'Missing header title');
  assert.ok($component.find('.header .lead').length, 'Missing header lead');
  assert.ok(
    $component.find('.header .clear').length,
    'Missing header close icon'
  );
  assert.ok(
    $component.find('.student-roster').length,
    'Missing student roster'
  );
  assert.equal(
    $component.find('.student').length,
    10,
    'Should have 10 students'
  );
  assert.ok($component.find('.student .name').length, 'Missing student name');
  assert.ok(
    $component.find('.student .student-answer').length,
    'Missing student answer icon'
  );
});

test('Checked student', function(assert) {
  let students = [];

  this.set('students', students);
  this.render(hbs`{{grading/gru-student-roster students=students}}`);

  students = Ember.A([
    Ember.Object.create({
      name: 'Melany Delgado',
      checked: true
    }),
    Ember.Object.create({
      name: 'David Artavia',
      checked: false
    })
  ]);

  this.set('students', students);

  const $component = this.$('.grading.gru-student-roster');

  assert.equal($component.find('.student').length, 2, 'Should have 2 students');
  assert.equal(
    $component.find('.student.checked').length,
    1,
    'Should have 1 student checked'
  );
});

test('Select Student', function(assert) {
  let students = [
    'Melany Delgado',
    'Javier Camacho',
    'Jennifer Ajoy',
    'Martin Mendez',
    'Anai Arroyo',
    'Alejandro Rodriguez',
    'David Artavia',
    'June Wang',
    'Diana Cespedez',
    'Luis Ugalde'
  ];

  this.set('students', students);
  this.render(hbs`{{grading/gru-student-roster students=students}}`);

  const $component = this.$('.grading.gru-student-roster');

  let $student = $component.find('.student-roster .student:first-child');
  $student.click();
  return wait().then(function() {
    assert.ok(
      $component.find('.student:first-child').hasClass('selected'),
      'First student should be selected'
    );
  });
});

test('Close Student Roster', function(assert) {
  assert.expect(1);

  let students = [
    'Melany Delgado',
    'Javier Camacho',
    'Jennifer Ajoy',
    'Martin Mendez',
    'Anai Arroyo',
    'Alejandro Rodriguez',
    'David Artavia',
    'June Wang',
    'Diana Cespedez',
    'Luis Ugalde'
  ];

  this.set('students', students);

  this.on('parentAction', function() {
    assert.ok(true, 'Close should be called');
  });

  this.render(
    hbs`{{grading/gru-student-roster students=students onClose='parentAction'}}`
  );

  const $component = this.$('.grading.gru-student-roster');

  let $close = $component.find('.header .close');
  $close.click();
});
