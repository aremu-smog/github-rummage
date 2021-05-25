const tabsProfile = document.querySelector("#tabs-profile");

document.addEventListener("scroll", () => {
  if (window.scrollY > 370) {
    tabsProfile.style.display = "flex";
  } else {
    tabsProfile.style.display = "none";
  }
});
