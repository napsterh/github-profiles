const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getUser = async ( userName ) => {
   const userData = await fetch( APIURL + userName )
   const result = await userData.json()

   createUserCard(result)
   getRepos(userName)
} 

const getRepos = async ( userName ) => {
   const reposData = await fetch( APIURL + userName + "/repos" )
   const result = await reposData.json();

   addReposToCard(result)
}

const createUserCard = ( user ) => {
   const cardHTML = `
      <div class="card">
         <div>
            <img  class="avatar" src="${user.avatar_url}" alt="${user.name}" />
         </div>
         <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul class="info">
               <li>${user.followers}<strong>Followers</strong></li>
               <li>${user.following}<strong>Following</strong></li>
               <li>${user.public_repos}<strong>Public repos</strong></li>
            </ul>

            <div id="repos"></div>
         </div>
      </div>
   `;

   main.innerHTML = cardHTML;
}

const addReposToCard = ( repos ) => {
   const reposEl = document.getElementById("repos");

   const repoLimit = repos.sort((a, b) => b.stargazers_count - a.stargazers_count ).slice(0, 10);
   repoLimit.forEach(repo => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerHTML = repo.name;

      reposEl.appendChild(repoEl)
   });

}

form.addEventListener("submit", (e) => {
   e.preventDefault();

   const user = search.value;
   if( user ){
      getUser(user)

      search.value = "";
   }
})
