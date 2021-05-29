import doSearch from "./search.js";

const search_form = document.querySelector("#search-form");
const profile_page = document.querySelector("#profile-page");
const search_page = document.querySelector("#search-page");

search_form.addEventListener("submit", (e) => {
  e.preventDefault();
  doSearch(search_page, profile_page);
});

const mobile_menu_button = document.querySelector("#mobile-menu-button");

mobile_menu_button.addEventListener("click", () => {
  const mobile_navigation = document.querySelector("#mobile-nav");

  if (mobile_navigation.classList.contains("active")) {
    mobile_navigation.classList.remove("active");
  } else {
    mobile_navigation.classList.add("active");
  }
});
