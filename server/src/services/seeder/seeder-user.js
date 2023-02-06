'use strict';

const seederUser = async (userCollection, DUMMY_SUBJECT) => {
  await userCollection.findOneAndUpdate(
    { email: 'supervisor@gmail.com' },
    {
      $set: {
        subjects: [DUMMY_SUBJECT[0]._id, DUMMY_SUBJECT[1]._id, DUMMY_SUBJECT[2]._id],
      },
    },
  );
};

module.exports = seederUser;
