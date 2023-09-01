import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { renderMarkupInfo } from "./markup";


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

const lightbox = new SimpleLightbox('.gallery a')

elem.form.addEventListener("submit", onSubmit)

async function onSubmit(evt) {
    evt.preventDefault();
    const response = await searchImages() 
    try {
        if(response.hits.length === 0 || elem.input.value.trim() === "") {
         return Notify.warning("Sorry, there are no images matching your search query. Please try again.", {width: "400px"}); 
      }
        
        elem.gallery.innerHTML = renderMarkupInfo(response);
        lightbox.refresh()
        Notify.success(`Hooray! We found ${response.totalHits} images!`, {width: "350px", fontSize: "20px"}); 

       const pages = Math.ceil(response.totalHits/40);
       if(page < pages) {
        elem.loadMoreBtn.classList.replace("is-hidden", "load-more");
       }
    } catch(err) {
      elem.gallery.innerHTML = '';
      elem.loadMoreBtn.classList.replace("load-more", "is-hidden");
      console.log("Error :", err.message)};
}

 async function searchImages(currentPage = "1") {
  const params = new URLSearchParams({
      key: "39125573-a5e5a696ee6b560e318b28a02",
      q: elem.input.value.trim(),
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      per_page: 40,
      page: currentPage
  })
    const response = await axios.get(`${BASE_URL}?${params}`)
     return response.data;
}

elem.loadMoreBtn.addEventListener("click", handlerLoadMore);

async function handlerLoadMore() { 
  page += 1;
  const response = await searchImages(page)
   try {
      elem.gallery.insertAdjacentHTML("beforeend", renderMarkupInfo(response));
       lightbox.refresh()
       
      const pages = Math.ceil(response.totalHits/40)
      if(page < pages) {
        elem.loadMoreBtn.classList.replace("is-hidden", "load-more")
       }
      if(page === pages) {
        elem.loadMoreBtn.classList.replace("load-more", "is-hidden");
          return Notify.warning("We're sorry, but you've reached the end of search results.", {position: "center-bottom", fontSize: "25px", width: "450px", position: "center-bottom"});
         } 
      } catch(err) {
      elem.loadMoreBtn.classList.replace("load-more", "is-hidden");
    };
}


