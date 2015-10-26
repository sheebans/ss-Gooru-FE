import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * List of standars
   * @property {array}
   */
  standards: function(){
  var elements = Ember.A();
    elements.addObject(Ember.Object.create({ id: 1, title: "CCSS.ELA-Literacy.RI.9-10.6", description: "Determine an author’s point of view or purpose in a text and analyze how an author uses rhetoric to advance that point of view or purpose."}));
    elements.addObject(Ember.Object.create({ id: 2, title: "CCSS.ELA-Literacy.RI.9-10.2", description: "Determine a central idea of a text and analyze its development over the course of the text, including how it emerges and is shaped and refined by specific details; provide an objective summary of the text."}));
    elements.addObject(Ember.Object.create({ id: 2, title: "CCSS.ELA-Literacy.RI.9-10.10", description: "By the end of grade 9, read and comprehend literacy nonfiction in the grades 9-10 text complexity band proficiently, with scaffolding as needed at the high end of the range. By the end of grade 10, read and comprehend literary nonfiction at the high end of the grades 9-10 text complexity band independently and proficiently."}));
    elements.addObject(Ember.Object.create({ id: 1, title: "CCSS.ELA-Literacy.RI.9-10.1", description: "Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text."}));
    elements.addObject(Ember.Object.create({ id: 1, title: "CCSS.ELA-Literacy.RI.9-10.1", description: "Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text."}));
    elements.addObject(Ember.Object.create({ id: 1, title: "CCSS.ELA-Literacy.RI.9-10.1", description: "Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text."}));
    elements.addObject(Ember.Object.create({ id: 1, title: "CCSS.ELA-Literacy.RI.9-10.1", description: "Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text."}));
    return elements;
}.property(),
});
