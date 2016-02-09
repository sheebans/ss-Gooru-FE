import Ember from 'ember';
import UserQuestionsResult from 'gooru-web/models/result/user-questions';
import QuestionResult from 'gooru-web/models/result/question';


export default Ember.Route.extend({

  model: function(){

// TODO: Get this objects dynamically from the route

    const assessment = Ember.Object.create({

      collectionType: 'assessment',
      title: 'Sample Assessment Name',

      // Will this value be the same as questionCount
      // if there are only questions in the collection?
      resourceCount: 15,
      questionCount: 15,
      visibility: true,
      resources: [
        Ember.Object.create({
          "id": "569906aa20b7dfae1bcd5262",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Id eu mollit sunt Lorem voluptate ut officia ut. Non non nulla exercitation eu duis laboris Lorem id deserunt ullamco laborum aliqua nostrud. Dolor consequat dolor consequat labore officia cillum ad nulla proident. Veniam consequat sint Lorem nulla reprehenderit occaecat dolore excepteur eiusmod.",
          "order": 1,
          "questionType": "MA",
          "text": "Adipisicing ut irure mollit ad esse aute culpa. Qui aliqua ad quis deserunt sunt eiusmod consequat. Ut occaecat magna et culpa quis magna id. Laboris id esse velit ut irure nulla pariatur voluptate adipisicing sit incididunt ut amet.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Culpa laborum deserunt cillum sunt laboris voluptate ut ea elit ex adipisicing officia. Ad laboris tempor officia non ut sit consequat quis esse et cupidatat officia.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aa3ec3bb39969acbe6",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Anim id enim cupidatat qui reprehenderit laboris aute commodo deserunt. Cillum esse consequat culpa nostrud exercitation in ad aliquip laboris labore. Aliquip ut excepteur deserunt excepteur deserunt eu in elit minim occaecat exercitation elit. Excepteur ex consequat excepteur elit id aute occaecat. Culpa ipsum nostrud sit exercitation sit et fugiat cillum. Minim laboris aute ullamco voluptate.",
          "order": 2,
          "questionType": "MA",
          "text": "Minim cupidatat qui fugiat aliqua dolore elit laborum qui dolor ipsum fugiat commodo. Labore elit consequat adipisicing culpa. Nisi excepteur sint magna eu mollit do. Amet anim fugiat velit ullamco Lorem. Ipsum velit sint cillum deserunt cillum enim minim et id exercitation adipisicing id. Ullamco ullamco cupidatat consectetur amet aliquip in dolor quis eu consectetur est labore fugiat. Eu aliqua ullamco est ea cillum est Lorem ipsum et culpa incididunt.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Pariatur id ad est pariatur. Ea veniam deserunt et ullamco nisi est fugiat excepteur tempor.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aadfa0072204f7c7c7",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Ipsum nulla sit sunt mollit elit Lorem do adipisicing ad officia. Dolore esse anim deserunt ea et irure magna deserunt non laborum sit deserunt ea exercitation. Culpa sint sunt non tempor nisi anim. Reprehenderit in velit ea amet.",
          "order": 3,
          "questionType": "MA",
          "text": "Sint occaecat amet commodo nulla adipisicing consequat elit veniam id nisi. Dolore officia duis sint cupidatat incididunt aliqua voluptate aute eiusmod id amet ex est. Laborum id consequat adipisicing laborum ut. Ea adipisicing reprehenderit eu ipsum eu id consequat adipisicing excepteur ut tempor fugiat.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Adipisicing elit voluptate tempor commodo nostrud laboris labore minim eu amet in exercitation. Et nostrud do amet dolor culpa est magna aliquip incididunt ex duis aliqua excepteur consectetur.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aacea8416665209d53",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Laborum eu ut dolor et do nostrud occaecat. Ut id ipsum id ullamco cillum nulla nisi veniam aliquip sint. Irure et aute aute enim officia esse tempor exercitation aliquip est. Commodo proident duis excepteur ea enim Lorem dolor irure elit commodo nulla nisi dolore ipsum.",
          "order": 4,
          "questionType": "MA",
          "text": "Enim proident sint occaecat sunt culpa incididunt exercitation mollit. Amet cupidatat magna ad irure consectetur et est qui nisi amet ex consequat adipisicing labore. Ea ut ipsum proident ex cupidatat velit id non. Consequat est nulla consequat ut. Adipisicing labore ullamco tempor ex.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Occaecat labore dolor aliquip aute consequat ex tempor deserunt. Labore culpa pariatur dolore in consequat ipsum laborum mollit fugiat ad dolore.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aa77bebed003fa6eb1",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Ea enim dolore qui elit aliqua amet exercitation qui sunt occaecat aliqua duis deserunt. Cupidatat nulla aliqua qui irure ea culpa consequat irure eiusmod nulla irure aute aute irure. Ex eu sit id ipsum. Non amet ut duis voluptate occaecat esse est quis labore. Voluptate adipisicing do aliquip dolor fugiat adipisicing Lorem.",
          "order": 5,
          "questionType": "MA",
          "text": "Commodo reprehenderit est laborum irure id eiusmod fugiat cupidatat veniam est irure. Ipsum irure consectetur exercitation exercitation id officia consectetur esse et quis. Adipisicing excepteur sunt ullamco nisi reprehenderit eu magna qui. Voluptate sint quis ad et.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Consequat culpa tempor reprehenderit officia proident occaecat laboris quis. Occaecat officia ullamco eiusmod Lorem ut do labore.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aa68f276ae7ea03c30",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Exercitation nulla aute in dolor ipsum elit eiusmod ea velit. Do ipsum veniam nulla eu magna velit officia ullamco minim qui ut. Deserunt consequat esse nisi sint. Amet consectetur fugiat laboris ea laborum eiusmod Lorem est dolor. Officia magna labore tempor veniam sint magna est deserunt occaecat fugiat qui nisi. Elit qui cupidatat esse excepteur ut mollit non proident ut. Lorem proident in nostrud velit reprehenderit esse deserunt voluptate proident.",
          "order": 6,
          "questionType": "MA",
          "text": "Pariatur anim do excepteur adipisicing ea velit nostrud laboris minim. Cupidatat occaecat pariatur velit ex officia proident sint nulla eu incididunt est ea consectetur. Ad tempor incididunt ex dolore dolor proident laborum mollit non magna. Dolor duis laborum ea est aliquip commodo anim fugiat sit. Commodo labore eiusmod ullamco commodo sunt. Deserunt commodo labore nisi ullamco proident.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Voluptate sit consequat ad nisi enim sunt cupidatat sint. Est nostrud nulla quis adipisicing eu esse sunt velit sunt adipisicing non quis.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aa04f742731bd4e896",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Deserunt occaecat ullamco cillum in incididunt anim sit consequat consequat sit. Ipsum duis irure do quis amet cupidatat tempor qui nulla commodo nisi veniam. Culpa Lorem consequat ad officia. Consectetur minim pariatur id laborum tempor voluptate dolor quis laboris et quis commodo.",
          "order": 7,
          "questionType": "MA",
          "text": "Anim anim ipsum aliqua ad aliquip sit ut deserunt proident tempor aliquip eiusmod deserunt. Eiusmod in laboris commodo pariatur consequat occaecat culpa. Aute adipisicing mollit veniam reprehenderit esse reprehenderit nostrud nostrud quis nisi. Consequat magna consequat magna cillum ipsum. Pariatur proident voluptate nulla fugiat fugiat cillum magna. Duis est deserunt ullamco nisi aute deserunt aliquip.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Proident proident do Lorem proident. Irure quis qui magna voluptate.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aabfcfc4cfc1b29b62",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Quis qui culpa dolor magna esse excepteur duis cupidatat incididunt. Nulla Lorem elit ullamco voluptate eu nostrud ipsum aliquip elit culpa enim ad nisi amet. Aliqua laboris amet id esse. Labore nulla nulla enim reprehenderit deserunt eu non pariatur Lorem id duis consectetur mollit reprehenderit. Ex exercitation ipsum aute anim voluptate tempor commodo ut qui dolor anim ullamco.",
          "order": 8,
          "questionType": "MA",
          "text": "Quis labore culpa adipisicing veniam proident nulla id. Dolore laborum aliquip non occaecat duis cillum veniam in. Reprehenderit non ad in enim deserunt officia commodo consequat cupidatat quis dolor fugiat. Do commodo labore dolor ullamco ullamco consequat adipisicing velit et exercitation culpa labore laborum commodo. Occaecat id minim do consectetur ullamco dolor qui velit velit.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Dolore labore cillum quis consectetur et dolor veniam voluptate laborum officia dolor duis sint. Et tempor aliqua non ex reprehenderit deserunt enim ea.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aa7fe0695bfd409731",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Officia deserunt mollit nulla do id minim nostrud sit ut elit minim nisi officia. Reprehenderit non reprehenderit excepteur esse duis eu dolor anim commodo esse eiusmod enim. Irure excepteur minim elit labore in est qui commodo. Esse id deserunt ut id aliquip dolore dolor ipsum. Elit deserunt eu ad consequat consequat. Esse labore deserunt nostrud proident laborum proident officia cupidatat eu sunt anim ex.",
          "order": 9,
          "questionType": "MA",
          "text": "Enim quis ipsum in dolore consequat sint cupidatat incididunt irure. Ea est anim eiusmod occaecat dolor sint elit esse laborum anim magna commodo. Exercitation dolor dolor eiusmod sint aliquip aute pariatur culpa laboris id. Irure culpa non Lorem est. Commodo velit non laborum reprehenderit labore. Id consectetur eiusmod est laborum reprehenderit commodo laborum nostrud ea consectetur tempor ex.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Nostrud commodo Lorem irure incididunt cillum ut non deserunt enim ullamco. Minim nisi reprehenderit dolore occaecat sint.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aae3191722d9b42f22",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Amet officia nulla mollit fugiat dolore do culpa voluptate qui minim. Commodo non ipsum dolore reprehenderit anim dolor elit aliquip. Labore eu et ea voluptate mollit irure reprehenderit labore sit. Mollit fugiat eu officia laborum. Sint enim eu ex est culpa eu ad duis velit.",
          "order": 10,
          "questionType": "MA",
          "text": "Cupidatat cupidatat aliqua non Lorem officia officia exercitation. Est occaecat sit eiusmod consectetur irure. Reprehenderit labore commodo aute occaecat.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Eiusmod nisi reprehenderit magna nisi aute nostrud commodo aute voluptate. Voluptate minim ad id occaecat eiusmod laborum labore ipsum consectetur.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aa283a7b45e6777a52",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Anim dolor aute irure nisi officia irure nulla sint deserunt officia aliquip. Commodo anim amet proident irure labore cillum eiusmod aliquip fugiat dolore eu. Lorem velit dolore nulla laborum quis laboris quis ut. Do exercitation do dolor voluptate officia exercitation nulla duis esse aliqua elit.",
          "order": 11,
          "questionType": "MA",
          "text": "Sunt sunt proident consequat consectetur cupidatat. Eu pariatur do sunt ea nostrud esse ipsum. Ad laborum Lorem duis sit anim reprehenderit minim et non dolor. Cupidatat tempor cupidatat sit occaecat incididunt sint officia irure dolor laboris veniam commodo.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Est ea duis laboris labore adipisicing tempor sunt consectetur consectetur enim tempor veniam qui commodo. Ea cillum reprehenderit aliqua labore consectetur tempor nisi dolore.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aab4d366e4ada0c67d",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Dolor qui cupidatat sunt proident elit. Aliqua esse do consequat nostrud dolor excepteur commodo et exercitation do ex. Incididunt non occaecat qui fugiat aliqua ea laborum non incididunt. Sunt aliquip eiusmod reprehenderit ad qui quis quis aliquip laboris duis officia aliqua. Ullamco cupidatat id consequat ea officia aute consequat nostrud. Ullamco do ipsum dolore enim ex voluptate ex consequat voluptate.",
          "order": 12,
          "questionType": "MA",
          "text": "Ad nisi ea ad ea minim occaecat fugiat in fugiat velit. Exercitation non est et amet velit proident mollit veniam nisi minim. Eiusmod eu sunt proident proident elit eu sint et sint culpa. Ea velit dolor consectetur non sunt aliqua ipsum anim pariatur. Esse aliquip fugiat ullamco nisi.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Veniam ad in id veniam irure adipisicing voluptate anim duis laboris labore consequat cillum. Sunt eu nostrud consectetur aute aliqua commodo aute consequat elit excepteur.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aa9fa514e9304c0549",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Amet id nulla ad sit proident sunt occaecat sint enim aliquip exercitation ullamco commodo culpa. Officia eu aute sit minim fugiat dolor in id veniam deserunt non. Exercitation exercitation ea in ipsum voluptate. Voluptate amet voluptate sunt esse cupidatat laboris excepteur sit. Nostrud labore officia aliqua in.",
          "order": 13,
          "questionType": "MA",
          "text": "Consequat aute esse id deserunt qui quis ullamco quis. Irure esse Lorem est quis eiusmod nisi enim sint aliqua laborum aliquip exercitation nulla pariatur. Est aliquip ut ex dolor dolore magna sint aute est et ullamco exercitation ea. Dolor excepteur exercitation veniam pariatur aute. Consequat proident duis ex pariatur eiusmod irure aute consequat cillum ut reprehenderit in. Esse Lorem occaecat ipsum pariatur aute esse cupidatat nisi ut.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Occaecat fugiat quis eu consequat id sint ipsum aliquip tempor incididunt magna eu minim. Fugiat incididunt occaecat aliquip qui laboris ipsum sit ad ex ut et.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aa575aa6e617b38e16",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Non elit sunt sit nulla sint commodo dolor anim aute. Cillum consequat anim ullamco amet ex minim. Duis pariatur ut et duis ea excepteur culpa reprehenderit. Veniam officia anim eu proident enim enim dolor qui tempor labore elit commodo. Ad elit labore eu ullamco sint dolore voluptate elit Lorem consequat ipsum.",
          "order": 14,
          "questionType": "MA",
          "text": "Duis anim consectetur deserunt enim Lorem occaecat in est aute adipisicing labore irure amet. Duis minim sunt eu fugiat occaecat incididunt nostrud. Excepteur laboris do enim deserunt. Officia duis exercitation deserunt officia ipsum ullamco magna adipisicing. Id aliqua id officia ipsum et occaecat voluptate dolore tempor sint cillum esse officia. Incididunt dolor ut reprehenderit reprehenderit ea esse mollit ad tempor nostrud et cillum sint ullamco.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Veniam incididunt consectetur Lorem aliqua laboris aute tempor nulla mollit aliqua ex proident. Enim aliqua ut elit reprehenderit nisi amet est occaecat laborum ad sit et ex quis.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({
          "id": "569906aa25189b0dc0a981ba",
          "assetBasePath": "http://",
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Laborum Lorem cillum minim consequat ullamco. Aute minim fugiat velit nulla laboris commodo deserunt ex id dolore et aliquip labore. Aliqua laboris occaecat et cillum sint nisi Lorem amet minim.",
          "order": 15,
          "questionType": "MA",
          "text": "Occaecat ex minim officia duis amet. Irure amet veniam nisi ad officia. Elit in laboris sunt ex ut magna. Dolore velit aliqua fugiat exercitation aute et quis sint occaecat consequat.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Proident velit ipsum officia reprehenderit ullamco tempor exercitation anim cupidatat anim ad id. In esse aliquip ex quis.</p>",
          "answers": [
            {
              "answerId": "68698250-0330-4d6c-b65e-b065ac9cdbc5",
              "answerText": "<p>officia elit</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": "fc51cdd9-8477-47b0-89fc-b3e2a2a9fa59",
              "answerText": "<p>nisi laboris</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": "46c0450b-c9ef-4211-8e7e-1c697811f126",
              "answerText": "<p>incididunt eu</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            },
            {
              "answerId": "595220c1-b410-4439-a300-faa15e1244e5",
              "answerText": "<p>eiusmod incididunt</p>",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 4
            },
            {
              "answerId": "254f5f8a-0523-4fa3-868c-58328d2a380b",
              "answerText": "<p>aute aliqua</p>",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 5
            }
          ],
          "hasAnswers": true,
          "hasNarration": true
        })
      ],
      hasResources: true,
      isAssessment: true
    });

    const students = Ember.A([
      Ember.Object.create({
        "id": "56983a9060a68052c1ed934c",
        "fullName": "Rocha, Perez",
        "code": 'd934c'
      }),
      Ember.Object.create({
        "id": "56983a90fb01fecc328e2388",
        "fullName": "Snyder, Mason",
        "code": 'e2388'

      }),
      Ember.Object.create({
        "id": "56983a906596902edadedc7c",
        "fullName": "Robles, Guadalupe",
        "code": 'edc7c'
      }),
      Ember.Object.create({
        "id": "56983a901bc3d60c88ac2fe2",
        "fullName": "George, Mariana",
        "code": 'ac2fe2'
      }),
      Ember.Object.create({
        "id": "56983a9082f705e65f2fe607",
        "fullName": "Hutchinson, Blake",
        "code": '2fe607'
      }),
      Ember.Object.create({
        "id": "56983a905ed41a7863401287",
        "fullName": "Maddox, Vincent",
        "code": '01287'
      }),
      Ember.Object.create({
        "id": "56983a90297d42fd4ed7c1de",
        "fullName": "Chase, Brandie",
        "code": '7c1de'
      }),
      Ember.Object.create({
        "id": "56983a900f77bf820df2cb9c",
        "fullName": "Higgins, Nellie",
        "code": '2cb9c'
      }),
      Ember.Object.create({
        "id": "56983a90231a29de51a368d4",
        "fullName": "Pope, Adele",
        "code": '368d4'
      }),
      Ember.Object.create({
        "id": "56983a901ad65da6dac5b384",
        "fullName": "Steele, Nadine",
        "code": '5b384'
      })
    ]);

  // TODO: Remove once the service that returns the user results is implemented
    var userResults = [
      UserQuestionsResult.create({
        "user": "56983a9060a68052c1ed934c",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a90fb01fecc328e2388",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a906596902edadedc7c",
        "questionsResults": [
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a901bc3d60c88ac2fe2",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a9082f705e65f2fe607",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a905ed41a7863401287",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a90297d42fd4ed7c1de",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a900f77bf820df2cb9c",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a90231a29de51a368d4",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a901ad65da6dac5b384",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          })
        ]
      })
    ];

    return {
      assessment: assessment,
      students: students,
      userResults: userResults
    };
  },

  setupController: function(controller, model){
    controller.set("assessment", model.assessment);
    controller.set("students", model.students);
    controller.set('userResults', model.userResults);
  }

});
