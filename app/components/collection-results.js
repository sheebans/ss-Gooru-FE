import Ember from 'ember';

export default Ember.Component.extend({

    /**
     * Selected collection results items
     * @property {array}
     */
    results: function(){
        //@todo: use data retrieved in the route
        var items = Ember.A();

        var itemsResources = Ember.A();
        itemsResources.addObject(Ember.Object.create({ name: "Preparing the Learner", image: "http://cdn.goorulearning.org/prod1/f000/2137/8066/b9396c20-90f6-4bc1-b434-a39386f5e7b3_0480a001-2070-40b9-b211-ef67638a33d0.jpg", type: "text"}));
        itemsResources.addObject(Ember.Object.create({ name: "Activity 2and 3", image:"", type: "text"}));
        itemsResources.addObject(Ember.Object.create({ name: "Brain Pop", image:"http://cdn.goorulearning.org/prod1/f000/1436/8541/cd5cfba2-591d-492f-946f-07a4c1df5432_cb55ce82-67d7-46b5-b657-9ac6ff5851d6.gif", type: "webpage"}));
        itemsResources.addObject(Ember.Object.create({ name: "The Three Types of Irony", image:"http://cdn.goorulearning.org/prod1/f000/1436/8540/bed55648-dd9f-4b25-89ad-3b564718a8d9_f8c0ecd1-977e-4f7b-8d31-83e59daf7154.png", type: "interactive"}));
        itemsResources.addObject(Ember.Object.create({ name: "Types", image:"http://cdn.goorulearning.org/prod1/f000/1876/6096/0706001a-363d-4bc0-bfde-aa8220005cc7_34026720-e81e-4fe7-ad0c-60df8e0b4b59.jpg", type: "question"}));
        itemsResources.addObject(Ember.Object.create({ name: "Types", image:"http://cdn.goorulearning.org/prod1/f000/1876/6096/0706001a-363d-4bc0-bfde-aa8220005cc7_34026720-e81e-4fe7-ad0c-60df8e0b4b59.jpg", type: "question"}));

        var itemsStandards = Ember.A();
        itemsStandards.addObject(Ember.Object.create({ name: "CCSS.ELA-Literacy.RI.9-10.6", description: "Demostrate command of the conventions"}));
        itemsStandards.addObject(Ember.Object.create({ name: "CCSS.ELA-Literacy.RI.9-10.2", description: "Demostrate command of the conventions"}));
        itemsStandards.addObject(Ember.Object.create({ name: "CCSS.ELA-Literacy.RI.9-10.3", description: "Demostrate command of the conventions"}));
        itemsStandards.addObject(Ember.Object.create({ name: "CCSS.ELA-Literacy.RI.9-10.4", description: "Demostrate command of the conventions"}));
        itemsStandards.addObject(Ember.Object.create({ name: "CCSS.ELA-Literacy.RI.9-10.5", description: "Demostrate command of the conventions"}));
        itemsStandards.addObject(Ember.Object.create({ name: "CCSS.ELA-Literacy.RI.9-10.7", description: "Demostrate command of the conventions"}));

        var itemsStandards2 = Ember.A();
        itemsStandards2.addObject(Ember.Object.create({ name: "CCSS.ELA-Literacy.RI.9-10.6", description: "Demostrate command of the conventions"}));

        items.addObject(Ember.Object.create({
            id: 1,
            remixes: 4,
            views: 53,
            title: "1.1 Variables and Expressions",
            image: "http://www.goorulearning.org/images/default-collection-image-160x120.png",
            url: "http://www.goorulearning.org/#collection-play&id=e6e392e5-e025-4458-9e7e-c4d148eb6b1b",
            author: "TCPMathLab",
            authorImage: "http://profile-images.goorulearning.org.s3.amazonaws.com/2341faae-16db-4f59-8418-f8c83a3e845b.png",
            profilePageUrl: "http://www.goorulearning.org/#collection-play&id=e6e392e5-e025-4458-9e7e-c4d148eb6b1b",
            description: "The summative assessment for this unit has students analyzing the use of irony in a short story, summarizing an opinion ...",
            resources: itemsResources,
            standards: ''
        }));
        items.addObject(Ember.Object.create({
            id: 2,
            remixes: 6,
            views: 253,
            title: "Types of Poetry",
            image: "http://cdn.goorulearning.org/prod1/f000/2084/1115/009621fb-2a5f-499f-9d85-d119a92bf9c6_696302d8-b2ef-4691-9363-2e9e09b6ba83-160x120.jpg",
            url: "http://www.goorulearning.org/#collection-play&id=e6e392e5-e025-4458-9e7e-c4d148eb6b1b",
            author: "vbowley and",
            authorImage: " http://profile-images.goorulearning.org.s3.amazonaws.com/a8fc5310-c296-49d1-9fc8-8d34b54f9ad8.png",
            profilePageUrl: "http://www.goorulearning.org/#profilepage&id=a8fc5310-c296-49d1-9fc8-8d34b54f9ad8&user=vbowley",
            description: "Students will review the literary element of satire. Students will use the information in this collection to synthesize ...",
            resources: itemsResources,
            standards: itemsStandards
        }));
        items.addObject(Ember.Object.create({
            id: 3,
            remixes: 5,
            views: 43,
            title: "Student: Australia",
            image: "http://cdn.goorulearning.org/prod1/f000/2156/8875/5e84be94-f21d-4458-b843-ef6976a6122f_7af77154-8df2-4ff9-ab6a-4414bc047ddf-160x120.jpg",
            url: "http://www.goorulearning.org/#collection-play&id=e6e392e5-e025-4458-9e7e-c4d148eb6b1b",
            author: "TCPMathLab",
            authorImage: "http://profile-images.goorulearning.org.s3.amazonaws.com/2341faae-16db-4f59-8418-f8c83a3e845b.png",
            profilePageUrl: "http://www.goorulearning.org/#collection-play&id=e6e392e5-e025-4458-9e7e-c4d148eb6b1b",
            description: "Students will review the literary element of satire. Students will use the information in this collection to synthesize ...",
            resources: itemsResources,
            standards: itemsStandards2
        }));
        items.addObject(Ember.Object.create({
            id: 4,
            remixes: 4,
            views: 53,
            title: "1.1 Variables and Expressions",
            image: "http://www.goorulearning.org/images/default-collection-image-160x120.png",
            url: "http://www.goorulearning.org/#collection-play&id=e6e392e5-e025-4458-9e7e-c4d148eb6b1b",
            author: "TCPMathLab",
            authorImage: "",
            profilePageUrl: "http://www.goorulearning.org/#collection-play&id=e6e392e5-e025-4458-9e7e-c4d148eb6b1b",
            description: "The summative assessment for this unit has students analyzing the use of irony in a short story, summarizing an opinion ...",
            resources: itemsResources,
            standards: itemsStandards
        }));
      return items;
    }.property(),

    /**
     * DidInsertElement ember event
     */
    didInsertElement: function(){
        var component = this;
        component.$("[data-toggle='tooltip']").tooltip({trigger: "hover"});
    }
});
