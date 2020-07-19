const toysURL = 'http://localhost:3000/toys'
let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
  
  showForm();
  fetchToys();
  submitToy();
  
});

function showForm(){
  const toyFormContainer = document.querySelector('.toy-form-container');
  const addButton = document.getElementById('new-toy-btn');

  console.log(toyFormContainer);
  addButton.addEventListener('click', () => {
    addToy = !addToy;

    if (addToy){
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
};

function postToy(toy){
  
  fetch(toysURL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(response => response.json())
  .then(json => createToyCard(json))

};

function submitToy(){
  const submitForm = document.getElementById('add-toy-form');

  submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const toy = {
      'name': e.target.name.value,
      'image': e.target.image.value,
      'likes': 0
    }
    postToy(toy);
  })
};

function fetchToys(){
  fetch(toysURL)
  .then(response => response.json())
  .then(json => {
    for(const toy of json){
      createToyCard(toy)
    }
  })
};

function createToyCard(toy){
  const toyCollection = document.getElementById('toy-collection');

  const toyCard = document.createElement('div');


  toyCard.className = 'card';
  toyCard.innerHTML = `
  
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes}</p>
    <button class="like-btn">Like 🤠</button>
    <button class="delete-btn">Delete 🥵</button>
  `;

  toyCard.addEventListener('click', (event) => {
    if (event.target.matches("button.like-btn")){
      toy.likes ++;
      toyCard.querySelector('p').innerText = toy.likes;
      patchLikes(toy);
    };

    if (event.target.matches("button.delete-btn")){
      deleteToy(toy, toyCard);
    }
  })

  toyCollection.appendChild(toyCard);
};

function patchLikes(toy){
  fetch(`${toysURL}/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      'likes': toy.likes
    })
  })
};

function deleteToy(toy, card){
  fetch(`${toysURL}/${toy.id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
  });
  card.remove();
};

// {id: 1, name: "Woody", image: "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png", likes: 5}
// let addToy = false;
// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });