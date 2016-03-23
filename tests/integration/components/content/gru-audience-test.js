import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/gru-audience', 'Integration | Component | content/gru audience', {
  integration: true
});

test('Audience Read Only Layout', function(assert) {
 var audienceList= [{
   'value':1,
   'label':'common.audienceList.all',
   'checked':true
 },
   {
     'value':2,
     'label':'common.audienceList.teachers',
     'checked':false
   }];
  this.set('audienceList',audienceList);
  this.render(hbs`
    {{content.gru-audience isEditing=false audienceList=audienceList}}
  `);

  var $component = this.$();
  var $audienceComponent = $component.find(".gru-audience");

  assert.equal($audienceComponent.find('span.audience-label').text(), 'Audience', 'Incorrect title');
  assert.equal($audienceComponent.find('.btn-empty').length, 1, 'Incorrect number of audience selected');
  assert.equal($audienceComponent.find('.btn-empty').text(), 'All Students', 'Incorrect audience text');
});

test('Audience Edit Layout', function(assert) {
  var audienceList= [{
    'value':1,
    'label':'common.audienceList.all',
    'checked':true
  },
    {
      'value':2,
      'label':'common.audienceList.teachers',
      'checked':false
    }];
  this.set('audienceList',audienceList);
  this.render(hbs`
    {{content.gru-audience isEditing=true audienceList=audienceList}}
  `);

  var $component = this.$();
  var $audienceComponent = $component.find(".gru-audience");
  assert.equal($audienceComponent.find('span.audience-label').text(), 'Audience', 'Incorrect title');
  assert.ok($audienceComponent.find('.dropdown-toggle'), 'Missing Dropdown');
  assert.equal($audienceComponent.find('.dropdown-toggle').text().trim(), '+ Add', 'Incorrect Dropdown Label');
  assert.equal($audienceComponent.find('.btn-audience .btn-label').text(), 'All Students', 'Incorrect audience text');
  assert.ok($audienceComponent.find('.btn-audience i.clear'), 'Missing remove audience icon');
});
test('Audience Edit Remove Audience', function(assert) {
  var audienceList= [{
    'value':1,
    'label':'common.audienceList.all',
    'checked':true
  },
    {
      'value':2,
      'label':'common.audienceList.teachers',
      'checked':false
    }];
  this.set('audienceList',audienceList);
  this.on('changeAudience', function(audienceList){
    assert.equal(audienceList[0].checked, false);
    assert.equal(audienceList[1].checked, false);
  });

  this.render(hbs`
    {{content.gru-audience isEditing=true audienceList=audienceList onChangeAudience=(action "changeAudience")}}
  `);

  var $component = this.$();
  var $audienceComponent = $component.find(".gru-audience");
  var $close = $audienceComponent.find('.btn-audience i.clear');
  $close.click();
});

test('Audience Edit Add Audience', function(assert) {
  var audienceList= [{
    'value':1,
    'label':'common.audienceList.all',
    'checked':false
  },
    {
      'value':2,
      'label':'common.audienceList.teachers',
      'checked':false
    }];
  this.set('audienceList',audienceList);
  this.on('changeAudience', function(audienceList){
    assert.equal(audienceList[0].checked, true);
    assert.equal(audienceList[1].checked, false);
  });

  this.render(hbs`
    {{content.gru-audience isEditing=true audienceList=audienceList onChangeAudience=(action "changeAudience")}}
  `);

  var $component = this.$();
  var $audienceComponent = $component.find(".gru-audience");
  var $dropdown = $audienceComponent.find('.dropdown-toggle');
  var $firstAudience = $audienceComponent.find('.dropdown-menu li:eq(0) label input');
  $dropdown.click();
  $firstAudience.click();
});
