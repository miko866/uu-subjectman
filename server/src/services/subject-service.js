'use strict';

const studyProgramIsIn = (studyProgramId, studyPrograms) => {
  return studyPrograms.some((studyProgram) => studyProgram.toString() === studyProgramId);
};

module.exports = { studyProgramIsIn };
