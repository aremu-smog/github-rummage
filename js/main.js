import doSearch from "./search.js";

const search_form = document.querySelector("#search-form");
const profile_page = document.querySelector("#profile-page");
const search_page = document.querySelector("#search-page");

search_form.addEventListener("submit", (e) => {
  e.preventDefault();
  doSearch(search_page, profile_page);
});
