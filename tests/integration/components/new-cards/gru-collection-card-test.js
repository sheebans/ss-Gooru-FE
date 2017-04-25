import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('new-cards/gru-collection-card', 'Integration | Component | new cards/gru collection card', {
  integration: true
});

test('Collection Card Layout', function(assert) {
  var collection = Ember.Object.create({
    title: 'Collection Title',
    questionCount:4,
    isAssessment:false,
    standards:Ember.A([Ember.Object.create({
      description:'Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.',
      code:'CCSS.Math.Content.7.RP.A.3'
    }),Ember.Object.create({
      description:'Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.',
      code:'CCSS.Math.Content.5.NBT.A.2'
    })]),
    owner: Ember.Object.create({
      id: 'owner-id',
      username: 'dara.weiner',
      avatarUrl: 'avatar-url'
    }),
    course: 'Any course title',
    remixedBy:['James','Andrea','Patric'],
    isVisibleOnProfile:false
  });

  this.set('collection', collection);
  this.render(hbs`{{new-cards/gru-collection-card content=collection}}`);
  var $component = this.$(); //component dom element
  const $collectionCard = $component.find('.gru-collection-card');
  assert.ok($collectionCard.find('.panel-heading h3.title'), 'Missing Title');
  assert.ok($collectionCard.find('.panel-heading .image img'), 'Missing Collection Image');
  assert.ok($collectionCard.find('.panel-heading .question-resources'), 'Missing Question and Resource Label');
  assert.ok($collectionCard.find('.panel-body .gru-taxonomy-tag-list'), 'Missing Standards');
  assert.ok($collectionCard.find('.panel-body .remixed-by'), 'Missing Remixed By section');
  assert.ok($collectionCard.find('.panel-body .remixed-by img'), 'Missing Remixed By image');
  assert.ok($collectionCard.find('.panel-body .description'), 'Missing Collection Description');
});
