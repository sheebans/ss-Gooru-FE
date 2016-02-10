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
        Ember.Object.create({ //Multiple Choice
          "id": "569906aa20b7dfae1bcd5262",
          questionType: 'MC',
          text: 'Sample Question MC',
          answers:  Ember.A([
            Ember.Object.create({ id: 1, isCorrect: false,text:"Answer 1" }),
            Ember.Object.create({ id: 2, isCorrect: false,text:"Answer 2" }),
            Ember.Object.create({ id: 3, isCorrect: true,text:"Answer 3" })
          ]),
          order: 1,
          "resourceFormat": "question",
          "narration": "Id eu mollit sunt Lorem voluptate ut officia ut. Non non nulla exercitation eu duis laboris Lorem id deserunt ullamco laborum aliqua nostrud. Dolor consequat dolor consequat labore officia cillum ad nulla proident. Veniam consequat sint Lorem nulla reprehenderit occaecat dolore excepteur eiusmod.",
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
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({ //true false
          "id": "569906aa3ec3bb39969acbe6",
          questionType: 'T/F',
          text: 'True False Question',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([
            Ember.Object.create({ id: "1", isCorrect: true,text:"True" }),
            Ember.Object.create({ id: "2", isCorrect: false,text:"False" }),
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 2,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aadfa0072204f7c7c7",
          questionType: 'HT_RO',
          text: 'Reorder Question',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // ["crc", "bra", "pan", "chi"]
            Ember.Object.create({ id: "crc", text:"Costa Rica", order: 1 }),
            Ember.Object.create({ id: "bra", text:"Brasil", order: 2 }),
            Ember.Object.create({ id: "pan", text:"Panamá", order: 3 }),
            Ember.Object.create({ id: "chi", text:"Chile", order: 4 })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 3,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aacea8416665209d53",
          questionType: 'FIB',
          text: 'The sun is _______ and the moon _______',
          hints: [],
          explanation: 'Sample explanation text',
          answers: Ember.A([
            Ember.Object.create({id: 1, text: 'yellow'}),
            Ember.Object.create({id: 2, text: 'white'})
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 4,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aa77bebed003fa6eb1",
          questionType: 'MA',
          text: 'Sample Question MA',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
            Ember.Object.create({ id: "1", isCorrect: false, text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: true, text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true, text:"Answer 3" })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 5,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aa68f276ae7ea03c30",
          questionType: 'HT_HL',
          text: '<p>Seleccione las palabras escritas incorrectamente</p>',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // ["le", "colo", "teco"]
            Ember.Object.create({ id: "1", text:"<p>[Le] casa es de [colo] rojo pero pero el [teco] es azul ajax</p>" })
          ]),
          isHotTextHighlightWord: true,
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 6,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aa04f742731bd4e896",
          questionType: 'HS_IMG',
          text: 'Sample Question HS_IMG',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // ["1", "3"]
            Ember.Object.create({ id: "1", isCorrect: true, image:"http://qacdn.gooru.org/qalive/f000/2441/3272/4a12b833-9106-48ef-95b5-ac3ff73575ae.png" }),
            Ember.Object.create({ id: "2", isCorrect: false, image:"" }),
            Ember.Object.create({ id: "3", isCorrect: true, image:"" })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Deserunt occaecat ullamco cillum in incididunt anim sit consequat consequat sit. Ipsum duis irure do quis amet cupidatat tempor qui nulla commodo nisi veniam. Culpa Lorem consequat ad officia. Consectetur minim pariatur id laborum tempor voluptate dolor quis laboris et quis commodo.",
          "order": 7,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aabfcfc4cfc1b29b62",
          questionType: 'HS_TXT',
          text: 'Sample Question HS_TXT',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // ["1", "3"]
            Ember.Object.create({ id: "1", isCorrect: true, text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: false, text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true, text:"Answer 3" })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 8,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aa7fe0695bfd409731",
          questionType: 'OE',
          text: 'Sample Question OE',
          hints: [],
          explanation: 'Sample explanation text',
          answers: [],
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 9
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
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "1"
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
            "timeSpent": 1013,
            "userAnswer": ["red", "white"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
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
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 1"
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
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "1"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["bra", "crc", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["yellow", "white"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
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
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 2"
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
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["orange", "white"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 3"
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
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "1"
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "gray"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 4"
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
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["bra", "crc", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["orange", "white"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 5"
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
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "chi", "pan"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "white"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 6"
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
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "1"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "chi", "pan"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["yellow", "white"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["2", "3"]
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
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["bra", "crc", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["yellow", "gray"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "2"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 7"
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
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "white"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["casa", "rojo"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 8"
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
            "correct": false,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 2
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "white"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 9"
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
