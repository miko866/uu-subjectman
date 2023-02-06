'use strict';

const seederLearningMaterialType = async (learningMaterialTypeCollection, DUMMY_LEARNING_MATERIAL) => {
  await learningMaterialTypeCollection.findOneAndUpdate(
    { name: 'Books' },
    {
      $set: {
        learningMaterials: [
          DUMMY_LEARNING_MATERIAL[0]._id,
          DUMMY_LEARNING_MATERIAL[1]._id,
          DUMMY_LEARNING_MATERIAL[2]._id,
          DUMMY_LEARNING_MATERIAL[3]._id,
          DUMMY_LEARNING_MATERIAL[5]._id,
          DUMMY_LEARNING_MATERIAL[6]._id,
          DUMMY_LEARNING_MATERIAL[8]._id,
          DUMMY_LEARNING_MATERIAL[10]._id,
          DUMMY_LEARNING_MATERIAL[11]._id,
          DUMMY_LEARNING_MATERIAL[14]._id,
          DUMMY_LEARNING_MATERIAL[15]._id,
        ],
      },
    },
  );
  await learningMaterialTypeCollection.findOneAndUpdate(
    { name: 'Courses' },
    {
      $set: {
        learningMaterials: [
          DUMMY_LEARNING_MATERIAL[4]._id,
          DUMMY_LEARNING_MATERIAL[7]._id,
          DUMMY_LEARNING_MATERIAL[9]._id,
          DUMMY_LEARNING_MATERIAL[12]._id,
          DUMMY_LEARNING_MATERIAL[13]._id,
          DUMMY_LEARNING_MATERIAL[16]._id,
          DUMMY_LEARNING_MATERIAL[17]._id,
        ],
      },
    },
  );
};

module.exports = seederLearningMaterialType;
