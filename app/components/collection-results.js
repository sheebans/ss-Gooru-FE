import Ember from 'ember';

export default Ember.Component.extend({

    /**
     * Selected subject item
     * @property {array}
     */
    results: function(){
        //@todo: use data retrieved in the route
        const items = Ember.A();
        items.addObject(Ember.Object.create({
            id: 1,
            remixes: 4,
            views: 53,
            title: "Common Core State Standard",
            image: "http://www.goorulearning.org/images/default-collection-image-160x120.png",
            author: "Common Core State Standard",
            authorImage: "Common Core State Standard",
            profilePageUrl: "Common Core State Standard",
            description: "Common Core State Standard",
            resources: "Common Core State Standard",
            standards: "Common Core State Standard"
            }));
        items.addObject(Ember.Object.create({ id: 2, name: "CA SS", title: "California State Standard"}));
        items.addObject(Ember.Object.create({ id: 2, name: "NGSS", title: "Next Generation State Standard"}));
        return items;
    }.property()
});
