'use strict';

const seederSubject = async (subjectCollection, DUMMY_STUDY_PROGRAM, DUMMY_TOPIC) => {
  await subjectCollection.findOneAndUpdate(
    { name: 'Základy softwarového vývoje' },
    {
      $set: {
        studyPrograms: [DUMMY_STUDY_PROGRAM[0]._id],
        topics: [DUMMY_TOPIC[0]._id, DUMMY_TOPIC[1]._id, DUMMY_TOPIC[2]._id, DUMMY_TOPIC[3]._id],
      },
    },
  );
};

module.exports = seederSubject;
