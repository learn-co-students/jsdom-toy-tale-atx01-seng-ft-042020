let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  fetch('http://localhost:3000/toys')
  .then((resp) => resp.json())
  .then((json) => addToys(json))
  .catch((err) => console.error(err))

  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', addNewToy)
});

function addToys(toys) {
  for (toy of toys) {
    renderToy(toy)
  }
}

function addNewToy(event) {
  event.preventDefault()

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    })
  })
  .then((resp) => resp.json())
  .then((json) => renderToy(json))
  .catch((err) => console.error(err))  
}

function renderToy(toy) {
  const div = document.getElementById('toy-collection')

  const newDiv = document.createElement('div')
  newDiv.classList.add('card')
  
  const header = document.createElement('h2')
  header.innerText = toy.name
  newDiv.appendChild(header)

  const image = document.createElement('img')
  image.classList.add('toy-avatar')
  image.src = toy.image
  newDiv.appendChild(image)

  const paragraph = document.createElement('p')
  paragraph.innerText = toy.likes
  newDiv.appendChild(paragraph)

  const button = document.createElement('button')
  button.classList.add('like-btn')
  button.addEventListener('click', (e) => addLike(toy))
  newDiv.appendChild(button)

  div.appendChild(newDiv)
}

function addLike(toy) {
  console.log('Clicked!')
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: (toy.likes + 1)
    })
  })
  .then((resp) => resp.json())
  .then((json) => updateToy(json))
  .catch((err) => console.error(err))
}

function updateToy(toy) {
  const paragraph = Array.from(document.querySelectorAll('h2')).filter(element => element.innerText === toy.name)[0].parentElement.querySelector('p')
  paragraph.innerText = toy.likes
}

