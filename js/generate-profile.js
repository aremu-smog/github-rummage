import generateRepository from "./components/repository.js";

const generateProfile = (data) => {
  const fullname_display = document.querySelector(".fullname");
  const bio_display = document.querySelector(".bio");
  const repos_display = document.querySelector(".repos .list");
  const allAvatars = document.querySelectorAll(".avatar img");
  const allUsername = document.querySelectorAll(".username");

  const user = data.data.user;
  const fullname = user.name;
  const username = user.login;
  const bio = user.bio;
  const avatar = user.avatarUrl;
  const repositories = user.repositories.edges;

  bio_display.innerHTML = bio;
  fullname_display.innerHTML = fullname;

  allAvatars.forEach((avatar_display) => {
    avatar_display.src = avatar;
  });

  allUsername.forEach((username_display) => {
    username_display.innerHTML = username;
  });

  repositories.map((repository, index) => {
    if (index === 0) {
      //Clear the repos
      repos_display.innerHTML = "";
    }
    repos_display.innerHTML += generateRepository(repository.node);
  });
};

export default generateProfile;
