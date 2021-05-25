import generateProfile from "./generate-profile.js";

const query = `
query($username: String!) { 
   user(login:$username){
       name
     avatarUrl
     login
     bio
     status{
      message
      emojiHTML
    }
    allRepos: repositories{
      totalCount
    }
     publicRepos: repositories(first: 20, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC }){

      totalCount
      
       edges{
         node{
           name
           description
           forkCount
           stargazerCount
           updatedAt
           primaryLanguage{
             name
             color
           }
           
         }
       }
     }
   }
 }

 `;

const username = document.querySelector("#username_input");
const message_container = document.querySelector("#message-container");

const page_title = document.querySelector("title");
const submit_button = document.querySelector(`input[type="submit"]`);

const doSearch = async (search_page, profile_page) => {
  message_container.style.display = "block";
  message_container.style.borderColor = "var(--github-light-blue)";

  message_container.innerHTML = `Load din din Loading`;

  submit_button.disabled = true;
  submit_button.style.background = "var(--github-gray)";
  submit_button.value = "Hang on 🤚";

  await fetch(`https://api.github.com/graphql`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer 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",
    },
    body: JSON.stringify({
      query: query,
      variables: {
        username: username.value,
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      generateProfile(data);
      page_title.innerText = `${username.value}'s repositories`;
      search_page.style.display = "none";
      profile_page.style.display = "block";
    })
    .catch((error) => {
      const error_message = error.message;

      username.value = "";
      message_container.style.borderColor = "var(--github-peach)";

      if (error_message == "Failed to fetch") {
        message_container.innerHTML = `Your internet appears not be with you on this one. Kindly try again`;
      } else {
        message_container.innerHTML = `The pain...  the sadness... when you can't find something you are looking for😞. Luckily you can try again😍`;
      }

      console.log(error_message);

      setTimeout(() => {
        message_container.style.display = "none";
      }, 5000);
    });

  submit_button.disabled = false;
  submit_button.style.background = "var(--github-blue)";
  submit_button.value = "Search";
};

export default doSearch;
