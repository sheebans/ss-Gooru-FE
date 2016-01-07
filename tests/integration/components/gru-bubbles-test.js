import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('gru-bubbles', 'Integration | Component | gru bubbles', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Bubbles Layout', function(assert) {
  assert.expect(3);
  const bubbleOptions = Ember.A([Ember.Object.create({
    'label': "1",
    'status': 'correct',
    'value': Ember.Object.create({
      'questionType': "True/False",
      'text': "Practica usted ejercicio regularmente",
      'hints': null,
      'explanation': null,
      'answers': false
    })
  }), Ember.Object.create({
    'label': "2",
    'status': 'incorrect',
    'value': Ember.Object.create({
      'questionType': "fill in the blanks",
      'text': "El _______ es amarillo. La luna es_______",
      'hints': null,
      'explanation': null,
      'answers': ['sol', 'gris']
    }),
  }), Ember.Object.create({
    'label': "3",
    'status': 'incorrect',
    'value': Ember.Object.create({
      'questionType': "True/False",
      'text': "Es el 15 de setiembre la fecha de independecia de Costa Rica?",
      'hints': null,
      'explanation': null,
      'answers': true
    })
  })]);

  this.set('bubbleOptions', bubbleOptions);
  this.render(hbs`{{gru-bubbles bubbleOptions=bubbleOptions}}`);

  const $component = this.$(); //component dom element
  const $bubbles = $component.find(".gru-bubbles");

  T.exists(assert, $bubbles, 'Missing bubbles component');
  T.exists(assert, $bubbles.find(".bubble.correct"), 'Missing correct bubble');
  assert.equal($bubbles.find(".bubble.incorrect").length,2, "Incorrect number of incorrect bubbles");

});
test('Select bubble', function(assert) {
  assert.expect(1);

  this.on('parentAction', function(option){
    assert.equal(1, option.label);
  });

  const bubbleOptions = Ember.A([Ember.Object.create({
    'label': "1",
    'status': "correct",
    'value': Ember.Object.create({
      'questionType': "True/False",
      'text': "Practica usted ejercicio regularmente",
      'hints': null,
      'explanation': null,
      'answers': false
    })
  }), Ember.Object.create({
    'label': "2",
    'status': "incorrect",
    'value': Ember.Object.create({
      'questionType': "fill in the blanks",
      'text': "El _______ es amarillo. La luna es_______",
      'hints': null,
      'explanation': null,
      'answers': ["sol", "gris"]
    }),
  }), Ember.Object.create({
    'label': "3",
    'status': "incorrect",
    'value': Ember.Object.create({
      'questionType': "True/False",
      'text': "Es el 15 de setiembre la fecha de independecia de Costa Rica?",
      'hints': null,
      'explanation': null,
      'answers': true
    })
  })]);

  this.set('bubbleOptions', bubbleOptions);
  this.render(hbs`{{gru-bubbles bubbleOptions=bubbleOptions onbubbleOptionSelect='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $bubbles = $component.find(".bubbles-list");
  $bubbles.find("li:first-child a").click();
});

