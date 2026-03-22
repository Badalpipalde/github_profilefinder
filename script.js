let usernameinp= document.querySelector(".usernameinp");
let searchbtn= document.querySelector(".Search");
let card= document.querySelector(".card");

function userprofile(username){
    return fetch(`https://api.github.com/users/${username}`).then((raw)=> raw.json())
    if(!raw.ok) throw new ERROR("user not found");
    return raw.json(); 
}


function userRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw)=> raw.json())
    if(!raw.ok) throw new ERROR("fetching failed...");
    return raw.json();

}

function decorateProfile(details){
    console.log(details);
    let data= `  
          <!-- Avatar -->
          <img src="${details.avatar_url}" class=" w-20 h-20 rounded-full border-2 border-blue-500 object-cover"/>

          <!-- Info -->
          <div>
            <h2 class="text-xl font-semibold">${details.name}</h2>
            <p class="text-gray-400">@${details.login}</p>
            <p class="text-gray-500 text-sm mt-1">${details.bio}</p>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 mt-6 text-center">
          <div class="bg-gray-800 rounded-lg p-3">
            <p class="text-lg font-semibold">${details.public_repos}</p>
            <p class="text-gray-400 text-sm">Repos</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-3">
            <p class="text-lg font-semibold">${details.followers}</p>
            <p class="text-gray-400 text-sm">Followers</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-3">
            <p class="text-lg font-semibold">${details.following}</p>
            <p class="text-gray-400 text-sm">Following</p>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="mt-6 space-y-2 text-sm text-gray-400">
          <p>📍 Location ${details.location? details.location: "Not Available"}</p>
          <p>🔗 Website ${details.website_url? details.website_url: "Not Available"}</p>
          <p>🏢 Company ${details.company? details.company: "Not Available"}</p>
        </div> `

        card.innerHTML= data;
}

searchbtn.addEventListener("click", function(){
    let username= usernameinp.value.trim();
    if(username.length>0){
        userprofile(username).then(function(data){
            decorateProfile(data);
        })

    }
    else{
        alert("enter username");
    }
})