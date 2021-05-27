import generateRepository from "./components/repository.js";

const generateProfile = (data) => {
  // Select appropriate DOM elements to hold each user data
  const fullname_display = document.querySelector(".fullname");
  const bio_display = document.querySelector(".bio");
  const status_display = document.querySelector("#status");
  const status_emoji_display = document.querySelector("#status_emoji");
  const status__message_display = document.querySelector("#status_message");
  const total_no_of_repos_display = document.querySelectorAll(".total_repos");
  const total_public_repos_display = document.querySelector(
    "#total_public_repos"
  );
  const repos_display = document.querySelector(".repos .list");
  const allAvatars = document.querySelectorAll(".avatar img");
  const allUsername = document.querySelectorAll(".username");

  // Retrieve and store all user data
  const user = data.data.user;

  const fullname = user.name;
  const username = user.login;
  const bio = user.bio;
  const avatar = user.avatarUrl;
  const repositories = user.publicRepos.edges;
  const total_public_repos = user.publicRepos.totalCount;
  const total_no_of_repos = user.allRepos.totalCount;

  // Update the DOM with appropriate values
  bio_display.innerHTML = bio;

  total_public_repos_display.innerHTML = total_public_repos;

  total_no_of_repos_display.forEach((total_no_of_repo_display) => {
    total_no_of_repo_display.innerHTML = total_no_of_repos;
  });

  if (user.status) {
    const status_emoji = user.status.emojiHTML;
    const status_message = user.status.message;

    if (status_message && status_emoji) {
      status_emoji_display.innerHTML = user.status.emojiHTML;
      status__message_display.innerHTML = user.status.message;
      status_display.style.display = "flex";
    } else {
      status_display.style.display = "none";
    }
  } else {
    status_display.style.display = "none";
  }

  fullname_display.innerHTML = fullname;

  allAvatars.forEach((avatar_display) => {
    avatar_display.src = avatar;
  });

  allUsername.forEach((username_display) => {
    username_display.innerHTML = username;
  });

  repositories.map((repository, index) => {
    if (index === 0) {
      //Clear the repos list
      repos_display.innerHTML = "";
    }
    repos_display.innerHTML += generateRepository(repository.node);
  });
};

export default generateProfile;
