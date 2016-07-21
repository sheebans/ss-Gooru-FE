import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import CollectionModel from 'gooru-web/models/content/collection';
import AssessmentModel from 'gooru-web/models/content/assessment';
import LessonModel from 'gooru-web/models/content/lesson';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

const profileServiceStub = Ember.Service.extend({

  readCollections(userId,pagination,filter) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (!userId) {
        reject({status: 500});
      } else {
        resolve(
          Ember.A([
            {
              id: 'some-id',
              title: 'some-title'
            },
            {
              id: 'some-id-2',
              title: 'some-title-2'
            }]));
      }
    });
  },
  readAssessments(userId,pagination,filter) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (!userId) {
        reject({status: 500});
      } else {
        resolve(
          Ember.A([
            {
              id: 'some-id',
              title: 'some-title'
            },
            {
              id: 'some-id-2',
              title: 'some-title-2'
            }]));
      }
    });
  }
});
const sessionServiceStub = Ember.Service.extend({
  userId:'12345'
});

moduleForComponent('content/modals/gru-add-to-lesson', 'Integration | Component | content/modals/gru add to lesson', {
  integration: true,
  beforeEach: function () {
    this.register('service:api-sdk/profile', profileServiceStub);
    this.inject.service('api-sdk/profile');
    this.register('service:session', sessionServiceStub);
    this.inject.service('session');
  }
});

test('Layout', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('model', {
    "collections": Ember.A([
      CollectionModel.create(Ember.getOwner(this).ownerInjection(), {
        id: 'some-id',
        title: 'some-title'
      }),
      CollectionModel.create(Ember.getOwner(this).ownerInjection(), {
        id: 'some-id-2',
        title: 'some-title-2'
      })
    ]),
    "content": LessonModel.create(Ember.getOwner(this).ownerInjection(), {
      id: 'lesson-id',
      title: 'lesson-title'
    })
  });

  this.render(hbs`{{content/modals/gru-add-to-lesson model=model}}`);

  const $component = this.$('.content.modals.gru-add-to');
  assert.ok($component.length, 'Component classes');

  const $header = $component.find('.modal-header');
  assert.ok($header.length, 'Header');
  assert.ok($header.find('.modal-title').length, 'Header title');


  const $body = $component.find('.modal-body');
  assert.ok($body.length, 'Body');
  assert.equal($body.find('>div').length, 2, 'Number of cards');

  const $footer = $component.find('.modal-footer');

  assert.equal($footer.find('.btn-group button').length, 2, 'Number of action buttons');
  assert.ok($footer.find('.btn-group .cancel').length, 'Cancel button');
  assert.ok($footer.find('.btn-group .add-to').length, 'Add to lesson button');

});

test('Show more result Collections', function(assert) {
  var collections = Ember.A([]);

  for (i = 0; i <= 19; i++) {
    collections.pushObject(CollectionModel.create(Ember.getOwner(this).ownerInjection(), {
      id: 'some-id',
      title: 'some-title'
    }));
  }

  var content = {content:null, collections:collections,isCollection: true};
  this.set('model', content);

  this.render(hbs`{{content/modals/gru-add-to-lesson model=model}}`);

  const $component = this.$('.content.modals.gru-add-to-collection');
  assert.ok($component.length, 'Component');

  const $body = $component.find('.modal-body');
  assert.ok($body.length, 'Body');

  const $showMoreResultButton = $component.find('.show-more-results');
  assert.ok($showMoreResultButton);

  assert.equal($body.find('.collection').length,20, 'Number of cards');

  $showMoreResultButton.click();
  return wait().then(function () {
    assert.equal($body.find('.collection').length, 22, 'Number of cards');
  });
});
test('Show more result Assessments', function(assert) {
  var assessments = Ember.A([]);

  for (i = 0; i <= 19; i++) {
    assessments.pushObject(AssessmentModel.create(Ember.getOwner(this).ownerInjection(), {
      id: 'some-id',
      title: 'some-title'
    }));
  }

  var content = {content:null, collections:assessments,isCollection: false};
  this.set('model', content);

  this.render(hbs`{{content/modals/gru-add-to-lesson model=model}}`);

  const $component = this.$('.content.modals.gru-add-to-collection');
  assert.ok($component.length, 'Component');

  const $body = $component.find('.modal-body');
  assert.ok($body.length, 'Body');

  const $showMoreResultButton = $component.find('.show-more-results');
  assert.ok($showMoreResultButton);

  assert.equal($body.find('.collection').length,20, 'Number of cards');

  $showMoreResultButton.click();
  return wait().then(function () {
    assert.equal($body.find('.collection').length, 22, 'Number of cards');
  });
});
