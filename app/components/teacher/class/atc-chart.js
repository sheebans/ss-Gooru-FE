import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['atc-chart'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * Analytics Service
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * Class Service
   */
  classService: Ember.inject.service('api-sdk/class'),

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let component = this;
    let performanceSummaryPromise = component.getAtcPerformanceSummary();
    performanceSummaryPromise.then(function(performanceSummary) {
      component.getClassMembers().then(function(classMembers) {
        component.set('chartData', component.getStudentWisePerformance(classMembers, performanceSummary));
      });
    });
  },

  /**
   * Observer to watch class data changes
   */
  classDataObserver: Ember.observer('classData', function() {
    const component = this;
    let performanceSummaryPromise = component.getAtcPerformanceSummary();
    performanceSummaryPromise.then(function(performanceSummary) {
      component.getClassMembers().then(function(classMembers) {
        component.set('chartData', component.getStudentWisePerformance(classMembers, performanceSummary));
      });
    });
  }),

  /**
   * Observer to watch chart data changes
   */
  chartDataObserver: Ember.observer('chartData', function() {
    const component = this;
    d3.select('svg.atc-chart').remove();
    component.drawchart();
  }),


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /*
     * Action triggered when the user click reset zoom
     */
    onClearZoom() {
      const component = this;
      d3.select('svg.atc-chart').remove();
      component.drawchart();
      component.set('isZoomInView', false);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function getAtcPerformanceSummary
   * Method to fetch class performance for the ATC view
   */
  getAtcPerformanceSummary() {
    const component = this;
    const analyticsService = component.get('analyticsService');
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    return Ember.RSVP.resolve(
      analyticsService.getAtcPerformanceSummary(classId, courseId)
    );
  },

  /**
   * @function getClassMembers
   * Method to fetch class members
   */
  getClassMembers() {
    const component = this;
    const classService = component.get('classService');
    let classId = component.get('classId');
    let classMembersPromise = Ember.RSVP.resolve(classService.readClassMembers(classId));
    return Ember.RSVP.hash({
      classMembers: classMembersPromise
    })
      .then(function(hash) {
        return hash.classMembers.members;
      });
  },

  /**
   * @function getStudentWisePerformance
   * Method to organize student wise performance data
   */
  getStudentWisePerformance(students, performances) {
    const component = this;
    let studentsPerformanceData = Ember.A([]);
    if (students && Ember.isArray(students)) {
      students.map( student => {
        let studentPerformance = performances.findBy('userId', student.id);
        let studentData = {
          id: student.id,
          thumbnail: student.avatarUrl,
          identity: component.getStudentIdentity(student),
          score: 0,
          progress: 0
        };
        if (studentPerformance) {
          studentData.score = studentPerformance.score || 0;
          studentData.progress = studentPerformance.progress || 0;
        }
        studentsPerformanceData.push(studentData);
      });
    }
    return studentsPerformanceData;
  },

  /**
   * @function getStudentIdentity
   * Method to find out student identity to show in the ATC view chart
   */
  getStudentIdentity(student) {
    let identity = 'NA';
    if (student) {
      if (student.firstName || student.lastName) {
        let firstName = student.firstName;
        let lastName = student.lastName;
        identity = `${firstName ? firstName.charAt(0) : ''  } ${  lastName ? lastName.charAt(0) : ''}`;
      } else if (student.email) {
        let validEmailChars = student.email.split('@')[0];
        identity = validEmailChars.substring(0, 2);
      } else if (student.username) {
        identity = student.username.substring(0, 2);
      }
    }
    return identity;
  },

  /**
   * @function drawchart
   * Method to draw ATC view chart
   */
  drawchart() {
    let component = this;

    var margin = {top: 20, right: 100, bottom: 50, left: 100},
      width = 960 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    var dataset = component.get('chartData');

    var maxScore = d3.max(dataset, function(d){ return d.score; });
    var maxProgress = d3.max(dataset, function(d){ return d.progress; });
    var minScore = d3.min(dataset, function(d){ return d.score; });
    var minProgress = d3.min(dataset, function(d){ return d.progress; });
    var axisDomain = [0, 100];

    if (maxScore === 100 || maxProgress === 100 || minScore === 0 || minProgress === 0) {
      axisDomain = [-10, 110];
    }
    var xScale = d3.scale.linear()
      .domain(axisDomain)
      .range([0, width]);

    var yScale = d3.scale.linear()
      .domain(axisDomain)
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .innerTickSize(-height)
      .outerTickSize(-520)
      .tickPadding(10);

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .innerTickSize(-width)
      .outerTickSize(-760)
      .tickPadding(10);

    var svg = d3.select(component.element).append('svg')
      .attr('class', 'atc-chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .call(
        d3.behavior.zoom()
          .scaleExtent([1, 10])
          .x(xScale)
          .y(yScale)
          .on('zoom', function () {
            svg.select('.x.axis').call(xAxis);
            svg.select('.y.axis').call(yAxis);
            svg.selectAll('.student-profile').attr('x', function(d) {
              return xScale(d.progress);
            }).attr('y', function(d) {
              return yScale(d.score);
            });
            svg.selectAll('.student-info')
              .attr('y', function(d) { return yScale(d.score)+ 40; })
              .attr('x', function(d) { return xScale(d.progress); });
            component.cleanUpChart();
            component.set('isZoomInView', true);
          }))
      .append('g')
      .attr('transform', `translate(${  margin.left  },${  margin.top  })`);


    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${  height  })`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);


    svg.append('g')
      .attr('transform', 'translate(-460, 450) rotate(-90)')
      .append('text')
      .attr('class', 'placeholder')
      .attr('x', '50')
      .attr('y', '445')
      .text('Performance');

    svg.append('g')
      .attr('transform', 'translate(0, 20) rotate(0)')
      .append('text')
      .attr('class', 'placeholder')
      .attr('x', '0')
      .attr('y', height)
      .text('Progress');

    var images =  svg.selectAll('.student-profiles').data(dataset);
    images
      .enter()
      .append('svg:image')
      .attr('class', 'student-profile')
      .attr('y', function(d) { return yScale(d.score); })
      .attr('x', function(d) { return xScale(d.progress); })
      .attr({
        'xlink:href': function(d) { return d.thumbnail; },
        width: 30,
        height: 30
      });

    images.enter()
      .append('text')
      .attr('class', 'student-info')
      .attr('y', function(d) { return yScale(d.score)+ 42; })
      .attr('x', function(d) { return xScale(d.progress) + 7; })
      .text(function(d) {
        return d.identity;
      });
    component.cleanUpChart();
    component.set('isLoading', false);
  },

  /**
   * @function cleanUpChart
   * Method to clean up chart views as per requirement
   */
  cleanUpChart() {
    const axes = ['x', 'y'];
    axes.map( axis => {
      var axisContainer = d3.selectAll(`.${axis}.axis .tick`);
      axisContainer
        .attr('style', function(d, i) {
          var curAxisElement = d3.select(this);
          var curAxisText = curAxisElement.select('text');
          curAxisText.text(`${curAxisText.text()  }%`);
          if (i%2 !== 0 || i === 0) {
            curAxisElement.remove();
          }
        });
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String}
   * Property to store active class id
   */
  classId: Ember.computed('classData', function() {
    const component = this;
    return component.get('classData.id');
  }),

  /**
   * @property {String}
   * Property to store active class's course id
   */
  courseId: Ember.computed('classData', function() {
    const component = this;
    return component.get('classData.courseId');
  }),

  /**
   * @property {Boolean}
   * Property to show/hide loading spinner
   */
  isLoading: true,

  /**
   * @property {Boolean}
   * Property to show/hide reset chart
   */
  isZoomInView: false

});
