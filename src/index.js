import Character from "./components/Character";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";
import "./style.scss";
let currentPage = 1


const root = document.querySelector("#root")
let characterContainer = document.querySelector('.character-container')
const popupContainerElement = document.querySelector('.popup-container')
const popupElement = document.querySelector('.popup-block')
const popupWindow = document.querySelector('.popup-window')


function loading () {
  characterContainer.innerHTML = Loading()
}

async function getData (page = 1) {
  loading()
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
  const data = await response.json()
  console.log(data);
  const characterArray = data.results // получаем массив персонажей с API

  const htmlResult = characterArray.map(({name, species, status, image,id}) => { 
    return Character(name, species, status, image, id) // преобразовываем объекты в HTML с помощью функции Character()
  })
  
  characterContainer.innerHTML = htmlResult.join("") // соединяем массив в строку чтобы записать в HTML
}

async function showMore (page = 1) {
  
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
  const data = await response.json()

  const characterArray = data.results // получаем массив персонажей с API

  const htmlResult = characterArray.map(({name, species, status, image,id}) => { 
    return Character(name, species, status, image, id) // преобразовываем объекты в HTML с помощью функции Character()
  })

  characterContainer.insertAdjacentHTML('beforeend', htmlResult.join("")); // соединяем массив в строку чтобы записать в HTML
}
const showMoreBtn = document.querySelector('#show-more').addEventListener('click', async () => {
  console.log(123);
  currentPage += 1
  await showMore( currentPage)
})
getData()




async function searchData (searchName) {
  loading()
  const response = await fetch(`https://rickandmortyapi.com/api/character?name=${searchName}`)

  if(response.status != 200) {
    characterContainer.innerHTML = NotFound()
    return
  }

  const data = await response.json()

  const characterArray = data.results // получаем массив персонажей с API

  const htmlResult = characterArray.map(({name, species, status, image, id}) => { 
    return Character(name, species, status, image, id) // преобразовываем объекты в HTML с помощью функции Character()
  })

  characterContainer.innerHTML = htmlResult.join("") // соединяем массив в строку чтобы записать в HTML
}
getData()

document.querySelector('#main-submit-search').addEventListener('click', () => {
  const searchValue = document.querySelector('#main-search-bar').value
  searchData(searchValue)
})





function updatePageButtons (){
  if (currentPage == 1) {
    document.querySelector('#prev').classList.add('hidden')
  }else{
    document.querySelector('#prev').classList.remove('hidden')
  }

}
updatePageButtons()
document.querySelector('#prev').addEventListener('click', () => {
  currentPage -= 1
  updatePageButtons()
  console.log(currentPage);
  getData(currentPage)
})

document.querySelector('#next').addEventListener('click', () => {
  currentPage += 1
  updatePageButtons()
  console.log(currentPage);
  getData(currentPage)
})

const popUpLoading = () => {
  //
}







const showPopUp = async (id) => {
  popupContainerElement.classList.remove('hidden')
  
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)

  const characterData = await response.json()

  popupElement.innerHTML = `
  <div class="popup-content">
  <div class="image-container">
    <img class="popup-image" src="${characterData.image}">
  </div>

  <div class="values-container">
    <div class="title"> ${characterData.name} <span class="id-title">[id: ${characterData.id}]</span> </div>
    <div class="value">Status: <span class="property">${characterData.status}</span> </div>
    <div class="value">Species: <span class="property">${characterData.species}</span> </div>
    <div class="value">Type: <span class="property">${characterData.type}</span> </div>
    <div class="value">Gender: <span class="property">${characterData.gender}</span> </div>
    <div class="value">Origin: <span class="property">${characterData.origin.name}</span> </div>
    <div class="value">Location: <span class="property">${characterData.location.name}</span> </div>
  </div>
</div>
  `
}



const hidePopup = async () =>  { 
  popupContainerElement.classList.add('hidden')
}


document.querySelector('.close-button').addEventListener('click', hidePopup)

document.querySelector(".character-container").addEventListener('click', (event) => {
const id = event.target.id ? event.target.id : event.target.parentElement.id
if (id == "root") return
  showPopUp(id)
})

function closePopUpWindow() {
  popupContainerElement.addEventListener('click', (event) => {
    if (event.target.closest('.popup-window')) return; // Игнорировать клики внутри всплывающего окна
    hidePopup();
  });
}

closePopUpWindow()






















// const demoPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("прошла 1 секунда")
//   }, 1000)
// })

// const demoPromise2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("прошла 1 секунда")
//   }, 2000)
// })

// const demoPromise3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("прошла 1 секунда")
//   }, 3000)
// })

// async function demoFunction () {
//   console.log(await demoPromise)
//   console.log(await demoPromise2)
//   console.log(await demoPromise3)
// }

// function resolveAfter5Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('success');
//     }, 1000);
//   });
// }

// async function call(){
//   const result = await resolveAfter5Seconds()
//   console.log(result)
// }

// call()

// // demoPromise.then((value) => {
// //   console.log(value)
// //   console.log(demoPromise)
// // }).catch(() => {
// //   console.log("что-то пошло не так!!")
// //   console.log(demoPromise)
// // })

