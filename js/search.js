import generateProfile from "./generate-profile.js";

const username = document.querySelector("#username_input");
const message_container = document.querySelector("#message-box");

const page_title = document.querySelector("title");
const submit_button = document.querySelector(`input[type="submit"]`);

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

const doSearch = async (search_page, profile_page) => {
  //Style the message container

  //Disable submit button to prevent event from being fired more than once
  submit_button.disabled = true;

  submit_button.value = "Load din din Loading...";

  // Style and update submit button's value
  submit_button.classList.add("loading");

  //Make a call to graphql
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
      // Generate the user's profile based on data gotten from graphql
      generateProfile(data);

      //Update  the browser tabs title to reflect the user's name
      page_title.innerText = `${username.value}'s repositories`;

      // Close the search page
      search_page.classList.remove("active");

      // Open the profile page
      profile_page.classList.add("active");
    })
    .catch((error) => {
      // Retrieve the error
      const error_message = error.message;

      //Style the message feedback to reflect error
      message_container.classList.add("active", "error");

      if (error_message == "Failed to fetch") {
        message_container.innerHTML = `Your internet appears not be with you on this one. Kindly try again`;
      } else {
        //Clear the username input field
        username.value = "";

        // Update the feedback message
        message_container.innerHTML = `The pain...  the sadness... when you can't find something you are looking for😞. Luckily you can try again😍`;
      }

      const CLOSING_TIME = 5000;

      // Close the message box after the set CLOSING_TIME
      setTimeout(() => {
        message_container.classList.remove("error", "active");
      }, CLOSING_TIME);
    });

  // Restore default settings of the submit button
  submit_button.disabled = false;
  submit_button.classList.remove("loading");
  submit_button.value = "Search";
};

export default doSearch;
