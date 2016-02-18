import Ember from 'ember';
import DS from 'ember-data';
import UserResourcesResult from 'gooru-web/models/result/user-resources';
import QuestionResult from 'gooru-web/models/result/question';

export default Ember.Service.extend({

  findResourcesByCollection: function(classId, collectionId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('realTimeAdapter').queryRecord({
        classId: classId,
        collectionId: collectionId
      }).then(function(events) {
        resolve(service.get('realTimeSerializer').normalizeResponse(events));
      }, function(error) {
        reject(error);
      });
    });
  },

  /**
   * Returns all the results/answers that the students of a class have for the
   * resources in a collection. Not started/skipped questions will not be included
   * in the return value.
   *
   * @param classId
   * @param collectionId
   * @returns {Promise.<UserResourcesResult[]>}
   */
  findClassPerformanceByCollection: function (classId, collectionId) {
    const response = [
      UserResourcesResult.create({
        "user": "56983a9060a68052c1ed934c",
        "resourceResults": [
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "1"
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "white"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 1"
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserResourcesResult.create({
        "user": "56983a90fb01fecc328e2388",
        "resourceResults": [
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "1"
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["bra", "crc", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["yellow", "white"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 2"
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserResourcesResult.create({
        "user": "56983a906596902edadedc7c",
        "resourceResults": [
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["orange", "white"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 3"
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserResourcesResult.create({
        "user": "56983a901bc3d60c88ac2fe2",
        "resourceResults": [
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "1"
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "gray"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 4"
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          })
        ]
      }),
      UserResourcesResult.create({
        "user": "56983a9082f705e65f2fe607",
        "resourceResults": [
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["bra", "crc", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["orange", "white"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 5"
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          })
        ]
      }),
      UserResourcesResult.create({
        "user": "56983a905ed41a7863401287",
        "resourceResults": [
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "chi", "pan"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "white"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 6"
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          })
        ]
      })
    ];

    return DS.PromiseArray.create({
      promise: callToServerEndPoint(collectionId)
    });
  }

});
