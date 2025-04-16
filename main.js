const URL_ALL_DOGS = new URL("https://dog.ceo/api/breeds/list/all");
const URL_RANDOM_DOG_IMAGE = new URL("https://dog.ceo/api/breeds/image/random");
const searchBreedForm = document.getElementById("searchBreedForm");
const removeList = document.getElementById("removeList");
let dogs = [];
function listValue(array) {
  dogs = Object.keys(array);
  return dogs;
}
//------------------------------------------------------------------------------------------------------
function getAllByFetch() {
  return fetch(URL_ALL_DOGS)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La respuesta ha fallado");
      }
      return response.json();
    })
    .then((data) => {
      listValue(data.message);
    })
    .catch((error) => console.error(error));
}

getAllByFetch().then(() => {
  if (dogs && dogs.length > 0) {
    console.log("aqui esta lleno");
    console.dir(dogs);
  } else {
    console.log("aun no");
  }
});

function getAllByAxios() {
  return axios
    .get(URL_ALL_DOGS)
    .then((response) => listValue(response.data.message))
    .catch((err) => console.error(err));
}
getAllByAxios().then(() => {
  if (dogs && dogs.length > 0) {
    console.log("aqui esta lleno");
    console.dir(dogs);
  } else {
    console.log("aun no");
  }
});

//------------------------------------------------------------------------------------------------------

function getRandomDogImageByFetch() {
  fetch(URL_RANDOM_DOG_IMAGE)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Algo ha fallado en la promesa");
      }
      return response.json();
    })
    .then((data) => renderImage(data.message))
    .catch((err) => console.error(err));
}
getRandomDogImageByFetch();

function getRandomDogImageByAxios() {
  axios
    .get(URL_RANDOM_DOG_IMAGE)
    .then((response) => renderImage(response.data.message))
    .catch((err) => console.error(err));
}
getRandomDogImageByAxios();

// Funcion para renderizar la imagen
function renderImage(URLimg) {
  const divElement = document.createElement("div");
  const img = document.createElement("img");
  img.src = URLimg;
  img.alt = "Un perro aleatorio";
  img.style.maxWidth = "500px";
  img.style.height = "auto";
  divElement.appendChild(img);
  document.body.appendChild(divElement);
}
//------------------------------------------------------------------------------------------------------
function listImagesByBreed_fetch(searchBreed) {
  fetch(`https://dog.ceo/api/breed/${searchBreed}/images`)
    .then((response) => {
      if (!response.ok) throw new Error("La respuesta ha fallado");
      return response.json();
    })
    .then((data) => listBreedRender(data.message))
    .catch((err) => console.error(err));
}

function listImagesByBreed_axios(searchBreed) {
  axios
    .get(`https://dog.ceo/api/breed/${searchBreed}/images`)
    .then((response) => listBreedRender(response.data.message))
    .catch((err) => console.error(err));
}

function listBreedRender(lista) {
  const ulItem = document.createElement("ul");
  ulItem.id = "breedList";
  lista.forEach((element) => {
    const liItem = document.createElement("li");
    liItem.textContent = element;
    ulItem.appendChild(liItem);
  });
  document.body.appendChild(ulItem);
}

searchBreedForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = e.target.elements["searchBreed"];
  listImagesByBreed_fetch(inputValue.value);
  //listImagesByBreed_axios(inputValue.value);
  e.target.elements["searchBreed"].value = "";
});
removeList.addEventListener("click", () => {
  document.getElementById("breedList").remove();
});
