/**
 * Learner proficiency matrix domain chart
 *
 * @module
 * @augments ember/Component
 */
import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({
  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * competency service dependency injection
   * @type {Object}
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['learner-proficiency-domain-matrix'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} width
   */
  width: 780,

  /**
   * @property {Number} height
   */
  height: 700,

  /**
   * User id of competency matrix to plot
   * @type {String}
   */
  userId: null,

  /**
   * Different color range based on status
   * @type {Object}
   */
  colorsBasedOnStatus: Ember.Object.create({
    '0': '#e7e8e9',
    '1': '#1aa9eb',
    '2': '#006eb5',
    '3': '#006eb5',
    '4': '#006eb5',
    '5': '#006eb5'
  }),

  /**
   * Width of the cell
   * @type {Number}
   */
  cellWidth: 30,

  /**
   * height of the cell
   * @type {Number}
   */
  cellHeight: 15,

  /**
   * It will have selected taxonomy subject courses
   * @type {Object}
   */
  taxonomyDomains: Ember.A(),

  /**
   * @type {Object}
   * Property to store user selected subject
   */
  subject: null,

  /**
   * @type {Boolean}
   * Property to show/hide loading spinner
   */
  isLoading: false,

  /**
   * It  will have chart value width scroll width handling
   * @type {String}
   */
  isTaxonomyDomainsAvailable: Ember.computed('taxonomyDomains', function() {
    let component = this;
    let length = component.get('taxonomyDomains').length;
    return length > 0;
  }),

  /**
   * It maintains the number of cells in each column
   * @type {Number}
   */
  numberOfCellsInEachColumn: 0,

  /**
   * It decide  the max number of cells in each column
   * @type {Number}
   */
  maxNumberOfCellsInEachColumn: 20,

  /**
   * This should be the height of cells when maximum number of cell size
   * got exceeds for each column.
   * @type {Number}
   */
  reducedHeightOfCells: 5,

  /**
   * Default height of the chart
   * @type {Number}
   */
  defaultHeightOfChart: 350,

  /**
   * Maximum number of reduce cell below
   * @type {Number}
   */
  maxNumberOfReduceCellBelow: 5,

  /**
   * skyline container
   * @type {Object}
   */
  skylineContainer: null,

  /**
   * @type {Json}
   * Currently selected/active month and year
   */
  timeLine: {},

  /**
   * @type {Boolean}
   * Check is baseline already shown or not
   */
  isBaseLineDrawn: false,

  /**
   * @type {Array}
   * Baseline points
   */
  baselinePoints: Ember.A([]),

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let component = this;
    component.set('isBaseLineDrawn', false);
    if (component.get('subject')) {
      component.loadDataBySubject(component.get('subject.id'));
    }
  },

  /**
   * subjectId  change will call the function
   */
  onChangeSubject: Ember.observer('subject', function() {
    let component = this;
    if (component.get('subject')) {
      component.loadDataBySubject(component.get('subject.id'));
    }
    return null;
  }),

  /**
   * Timeline change will call this function
   */
  onChangeTimeLine: Ember.observer('timeLine', function() {
    let component = this;
    component.loadDataBySubject(component.get('subject.id'));
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function drawChart
   * Method to plot competency chart
   */
  drawChart(data) {
    let component = this;
    let cellSizeInRow = component.get('taxonomyDomains');
    let numberOfCellsInEachColumn = cellSizeInRow.length;
    component.set('numberOfCellsInEachColumn', numberOfCellsInEachColumn);
    const colorsBasedOnStatus = component.get('colorsBasedOnStatus');
    const cellWidth = component.get('cellWidth');
    const cellHeight = component.get('cellHeight');
    const width = Math.round(numberOfCellsInEachColumn * cellWidth);
    component.set('width', width);
    const height = component.get('defaultHeightOfChart');
    component.$('#render-proficiency-matrix').empty();
    const svg = d3
      .select('#render-proficiency-matrix')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    let cellContainer = svg.append('g').attr('id', 'cell-container');
    let skylineContainer = svg.append('g').attr('id', 'skyline-container');
    let baseLineContainer = svg.append('g').attr('id', 'baseline-container');
    component.set('skylineContainer', skylineContainer);
    component.set('baseLineContainer', baseLineContainer);
    const cards = cellContainer.selectAll('.competency').data(data);
    cards
      .enter()
      .append('rect')
      .attr('x', d => (d.xAxisSeq - 1) * cellWidth)
      .attr('y', d => (d.yAxisSeq - 1) * cellHeight)
      .attr('copy-yaxis', d => (d.yAxisSeq - 1) * cellHeight)
      .attr('class', d => {
        let skylineClassName = d.skyline ? 'skyline-competency' : '';
        return `competency ${skylineClassName} competency-${
          d.xAxisSeq
        } competency-${d.xAxisSeq}-${d.yAxisSeq}`;
      })
      .attr('copy-class-name', d => {
        let skylineClassName = d.skyline ? 'skyline-competency' : '';
        return `competency ${skylineClassName} competency-${
          d.xAxisSeq
        } competency-${d.xAxisSeq}-${d.yAxisSeq}`;
      })
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .on('click', function(d) {
        component.sendAction('onSelectCompetency', d);
      })
      .attr('yaxis-seq', d => d.yAxisSeq)
      .style('fill', '#EAEAEA')
      .transition()
      .duration(1000)
      .style('fill', d => {
        return colorsBasedOnStatus.get(d.status.toString());
      });
    cards.exit().remove();
    component.expandChartColumnHeight();
  },

  /**
   * @function loadDataBySubject
   * Method to fetch domain and co-ordinate data using subject id
   */
  loadDataBySubject(subjectId) {
    let component = this;
    let userId = component.get('userId');
    component.set('isLoading', true);
    let timeLine = component.get('timeLine');
    return Ember.RSVP.hash({
      competencyMatrixs: component
        .get('competencyService')
        .getCompetencyMatrixDomain(userId, subjectId, timeLine),
      competencyMatrixCoordinates: component
        .get('competencyService')
        .getCompetencyMatrixCoordinates(subjectId)
    }).then(({ competencyMatrixs, competencyMatrixCoordinates }) => {
      if (!(component.get('isDestroyed') || component.get('isDestroying'))) {
        component.set('isLoading', false);
        let resultSet = component.parseCompetencyData(
          competencyMatrixs.domains,
          competencyMatrixCoordinates
        );
        component.drawChart(resultSet);
        component.sendAction('onGetLastUpdated', competencyMatrixs.lastUpdated);
      } else {
        Ember.Logger.warn('comp is destroyed...');
      }
    }, this);
  },

  /**
   * @function parseCompetencyData
   * Method to parse raw competency matrix and co-ordinate data to plot the chart
   */
  parseCompetencyData(competencyMatrixs, competencyMatrixCoordinates) {
    let component = this;
    const cellHeight = component.get('cellHeight');
    let taxonomyDomain = Ember.A();
    let domains = competencyMatrixCoordinates.get('domains');
    let currentXaxis = 1;
    let resultSet = Ember.A();
    let numberOfCellsInEachColumn = Ember.A();
    domains.forEach(domainData => {
      let domainCode = domainData.get('domainCode');
      let domainName = domainData.get('domainName');
      let domainSeq = domainData.get('domainSeq');
      let competencyMatrix = competencyMatrixs.findBy('domainCode', domainCode);
      let competencyMatrixByCompetency = competencyMatrix
        ? competencyMatrix.get('competencies')
        : [];
      if (competencyMatrix && competencyMatrixByCompetency.length > 0) {
        taxonomyDomain.pushObject(domainData);
        let mergeDomainData = Ember.A();
        competencyMatrixByCompetency.forEach(competency => {
          let competencyCode = competency.get('competencyCode');
          let competencyName = competency.get('competencyName');
          let competencySeq = competency.get('competencySeq');
          let status = competency.get('status');
          let data = Ember.Object.create({
            domainName: domainName,
            domainCode: domainCode,
            domainSeq: domainSeq,
            competencyCode: competencyCode,
            competencyName: competencyName,
            competencySeq: competencySeq,
            competencyStudentDesc: competency.get('competencyStudentDesc'),
            status: status
          });
          if (status === 2 || status === 3 || status === 4 || status === 5) {
            mergeDomainData.forEach(data => {
              data.set('status', status);
              data.set('isMastery', true);
            });
            data.set('isMastery', true);
          }
          mergeDomainData.pushObject(data);
        });
        let masteredCompetencies = mergeDomainData.filterBy('isMastery', true);
        if (masteredCompetencies && masteredCompetencies.length === 0) {
          mergeDomainData.objectAt(0).set('skyline', true);
        } else {
          let numberOfMasteredCompetency = masteredCompetencies.length - 1;
          mergeDomainData
            .objectAt(numberOfMasteredCompetency)
            .set('skyline', true);
          mergeDomainData
            .objectAt(numberOfMasteredCompetency)
            .set('mastered', true);
        }

        let cellIndex = 1;
        numberOfCellsInEachColumn.push(mergeDomainData.length);
        mergeDomainData.forEach(data => {
          data.set('xAxisSeq', currentXaxis);
          data.set('yAxisSeq', cellIndex);
          resultSet.pushObject(data);
          cellIndex++;
        });
        currentXaxis = currentXaxis + 1;
      }
    });
    let height = cellHeight * Math.max(...numberOfCellsInEachColumn);
    component.set('height', height);
    component.set('taxonomyDomains', taxonomyDomain);
    return resultSet;
  },

  /**
   * @function reduceChartBelowCells
   * Method to reduce chart bottom cells based on the available height and number of competencies
   */
  reduceChartBelowCells() {
    let component = this;
    let skylines = component.$('.skyline-competency');
    let maxNumberOfCellsInEachColumn = component.get(
      'maxNumberOfCellsInEachColumn'
    );
    let reducedHeightOfCells = component.get('reducedHeightOfCells');
    let cellHeight = component.get('cellHeight');
    let maxNumberOfReduceCellBelow = component.get(
      'maxNumberOfReduceCellBelow'
    );
    for (let index = 0; index < skylines.length; index++) {
      let skyline = component.$(skylines[index]);
      let skylineYAxisSeq = +skyline.attr('yaxis-seq');
      if (skylineYAxisSeq > maxNumberOfCellsInEachColumn) {
        let aboveMaxCells = skylineYAxisSeq - maxNumberOfCellsInEachColumn;
        let domainColumnIndex = index + 1;
        let competencyCells = component.$(`.competency-${domainColumnIndex}`);
        let belowReduceCount = 1;
        let yAxis = 0;
        for (
          let cellIndex = 0;
          cellIndex < competencyCells.length;
          cellIndex++
        ) {
          let element = component.$(competencyCells[cellIndex]);
          let height = cellHeight;
          if (belowReduceCount < aboveMaxCells) {
            height = reducedHeightOfCells;
          }
          if (cellIndex > 0) {
            if (belowReduceCount <= aboveMaxCells) {
              if (belowReduceCount > maxNumberOfReduceCellBelow) {
                yAxis = yAxis + 0;
              } else {
                yAxis = yAxis + reducedHeightOfCells;
              }
              let className = element.attr('class');
              element.attr(
                'class',
                `${className} competency-more-cells-${domainColumnIndex} competency-more-cells`
              );
              belowReduceCount++;
            } else {
              yAxis = yAxis + cellHeight;
            }
          }
          element.attr('y', yAxis);
          element.attr('height', height);
        }
      }
    }
  },

  /**
   * @function reduceChartAboveCells
   * Method to reduce chart top cells to shrink the chart within given widh and height
   */
  reduceChartAboveCells() {
    let component = this;
    let numberOfDomainColumn = component.get('taxonomyDomains').length;
    let maxNumberOfCellsInEachColumn = component.get(
      'maxNumberOfCellsInEachColumn'
    );
    let reducedHeightOfCells = component.get('reducedHeightOfCells');
    for (let index = 1; index <= numberOfDomainColumn; index++) {
      let elements = component.$(`.competency-${index}`);
      let totalCompetencyInDomain = elements.length;
      let belowReducedCellElements = component.$(
        `.competency-more-cells-${index}`
      );
      let numberOfBelowReducedCells = belowReducedCellElements.length;
      let totalCellsWithoutReduce =
        totalCompetencyInDomain - numberOfBelowReducedCells;
      if (totalCellsWithoutReduce > maxNumberOfCellsInEachColumn) {
        let aboveReduceCellIndex =
          numberOfBelowReducedCells > 0
            ? numberOfBelowReducedCells + maxNumberOfCellsInEachColumn
            : maxNumberOfCellsInEachColumn;
        let startIndex = aboveReduceCellIndex + 1;
        let startElement = component.$(`.competency-${index}-${startIndex}`);
        let newYAxis = +startElement.attr('y');
        for (
          let cellIndex = aboveReduceCellIndex;
          cellIndex < elements.length;
          cellIndex++
        ) {
          let element = component.$(elements[cellIndex]);
          element.attr('height', reducedHeightOfCells);
          if (cellIndex > aboveReduceCellIndex) {
            newYAxis = newYAxis + reducedHeightOfCells;
            element.attr('y', newYAxis);
          }
          let className = element.attr('class');
          element.attr(
            'class',
            `${className} competency-more-cells-${index} competency-more-cells`
          );
        }
      }
    }
  },

  /**
   * @function reduceChartHeight
   * Method to reduce chart height to compress the chart within available space
   */
  reduceChartHeight() {
    let component = this;
    component.reduceChartBelowCells();
    component.reduceChartAboveCells();
    component.drawSkyline();

    let height = component.get('isTaxonomyDomainsAvailable')
      ? component.get('defaultHeightOfChart')
      : 50;
    component.$('#render-proficiency-matrix').height(height);
    component.$('#render-proficiency-matrix svg').attr('height', height);
  },

  expandChartColumnHeight() {
    let component = this;
    let elements = component.$('.competency');
    for (let index = 0; index < elements.length; index++) {
      let element = component.$(elements[index]);
      let cellHeight = component.get('cellHeight');
      let yAxis = element.attr('copy-yaxis');
      let className = element.attr('copy-class-name');
      element.attr('height', cellHeight);
      element.attr('class', className);
      element.attr('y', yAxis);
    }
    component.drawSkyline();
    component.drawBaseLine();
    let height = component.get('height');
    component.$('#render-proficiency-matrix').height(height);
    component.$('#render-proficiency-matrix svg').attr('height', height);
    component.$('.scrollable-chart').scrollTop(height);
  },

  /**
   * @function drawSkyline
   * Method to draw skyline over the competency cell
   */
  drawSkyline() {
    let component = this;
    let skylineElements = component.$('.skyline-competency');
    let cellWidth = component.get('cellWidth');
    let cellHeight = component.get('cellHeight');
    component.$('line').remove();
    let svg = component.get('skylineContainer');
    let cellIndex = 0;
    skylineElements.each(function(index) {
      let x1 = parseInt(component.$(skylineElements[index]).attr('x'));
      let y1 = parseInt(component.$(skylineElements[index]).attr('y'));
      y1 = y1 === 0 ? y1 + 3 : y1 + cellHeight + 3;
      let x2 = x1 + cellWidth;
      let y2 = y1;
      let linePoint = {
        x1,
        y1,
        x2,
        y2
      };
      svg
        .append('line')
        .attr('x1', linePoint.x1)
        .attr('y1', linePoint.y1)
        .attr('x2', linePoint.x2)
        .attr('y2', linePoint.y2)
        .attr('class', `sky-line-${cellIndex}`);
      component.joinSkyLinePoints(cellIndex, linePoint);
      cellIndex++;
    });
  },

  /**
   * @function joinSkyLinePoints
   * Method to draw vertical line to connects sky line points, if necessary
   */
  joinSkyLinePoints(cellIndex, curLinePoint) {
    let component = this;
    let lastSkyLineContainer = component.$(`.sky-line-${cellIndex - 1}`);
    let skyLineContainer = component.get('skylineContainer');
    let lastskyLinePoint = {
      x2: parseInt(lastSkyLineContainer.attr('x2')),
      y2: parseInt(lastSkyLineContainer.attr('y2'))
    };
    //Connect sky line points if last and current points are not same
    if (
      lastSkyLineContainer.length &&
      lastskyLinePoint.y2 !== curLinePoint.y1
    ) {
      //Increase extra height to connect intersection points
      if (lastskyLinePoint.y2 > curLinePoint.y1) {
        lastskyLinePoint.y2 = lastskyLinePoint.y2 + 3;
        curLinePoint.y1 = curLinePoint.y1 - 3;
      } else {
        lastskyLinePoint.y2 = lastskyLinePoint.y2 - 3;
        curLinePoint.y1 = curLinePoint.y1 + 3;
      }

      skyLineContainer
        .append('line')
        .attr('x1', lastskyLinePoint.x2)
        .attr('y1', lastskyLinePoint.y2)
        .attr('x2', curLinePoint.x1)
        .attr('y2', curLinePoint.y1)
        .attr('class', `sky-line-vertical-${cellIndex}`);
    }
  },

  /**
   * @function drawBaseLine
   * Method to draw base line over the competency
   */
  drawBaseLine() {
    let component = this;
    let subjectBucket = component.get('subjectBucket');
    let subjectId = component.get('subject.id');
    let isOwnSubject = subjectBucket.split(subjectId).length > 1;
    if (!component.get('isBaseLineDrawn') || isOwnSubject) {
      let classId = component.get('class.id');
      let courseId = component.get('class.courseId');
      let userId = component.get('userId');
      let cellHeight = component.get('cellHeight');
      let cellWidth = component.get('cellWidth');
      return Ember.RSVP.hash({
        userProficiencyBaseLine: component
          .get('competencyService')
          .getUserProficiencyBaseLine(classId, courseId, userId),
        competencyMatrixCoordinates: component
          .get('competencyService')
          .getCompetencyMatrixCoordinates(subjectId)
      }).then(({ userProficiencyBaseLine, competencyMatrixCoordinates }) => {
        let baseLineDomains = userProficiencyBaseLine.domains;
        let domains = competencyMatrixCoordinates.domains;
        let cellIndex = 0;
        let baselinePoints = Ember.A([]);
        domains.map(domain => {
          let domainData = baseLineDomains.findBy(
            'domainCode',
            domain.domainCode
          );
          let domainCompetencies = domainData ? domainData.competencies : [];
          let domainWiseMasteredCompetencies = Ember.A([]);
          domainCompetencies.map(competency => {
            //Consider only the mastered competencies
            if (competency.status === 4 || competency.status === 5) {
              domainWiseMasteredCompetencies.push(competency);
            }
          });
          let numberOfMasteredCompetency =
            domainWiseMasteredCompetencies.length;
          let masteredCompetencyHighestSeq = numberOfMasteredCompetency
            ? domainWiseMasteredCompetencies[numberOfMasteredCompetency - 1]
              .competencySeq
            : 0;
          let x1 = cellIndex * cellWidth;
          let y1 = cellHeight * masteredCompetencyHighestSeq; //stroke width
          let isSkyLineContainer = component.$(
            `.sky-line-vertical-${cellIndex + 1}`
          );
          //check skyline is present in the cell and adjust y1 height
          y1 =
            y1 === parseInt(isSkyLineContainer.attr('y1')) - 6 ||
            y1 === parseInt(isSkyLineContainer.attr('y1')) ||
            y1 === 0
              ? y1 + 3
              : y1;

          let x2 = x1 + cellWidth;
          let y2 = y1;

          let linePoint = {
            x1: x1,
            x2: x2,
            y1: y1,
            y2: y2,
            isHorizontal: true
          };
          baselinePoints.push(linePoint);
          component.set('baselinePoints', baselinePoints);
          cellIndex++;
        });
        component.drawVerticalBaseLine();
        component.sendAction(
          'onShownBaseLine',
          userProficiencyBaseLine.lastUpdated
        );
        component.set('isBaseLineDrawn', true);
      });
    }
  },

  /**
   * @function drawVerticalBaseLine
   * Method to draw vertical base line points
   */
  drawVerticalBaseLine() {
    let component = this;
    let baselinePoints = component.get('baselinePoints');
    let index = 0;
    baselinePoints.map(baselinePoint => {
      component.joinBaseLinePoints(index, baselinePoint, baselinePoints);
      index++;
    });
    component.drawHorizontalBaseline();
  },

  /**
   * @function drawHorizontalBaseline
   * Method to draw horizontal line to connects vertical base line points
   */
  drawHorizontalBaseline() {
    let component = this;
    let baselinePoints = component.get('baselinePoints');
    let baseLineContainer = d3.select('#baseline-container');
    let index = 0;
    baselinePoints.map(baselinePoint => {
      if (index > 0) {
        let baseLineContainer = component.$(`.base-line-vertical-${index - 1}`);
        if (baseLineContainer.length > 0) {
          baselinePoint.x1 = baseLineContainer.attr('x2');
        }
      }

      //Increase x2 position when no vertical baseline
      let nextSkyLineContainer = component.$(`.sky-line-vertical-${index + 1}`);
      let nextBaseLineVerticalContainer = component.$(
        `.base-line-vertical-${index}`
      );
      if (
        !nextBaseLineVerticalContainer.length &&
        nextSkyLineContainer.length &&
        baselinePoint.y1 <= 6
      ) {
        baselinePoint.x2 = baselinePoint.x2 + 6;
      }

      let x2 = baselinePoint.x2;
      let x1 = baselinePoint.x1;
      let y1 = baselinePoint.y1;
      let y2 = baselinePoint.y2;
      baseLineContainer
        .append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('class', `base-line-${index}`);
      index++;
    });
  },

  /**
   * @function joinBaseLinePoints
   * Method to draw vertical line to connects base line points, if necessary
   */
  joinBaseLinePoints(cellIndex, curLinePoint, baselinePoints) {
    let component = this;
    let nextBaseLineContainer = baselinePoints[cellIndex + 1];
    if (nextBaseLineContainer && nextBaseLineContainer.isHorizontal) {
      let baseLineContainer = component.get('baseLineContainer');
      if (nextBaseLineContainer.y2 !== curLinePoint.y1) {
        let linePoint = {
          x1: curLinePoint.x2,
          x2: curLinePoint.x2,
          y1: curLinePoint.y1,
          y2: nextBaseLineContainer.y2,
          isHorizontal: false
        };

        baseLineContainer
          .append('line')
          .attr('x1', linePoint.x1)
          .attr('y1', linePoint.y1)
          .attr('x2', linePoint.x2)
          .attr('y2', linePoint.y2) //Join baseline with the skyline border
          .attr('class', `base-line-vertical-${cellIndex}`);
      }
    }
  },

  /**
   * @function toggleChartSize
   * Method to toggle chart size between expanded and collapsed
   */
  toggleChartSize() {
    let component = this;
    let isExpandChartEnabled = component.get('isExpandChartEnabled');
    if (isExpandChartEnabled) {
      component.expandChartColumnHeight();
    } else {
      component.reduceChartHeight();
    }
  }
});
