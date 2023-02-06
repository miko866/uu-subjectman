'use strict';

const seederLearningMaterial = async (learningMaterialCollection, DUMMY_TOPIC) => {
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Základní principy' },
    {
      $set: {
        topics: [DUMMY_TOPIC[1]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Datové struktury' },
    {
      $set: {
        topics: [DUMMY_TOPIC[1]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Kombinace různých struktur' },
    {
      $set: {
        topics: [DUMMY_TOPIC[1]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Úvod do JavaScript' },
    {
      $set: {
        topics: [DUMMY_TOPIC[1]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Úvod do JavaScript Course' },
    {
      $set: {
        topics: [DUMMY_TOPIC[1]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Úvod do metodik vývoje SW' },
    {
      $set: {
        topics: [DUMMY_TOPIC[2]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Požadavky na SW produkty' },
    {
      $set: {
        topics: [DUMMY_TOPIC[2]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Úvod do SW vývoje' },
    {
      $set: {
        topics: [DUMMY_TOPIC[2]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Základní datové typy' },
    {
      $set: {
        topics: [DUMMY_TOPIC[3]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Základní datové typy Course' },
    {
      $set: {
        topics: [DUMMY_TOPIC[3]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Práce s proměnnými' },
    {
      $set: {
        topics: [DUMMY_TOPIC[3]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Funkce' },
    {
      $set: {
        topics: [DUMMY_TOPIC[3]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Syntaxe funkce' },
    {
      $set: {
        topics: [DUMMY_TOPIC[3]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Vlastnosti a použití funkce' },
    {
      $set: {
        topics: [DUMMY_TOPIC[3]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Rekurze' },
    {
      $set: {
        topics: [DUMMY_TOPIC[4]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Datové objekty' },
    {
      $set: {
        topics: [DUMMY_TOPIC[4]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Vazby mezi datovými typy' },
    {
      $set: {
        topics: [DUMMY_TOPIC[4]._id],
      },
    },
  );
  await learningMaterialCollection.findOneAndUpdate(
    { name: 'Elementární funkcionality' },
    {
      $set: {
        topics: [DUMMY_TOPIC[4]._id],
      },
    },
  );
};

module.exports = seederLearningMaterial;
