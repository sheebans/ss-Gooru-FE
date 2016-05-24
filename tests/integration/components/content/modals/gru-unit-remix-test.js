import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';
import DS from 'ember-data';
import UnitModel from 'gooru-web/models/content/unit';

const unitServiceStub = Ember.Service.extend({

  updateUnit(courseId, unit) {
    var promiseResponse;

    if (unit.get('title') === 'UNIT FAIL') {
      promiseResponse = new Ember.RSVP.reject();
    } else {
      unit.set('id', 12345);
      promiseResponse = new Ember.RSVP.resolve(unit);
    }

    return DS.PromiseObject.create({
      promise: promiseResponse
    });
  },
  copyUnit() {
    return DS.PromiseObject.create({
      promise: new Ember.RSVP.resolve(12345)
    });
  }
});

moduleForComponent('content/modals/unit-remix', 'Integration | Component | content/modals/gru unit remix', {
  integration: true,

  beforeEach: function () {
    this.inject.service('i18n');

    this.register('service:api-sdk/unit', unitServiceStub);
    this.inject.service('api-sdk/unit', {as: 'unitService'});
  }
});

test('it renders', function (assert) {

  this.set('contentModel', {
    unit: UnitModel.create(Ember.getOwner(this).ownerInjection(), {
      id: 'unit-id',
      title: 'unit-title'
    }),
    courseId: 'course-id'
  });

  this.render(hbs`{{content/modals/gru-unit-remix model=contentModel}}`);

  const $component = this.$('.content.modals.gru-unit-remix');
  assert.ok($component.length, 'Component classes');

  const $header = $component.find('.modal-header');
  assert.ok($header.length, 'Header');
  assert.ok($header.find('h4.modal-title').length, 'Header title');

  const $body = $component.find('.modal-body');
  assert.ok($body.find('p.lead').length, 'Lead message');
  assert.ok($body.length, 'Form');
  assert.equal($body.find('form span.required').length, 1, 'Number of required fields');
  assert.ok($body.find('form .gru-input.title').length, 'Unit title field');

  assert.equal($body.find('.actions button').length, 2, 'Number of action buttons');
  assert.ok($body.find('.actions button.cancel').length, 'Cancel button');
  assert.ok($body.find('.actions button[type="submit"]').length, 'Submit button');
});

test('it shows an error message if the unit title field is left blank', function (assert) {
  assert.expect(3);

  this.set('contentModel', {
    unit: UnitModel.create(Ember.getOwner(this).ownerInjection(), {
      id: 'unit-id',
      title: 'unit-title'
    }),
    courseId: 'course-id'
  });

  this.render(hbs`{{content/modals/gru-unit-remix model=contentModel}}`);

  const $component = this.$('.content.modals.gru-unit-remix');
  const $titleField = $component.find(".gru-input.title");

  assert.ok(!$titleField.find(".error-messages .error").length, 'Title error message not visible');

  // Try submitting without filling in data
  $component.find(".actions button[type='submit']").click();

  return wait().then(function () {

    assert.ok($titleField.find(".error-messages .error").length, 'Title error message visible');
    // Fill in the input field
    $titleField.find("input").val('unit Name');
    $titleField.find("input").blur();

    return wait().then(function () {
      assert.ok(!$titleField.find(".error-messages .error").length, 'Title error message was hidden');
    });
  });
});

test('it shows toast and transitions after copying a unit', function (assert) {
  assert.expect(6);

  var generatedRoute;
  var context = this;

  this.register('service:notifications', Ember.Service.extend({
    success(message) {
      assert.notEqual(message.indexOf(
        context.get('i18n').t('common.remix-unit-success', {unitTitle: 'Unit Name'}).string
      ), -1, 'Notification displayed');
    },
    setOptions(options) {

      assert.equal(options.positionClass, 'toast-top-full-width', "Toast value for positionClass.");
      assert.equal(options.toastClass, 'gooru-toast', "Toast value for toastClass.");
    }
  }));
  this.inject.service('notifications');

  this.on('closeModal', function () {
    assert.ok(true, 'closeModal action triggered');
  });

  // Mock the transitionTo method in the router
  this.set('router', {
    generate(route, unitId) {
      generatedRoute = {
        route: route,
        unit: unitId
      };
    }
  });

  this.set('contentModel', {
    unit: UnitModel.create(Ember.getOwner(this).ownerInjection(), {
      id: 'unit-id',
      title: 'unit-title'
    }),
    courseId: 'course-id'
  });

  this.render(hbs`{{content/modals/gru-unit-remix router=router model=contentModel}}`);

  const $component = this.$('.content.modals.gru-unit-remix');
  const $titleField = $component.find(".gru-input.title");

  $titleField.find("input").val('Unit Name');
  $titleField.find("input").blur();

  return wait().then(function () {
    $component.find(".actions button[type='submit']").click();

    return wait().then(function () {
      assert.equal(generatedRoute.route, 'content.units.edit', 'Generated correct route');
      assert.equal(generatedRoute.unit, 12345, 'Correct generated route unit ID');
    });
  });
});

test('it displays a notification if the unit cannot be created', function (assert) {
  assert.expect(1);

  const context = this;

  // Mock notifications service
  this.register('service:notifications', Ember.Service.extend({
    error(message) {
      assert.equal(message, context.get('i18n').t('common.errors.unit-not-copied').string, 'Notification displayed');
    }
  }));
  this.inject.service('notifications');

  this.set('contentModel', {
    unit: UnitModel.create(Ember.getOwner(this).ownerInjection(), {
      id: 'unit-id',
      title: 'unit-title'
    }),
    courseId: 'course-id'
  });

  this.render(hbs`{{content/modals/gru-unit-remix model=contentModel}}`);

  const $component = this.$('.content.modals.gru-unit-remix');
  const $titleField = $component.find(".gru-input.title");

  $titleField.find("input").val('UNIT FAIL');
  $titleField.find("input").blur();

  return wait().then(function () {
    $component.find(".actions button[type='submit']").click();
  });
});

test('Validate if the unit Title field has only whitespaces', function (assert) {
  assert.expect(3);

  this.set('contentModel', {
    unit: UnitModel.create(Ember.getOwner(this).ownerInjection(), {
      id: 'unit-id',
      title: 'unit-title'
    }),
    courseId: 'course-id'
  });

  this.render(hbs`{{content/modals/gru-unit-remix model=contentModel}}`);

  const $component = this.$('.gru-unit-remix');
  const $titleField = $component.find(".gru-input.title");

  assert.ok(!$titleField.find(".error-messages .error").length, 'Unit Title error message not visible');

  // Try submitting without filling in data
  $component.find(".actions button[type='submit']").click();

  return wait().then(function () {

    assert.ok($titleField.find(".error-messages .error").length, 'Unit Title error should be visible');
    // Fill in the input field
    $titleField.find("input").val(' ');
    $component.find(".actions button[type='submit']").click();

    return wait().then(function () {
      assert.ok($titleField.find(".error-messages .error").length, 'Unit Title error message should be visible');
    });
  });
});

test('Validate the character limit in the unit title field', function (assert) {
  this.set('contentModel', {
    unit: UnitModel.create(Ember.getOwner(this).ownerInjection(), {
      id: 'unit-id',
      title: 'unit-title'
    }),
    courseId: 'course-id'
  });
  this.render(hbs`{{content/modals/gru-unit-remix model=contentModel}}`);

  const maxLenValue = this.$('.gru-unit-remix .gru-input.title input').prop('maxlength');
  assert.equal(maxLenValue, 50, "Input max length");
});
