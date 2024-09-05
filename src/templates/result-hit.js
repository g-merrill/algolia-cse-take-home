function resultHit(hit, { html, sendEvent }) {
  const handleAddToCart = () =>
    sendEvent('conversion', hit, 'Added To Cart', {
      // Special subtype
      eventSubtype: 'addToCart',
      // An array of objects representing each item added to the cart
      objectData: [
        {
          // The price value for this item
          price: hit.price,
          // How many of this item were added
          quantity: 1,
        },
      ],
      // The total value of all items
      value: hit.price,
      // The currency code
      currency: 'USD',
    });

  const handleViewItem = () =>
    sendEvent('click', hit, 'Item Viewed', {
      objectData: [
        {
          price: hit.price,
          quantity: 1,
        },
      ],
      value: hit.price,
      currency: 'USD',
    });

  return html`
    <div class="result-hit__wrapper">
      <div class="result-hit__image-container">
        <img class="result-hit__image" src="${hit.image}" />
      </div>
      <div class="result-hit__details">
        <h3 class="result-hit__name">
          ${hit._highlightResult.name.value
            .replaceAll('<mark>', '')
            .replaceAll('&#39;', "'")
            .replaceAll('&quot;', '"')
            .replaceAll('</mark>', '')}
        </h3>
        <p class="result-hit__price">$${hit.price}</p>
      </div>
      <div class="result-hit__controls">
        <button
          id="view-item"
          class="result-hit__view"
          onclick="${handleViewItem}"
        >
          View
        </button>
        <button
          id="add-to-cart"
          class="result-hit__cart"
          onClick="${handleAddToCart}"
        >
          Add to cart
        </button>
      </div>
    </div>
  `;
}

export default resultHit;
