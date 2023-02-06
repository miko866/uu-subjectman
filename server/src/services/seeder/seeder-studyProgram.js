'use strict';

const seederStudyProgram = async (studyProgramCollection, DUMMY_USER, SUBJECT_TYPE, DUMMY_SUBJECT) => {
  await studyProgramCollection.findOneAndUpdate(
    { name: 'Software Development' },
    {
      $set: {
        users: [DUMMY_USER[2]._id],
        subjects: [
          {
            subjectType: SUBJECT_TYPE.obligatory,
            subject: DUMMY_SUBJECT[0]._id,
          },
        ],
      },
    },
  );
};

module.exports = seederStudyProgram;

