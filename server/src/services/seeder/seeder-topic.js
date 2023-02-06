'use strict';

const seederTopic = async (topicCollection, DUMMY_SUBJECT, DUMMY_LEARNING_MATERIAL) => {
  await topicCollection.findOneAndUpdate(
    { name: '2. KONZULTACE - PROGRAMOVÁNÍ' },
    {
      $set: {
        subjects: [DUMMY_SUBJECT[0]._id],
        learningMaterials: [ DUMMY_LEARNING_MATERIAL[0]._id, DUMMY_LEARNING_MATERIAL[1]._id, DUMMY_LEARNING_MATERIAL[2]._id, DUMMY_LEARNING_MATERIAL[3]._id, DUMMY_LEARNING_MATERIAL[4]._id,
        ],
      },
    },
  );
  await topicCollection.findOneAndUpdate(
    { name: '3. KONZULTACE - SOFTWAROVÝ VÝVOJ' },
    {
      $set: {
        subjects: [DUMMY_SUBJECT[0]._id],
        learningMaterials: [ DUMMY_LEARNING_MATERIAL[5]._id, DUMMY_LEARNING_MATERIAL[6]._id, DUMMY_LEARNING_MATERIAL[7]._id,
        ],
      },
    },
  );
  await topicCollection.findOneAndUpdate(
    { name: '4. KONZULTACE - PROGRAMOVÁNÍ' },
    {
      $set: {
        subjects: [DUMMY_SUBJECT[0]._id],
        learningMaterials: [ DUMMY_LEARNING_MATERIAL[8]._id, DUMMY_LEARNING_MATERIAL[9]._id, DUMMY_LEARNING_MATERIAL[10]._id, DUMMY_LEARNING_MATERIAL[11]._id, DUMMY_LEARNING_MATERIAL[12]._id, DUMMY_LEARNING_MATERIAL[13]._id,
        ],
      },
    },
  );
  await topicCollection.findOneAndUpdate(
    { name: '5. KONZULTACE - PROGRAMOVÁNÍ' },
    {
      $set: {
        subjects: [DUMMY_SUBJECT[0]._id],
        learningMaterials: [ DUMMY_LEARNING_MATERIAL[14]._id, DUMMY_LEARNING_MATERIAL[15]._id, DUMMY_LEARNING_MATERIAL[16]._id, DUMMY_LEARNING_MATERIAL[17]._id,
        ],
      },
    },
  );
};

module.exports = seederTopic;
