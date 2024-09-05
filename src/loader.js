/* eslint-disable no-console */

import algoliasearch from 'algoliasearch';

import data from '../data/products.json';

// console.table(data[0]);

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

// console.table(categoryStore);

// should be 20 cameras categories

// const cameraCats = [];

// Object.entries(categoryStore).forEach(([key, val]) => {
//   if (key.toLowerCase().includes('cameras')) {
//     cameraCats.push(key);
//   }
// });

// console.log(cameraCats);
// ^ confirmed there are 20 "cameras" categories

// let cameraCount = 0;

// search cat strings for cameras, then update item price
const discountedData = data.map((item) => {
  if (
    item.categories.some((category) =>
      category.toLowerCase().includes('cameras')
    )
  ) {
    // cameraCount++;
    return { ...item, price: Math.floor(item.price * 0.8) };
  }
  return item;
});

// console.log({ cameraCount });

// const firstCam = data.find((item) => {
//   return item.categories.some((category) =>
//     category.toLowerCase().includes('cameras')
//   );
// });

// if (firstCam) console.log(firstCam.price);

// const firstCamSale = discountedData.find((item) => {
//   return item.categories.some((category) =>
//     category.toLowerCase().includes('cameras')
//   );
// });

// if (firstCamSale) console.log(firstCamSale.price);

// send discounted data to Algolia
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

const algoliaIndex = client.initIndex(process.env.ALGOLIA_INDEX);

const postIndexToAlgolia = async (index) => {
  try {
    const indexExists = await index.exists();

    if (indexExists) {
      console.log(`Index: ${process.env.ALGOLIA_INDEX} already exists.`);
      return;
    }

    await index.setSettings({
      attributesForFaceting: ['searchable(brand)', 'searchable(categories)'],
      searchableAttributes: ['description', 'name', 'type'],
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

postIndexToAlgolia(algoliaIndex);
