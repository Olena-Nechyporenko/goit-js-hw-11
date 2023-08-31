import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = "https://pixabay.com/api/";

const elem = {
    form: document.querySelector(".search-form"),
    input: document.querySelector(".input-form"),
    searchBtn: document.querySelector(".search-btn"),
    gallery: document.querySelector(".gallery"),
    loadMoreBtn:document.querySelector(".load-more"),
    guard: document.querySelector(".js-guard")
}

let page = 1;

elem.form.addEventListener("submit", onSubmit)

function onSubmit(evt) {
    evt.preventDefault();
    searchImages() 
    .then(data => {
        page = 1;
        elem.gallery.innerHTML = renderMarkupInfo(data);
        Notify.success(`Hooray! We found ${data.totalHits} images!`, {width: "350px", fontSize: "20px"}); 
        new SimpleLightbox('.gallery a')
       
       const pages = Math.ceil(data.totalHits/data.hits.length);
       if(page < pages) {
        elem.loadMoreBtn.classList.replace("is-hidden", "load-more");
       }
    })
    .catch(err => {
      elem.gallery.innerHTML = '';
      elem.loadMoreBtn.classList.replace("load-more", "is-hidden");
      console.log("Error :", err.message)});
}


  async function searchImages(currentPage) {
    const params = new URLSearchParams({
        key: "39125573-a5e5a696ee6b560e318b28a02",
        q: elem.input.value,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 40,
        page: currentPage
    })
        const response = await axios.get(`${BASE_URL}?${params}`)
        if(response.data.hits.length === 0) {
           return Notify.warning("Sorry, there are no images matching your search query. Please try again.", {width: "400px"}); 
        }
      return response.data;
  }


  function renderMarkupInfo(data) {
    const defaults = {
        image: "https://react.semantic-ui.com/images/wireframe/image.png",
        numbers : "not found"
    }
        return data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
        ` <a class="photo-card" href="${largeImageURL}">
        <img src="${webformatURL || defaults.image}" alt="${tags}" width = "300" height = "200" loading="lazy" />
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



elem.loadMoreBtn.addEventListener("click", handlerLoadMore);

function handlerLoadMore() { 
  page += 1;
  searchImages(page)
    .then((data) => {
      elem.gallery.insertAdjacentHTML("beforeend", renderMarkupInfo(data));
       new SimpleLightbox('.gallery a')
       
      const pages = Math.ceil(data.totalHits/data.hits.length)
      if(page < pages) {
        elem.loadMoreBtn.classList.replace("is-hidden", "load-more")
       }
      if(page >= pages) {
        elem.loadMoreBtn.classList.replace("load-more", "is-hidden");
          return Notify.warning("We're sorry, but you've reached the end of search results.", {position: "center-bottom", fontSize: "25px", width: "450px", position: "center-bottom"});
         } 
      })
    .catch((err) => {
      elem.loadMoreBtn.classList.replace("load-more", "is-hidden");
    });
  
 
}


