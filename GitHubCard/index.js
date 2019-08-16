/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

//Requesting and adding my card
axios.get('https://api.github.com/users/Joe-Thompson')
  .then (res => {
    let info = res.data;
    let cards = document.querySelector('.cards');
    let cardInfo = devCard(info);
    cards.appendChild(cardInfo);
  });


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

//Filled array with lambda staff
const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell',
];

//forEach to add cards for lambda staff
i = 0;
followersArray.forEach(function(user, i) {
  axios.get(`https://api.github.com/users/${followersArray[i]}`)
    .then (res => {
      let info = res.data;
      let cards = document.querySelector('.cards');
      let cardInfo = devCard(info);
      cards.appendChild(cardInfo);
    }), i++;
})

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

//card creator function
function devCard(obj) {
  //creating elements to add content to
  let card = document.createElement('div');
  let imgURL = document.createElement('img');
  let cardInfo = document.createElement('div');
  let title = document.createElement('h3');
  let userName = document.createElement('p');
  let local = document.createElement('p');
  let profile = document.createElement('p');
  let profileLink = document.createElement('a');
  let followers = document.createElement('p');
  let following = document.createElement('p');
  let bio = document.createElement('p');
  let linkHTML = obj.html_url;

  //adding classes to created elements
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  title.classList.add('name');
  userName.classList.add('username');

  //appending created elements into a componenet
  card.appendChild(imgURL);
  card.appendChild(cardInfo);
  cardInfo.appendChild(title);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(local);
  cardInfo.appendChild(profile);
  profile.appendChild(profileLink);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  //adding info from axios to created elements
  imgURL.src = obj.avatar_url;
  title.textContent = obj.name;
  userName.textContent = obj.login;
  local.textContent = obj.location;
  profileLink.innerHTML = linkHTML.link(obj.html_url);
  followers.textContent = `Followers - ${obj.followers}`;
  following.textContent = `Following - ${obj.following}`;
  bio.textContent = obj.bio;

  return card;
};

