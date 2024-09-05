/* eslint-disable camelcase */
const validateData = (data) => {
  if (!Array.isArray(data)) return false;

  const itemStructure = {
    brand: 'string',
    categories: 'object', // categories should be an array
    description: 'string',
    free_shipping: 'boolean',
    hierarchicalCategories: 'object', // hierarchicalCategories should be an object, not an array
    image: 'string',
    name: 'string',
    objectID: 'string',
    popularity: 'number',
    price: 'number',
    price_range: 'string',
    rating: 'number',
    type: 'string',
    url: 'string',
  };

  const structureKeys = Object.keys(itemStructure).sort();

  for (const item of data) {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      return false;
    }

    const itemKeys = Object.keys(item).sort();
    if (
      itemKeys.length !== structureKeys.length ||
      !itemKeys.every((key, idx) => key === structureKeys[idx])
    ) {
      return false;
    }

    for (const key of itemKeys) {
      const expectedType = itemStructure[key];
      const value = item[key];

      // Check general type
      if (typeof value !== expectedType) {
        return false;
      }

      // Additional check for `categories` (should be an array)
      if (key === 'categories' && !Array.isArray(value)) {
        return false;
      }

      // Additional check for `hierarchicalCategories` (should be an object, not an array, and not null)
      if (
        key === 'hierarchicalCategories' &&
        (Array.isArray(value) || value === null)
      ) {
        return false;
      }
    }
  }

  return true;
};

export default validateData;
