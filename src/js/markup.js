export function renderMarkupInfo(data) {
    const defaults = {
        image: "https://react.semantic-ui.com/images/wireframe/image.png",
        numbers : "not found"
    }
        return data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
        ` <a class="photo-card" href="${largeImageURL}">
        <img src="${webformatURL || defaults.image}" alt="${tags}" height="300px" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span class = "info-item-span">${likes || defaults.numbers}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span class = "info-item-span">${views || defaults.numbers}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span class = "info-item-span">${comments|| defaults.numbers}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span class = "info-item-span">${downloads || defaults.numbers}</span>
          </p>
        </div>
      </a>`).join('')
}
