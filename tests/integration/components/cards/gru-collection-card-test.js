import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('cards/gru-collection-card', 'Integration | Component | cards/gru collection card', {
  integration: true
});

test('Collection Card Layout', function(assert) {
  var collection = Ember.Object.create({
    title: "Collection Title",
    questionCount:4,
    isAssessment:false,
    standards:Ember.A([Ember.Object.create({
      description:"Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.",
      code:"CCSS.Math.Content.7.RP.A.3"
    }),Ember.Object.create({
      description:"Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.",
      code:"CCSS.Math.Content.5.NBT.A.2"
    })]),
    owner: Ember.Object.create({
      id: 'owner-id',
      username: 'dara.weiner',
      avatarUrl: 'avatar-url'
    }),
    remixedBy:["James","Andrea","Patric"]
  });

  this.set('collection', collection);
  this.render(hbs`{{cards/gru-collection-card collection=collection}}`);
  var $component = this.$(); //component dom element
  const $collectionCard = $component.find(".gru-collection-card");
  T.exists(assert, $collectionCard.find(".panel-heading h6.title"), "Missing Title");
  T.exists(assert, $collectionCard.find(".panel-heading .image img"), "Missing Collection Image");
  T.exists(assert, $collectionCard.find(".panel-heading .question-resources"), "Missing Question and Resource Label");
  T.exists(assert, $collectionCard.find(".panel-heading .course"), "Missing Course Label");
  T.exists(assert, $collectionCard.find(".panel-heading .course"), "Missing Course Label");
  T.exists(assert, $collectionCard.find(".panel-body .standards"), "Missing Standards");
  T.exists(assert, $collectionCard.find(".panel-body .remixed-by"), "Missing Remixed By section");
  T.exists(assert, $collectionCard.find(".panel-body .remixed-by img"), "Missing Remixed By image");
  T.exists(assert, $collectionCard.find(".panel-body .description"), "Missing Collection Description");
  T.exists(assert, $collectionCard.find(".panel-body .remix-btn"), "Missing Remixed Button");
});

test('Assessment Card Layout', function(assert) {
  var assessment = Ember.Object.create({
    title: "Biodiversity at All Three Levels",
    resourceCount: 3,
    questionCount:4,
    isAssessment:true,
    standards:Ember.A([Ember.Object.create({
      description:"Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.",
      code:"CCSS.Math.Content.7.RP.A.3"
    }),Ember.Object.create({
      description:"Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.",
      code:"CCSS.Math.Content.5.NBT.A.2"
    }),Ember.Object.create({
      description:"Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.",
      code:"CCSS.Math.Content.5.NBT.A.2"
    })]),
    author:"dara.weiner",
    description:"Students will be able to break salt down into its basic chemical components (NaCl) and describe how these atoms come together to form this important compound."
  });

  this.set('assessment', assessment);
  this.render(hbs`{{cards/gru-collection-card collection=assessment}}`);
  var $component = this.$(); //component dom element
  const $collectionCard = $component.find(".gru-collection-card");
  T.exists(assert, $collectionCard.find(".panel-heading h6.title"), "Missing Title");
  T.exists(assert, $collectionCard.find(".panel-heading .image img"), "Missing Collection Image");
  T.exists(assert, $collectionCard.find(".panel-heading .question-resources"), "Missing Question and Resource Label");
  T.exists(assert, $collectionCard.find(".panel-heading .course"), "Missing Course Label");
  T.exists(assert, $collectionCard.find(".panel-heading .course"), "Missing Course Label");
  T.exists(assert, $collectionCard.find(".panel-body .standards"), "Missing Standards");
  T.exists(assert, $collectionCard.find(".panel-body .author"), "Missing Remixed By section");
  T.exists(assert, $collectionCard.find(".panel-body .author img"), "Missing Remixed By image");
  T.exists(assert, $collectionCard.find(".panel-body .description"), "Missing Collection Description");
  T.exists(assert, $collectionCard.find(".panel-body .remix-btn"), "Missing Remixed Button");
});
