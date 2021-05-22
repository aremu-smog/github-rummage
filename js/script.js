import generateRepository from "./components/repository.js";

const body = document.querySelector("body");
const tabsProfile = document.querySelector("#tabs-profile");

document.addEventListener("scroll", () => {
  if (body.scrollTop > 370) {
    tabsProfile.style.display = "flex";
  } else {
    tabsProfile.style.display = "none";
  }
});

setTimeout(
  fetch(`https://api.github.com/graphql`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer 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",
    },
    body: JSON.stringify({
      query: `
     query { 
        user(login:"ireade"){
            name
          avatarUrl
          login
          bio
          status{
            emoji
      
          }
          repositories(first: 20, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC }){
            edges{
              node{
                name
                description
                forkCount
                stargazerCount
                primaryLanguage{
                  name
                  color
                }
                
              }
            }
          }
        }
      }
  
      `,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
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
    })
    .catch((error) => {
      console.log(error);
    }),
  5000
);
