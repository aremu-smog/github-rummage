const tabsProfile = document.querySelector("#tabs-profile");

document.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    tabsProfile.style.display = "flex";
    tabsProfile.style.zIndex = "10";
  } else {
    tabsProfile.style.display = "none";
    tabsProfile.style.zIndex = "inherit";
  }
});
