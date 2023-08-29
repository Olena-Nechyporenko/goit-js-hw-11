import axios from "axios"
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common['x-api-key'] =
  'live_C8fch3W7tmmF8fmpsXU2mdIfjeqC3R8Q3wAY9gs2QZiQFnTO5tNKg722MPHavC8b';

const BASE_URL = "https://pixabay.com/api/"

const elem = {
    form: document.querySelector(".search-form"),
    input: document.querySelector(".input-form"),
    searchBtn: document.querySelector(".search-btn")
}

elem.form.addEventListener("submit", onSubmit)

function onSubmit(evt) {
    evt.preventDefault()
    console.log(elem.input.value)
    
    return axios
    .get(`${BASE_URL}?key=39125573-a5e5a696ee6b560e318b28a02&q=${elem.input.value}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw new Error('Помилка запиту:', error.message);
    });
    
}
















  // async function getUser() {
//     try {
//       const response = await axios.get('/user?ID=12345');
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// function getUserAccount() {
//     return axios.get('/user/12345');
//   }