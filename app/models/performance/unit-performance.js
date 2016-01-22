import DS from 'ember-data';
import PerformanceModel from './performance';


export default PerformanceModel.extend({

  unit: DS.belongsTo("unit/unit", { async: true })

});
