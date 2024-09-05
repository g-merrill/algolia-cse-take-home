/* eslint-disable no-console */

import algoliasearch from 'algoliasearch';

import data from '../data/products.json';

import validateData from './validateData';

// console.table(data[0]);  // see sampleRecord.json
// console.log(data.length); // 10,000 records

// not needed, but making sure there's uniform structure to the data before Algolia upload
const dataValid = validateData(data);

// exploring dataset:
// const categoryStore = {};

// data.forEach((item) => {
//   item.categories.forEach((category) => {
//     if (categoryStore[category]) {
//       categoryStore[category] += 1;
//     } else {
//       categoryStore[category] = 1;
//     }
//   });
// });

// console.table(categoryStore); // counted that there are 20 "cameras" categories relevant to discount

// const cameraCats = [];

// Object.entries(categoryStore).forEach(([key, val]) => {
//   if (key.toLowerCase().includes('cameras')) {
//     cameraCats.push(key);
//   }
// });

// console.log(cameraCats); // confirmed there are 20 "cameras" categories

// let cameraCount = 0;

// search cat strings for cameras, then update item price
const discountedData = dataValid
  ? data.map((item) => {
      if (
        item.categories.some((category) =>
          category.toLowerCase().includes('cameras')
        )
      ) {
        // cameraCount++;
        return { ...item, price: Math.floor(item.price * 0.8) };
      }
      return item;
    })
  : [];

// checking how many cameras' prices were updated:
// console.log({ cameraCount });

// send discounted data to Algolia
const postIndexToAlgolia = async () => {
  if (!dataValid) return;

  try {
    const client = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );
    const index = client.initIndex(process.env.ALGOLIA_INDEX);
    const indexExists = await index.exists();

    if (indexExists) {
      console.log(`Index: ${process.env.ALGOLIA_INDEX} already exists.`);
      return;
    }

    await index.setSettings({
      attributesForFaceting: ['searchable(brand)', 'searchable(categories)'],
      searchableAttributes: [
        'brand',
        'categories',
        'description',
        'name',
        'type',
      ],
      customRanking: ['desc(popularity)', 'desc(rating)'],
    });

    await index.saveObjects(discountedData, {
      autoGenerateObjectIDIfNotExist: true,
    });

    console.log('Algolia upload successful!');
  } catch (error) {
    console.error(error);
  }
};

postIndexToAlgolia();
