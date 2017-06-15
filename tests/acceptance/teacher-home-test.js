import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | Teacher Home Landing page', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      'token-api3': 'user-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  assert.expect(10);
  visit('/teacher-home');

  andThen(function() {
    assert.equal(currentURL(), '/teacher-home');

    T.exists(assert, find('header.gru-header'), 'Header component not found');

    const $teacherContainer = find('.controller.teacher-landing');
    T.exists(assert, $teacherContainer, 'Missing teacher container');
    const $teacherPanel = $teacherContainer.find('.teacher-panel');
    T.exists(assert, $teacherPanel.find('.greetings'), 'Missing teacher greetings');
    const $navigatorContainer = $teacherPanel.find('.teacher-navigator');
    T.exists(assert, $navigatorContainer, 'Missing teacher navigator');
    T.exists(assert, $teacherPanel.find('.actions .create-class-cta'), 'Missing create class button');
    assert.ok($('#active-classes').hasClass('active'), 'Active classes should be visible');
    const $tabContent = $teacherPanel.find('.tab-content');
    assert.equal($tabContent.find('#active-classes .gru-teacher-class-card').length, 13 ,'Wrong number of current class cards');
    click('#archived-classes');
    andThen(function() {
      assert.ok($('span.no-archived'), 'Missing no archived available lead');
      assert.equal($tabContent.find('#archived-classes .gru-class-card').length, 2 ,'Wrong number of archived class cards');
    });
  });
});

test('Take A Tour', function(assert){
  assert.expect(2);
  visit('/teacher-home');
  andThen(function() {
    let $tooltip;
    click('.app-container .gru-take-tour button.start-tour');
    andThen(function() {
      $tooltip = $('div.introjs-tooltip');

      T.exists(assert, $tooltip, 'First step of the tour should display a tooltip');
      assert.equal(T.text($tooltip.find('.tour-header h2')), 'Your Homepage', 'First step title should be "Your Homepage"');
    });
  });
});

test('Valid bubble chart when the class does not has performance', function(assert) {
  visit('/teacher-home');

  andThen(function() {
    assert.equal(currentURL(), '/teacher-home');
    let $chart = find('.gru-teacher-class-card:nth-child(2) .gru-bubble-chart .bubble-circle');
    assert.equal($chart.attr('style'),'background-color:#949A9F','Incorrect chart color');
    assert.equal($chart.find('span').text(),'--','Incorrect score');
  });
});

test('Class order', function(assert) {
  visit('/teacher-home');

  andThen(function() {
    assert.equal(currentURL(), '/teacher-home');
    let $title = find('.gru-teacher-class-card:nth-child(1) h5');
    assert.equal($title.text().trim(),'Last Class Pochita as Teacher','Incorrect first class');
  });
});

test('Sort Archive Classes by Date Asc and Desc', function(assert) {
  assert.expect(5);
  visit('/teacher-home');

  andThen(function() {
    assert.equal(currentURL(), '/teacher-home');
    click('.gru-welcome-message .actions .cancel');
    andThen(function() {
      let $archived = find('.teacher-navigator li.archived-classes a');
      click($archived);
      andThen(function() {
        let $sortByDate = find('.sort .filter-date-asc .filter-date');
        click($sortByDate);
        andThen(function() {
          let $class1 = find('.gru-class-card:first-child h5');
          assert.equal($class1.text().trim(),'Archive Class-2','Incorrect first class');
          let $class2 = find('.gru-class-card:last-child h5');
          assert.equal($class2.text().trim(),'1-Archive Class','Incorrect last class');
          click($sortByDate);
          andThen(function() {
            let $class1 = find('.gru-class-card:first-child h5');
            assert.equal($class1.text().trim(),'1-Archive Class','Incorrect first class');
            let $class2 = find('.gru-class-card:last-child h5');
            assert.equal($class2.text().trim(),'Archive Class-2','Incorrect last class');
          });
        });
      });
    });
  });
});

test('Sort Archive Classes by Title Asc and Desc', function(assert) {
  assert.expect(5);
  visit('/teacher-home');

  andThen(function() {
    assert.equal(currentURL(), '/teacher-home');
    click('.gru-welcome-message .actions .cancel');
    andThen(function() {
      let $archived = find('.teacher-navigator li.archived-classes a');
      click($archived);
      andThen(function() {
        let $sortByTitle = find('.sort .filter-date-asc .filter-asc');
        click($sortByTitle);
        andThen(function() {
          let $class1 = find('.gru-class-card:first-child h5');
          assert.equal($class1.text().trim(),'1-Archive Class','Incorrect first class');
          let $class2 = find('.gru-class-card:last-child h5');
          assert.equal($class2.text().trim(),'Archive Class-2','Incorrect last class');
          click($sortByTitle);
          andThen(function() {
            let $class1 = find('.gru-class-card:first-child h5');
            assert.equal($class1.text().trim(),'Archive Class-2','Incorrect first class');
            let $class2 = find('.gru-class-card:last-child h5');
            assert.equal($class2.text().trim(),'1-Archive Class','Incorrect last class');
          });
        });
      });
    });
  });
});
