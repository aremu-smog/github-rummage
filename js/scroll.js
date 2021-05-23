const body = document.querySelector("body");
const tabsProfile = document.querySelector("#tabs-profile");

document.addEventListener("scroll", () => {
  if (body.scrollTop > 370) {
    tabsProfile.style.display = "flex";
  } else {
    tabsProfile.style.display = "none";
  }
});
