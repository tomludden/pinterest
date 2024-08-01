import './style.css'

const cardsContainer = document.getElementById('cards-container')
const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const toggleBtn = document.getElementById('toggle-btn')
const header = document.getElementById('header')
const mainContent = document.getElementById('main-content')
const footer = document.getElementById('footer')
const headerLogo = document.getElementById('header-logo')

let darkMode = false

const API_KEY = 'ElxjxqYpf7giZpF9Xx1c0rsnB6cjhV_STxe5a3pekaI'
const API_URL = 'https://api.unsplash.com/search/photos'

const loadImages = (query = 'dog') => {
  fetch(`${API_URL}?query=${query}&client_id=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      cardsContainer.innerHTML = ''

      if (data.results.length === 0) {
        loadImages('cats') // If no results, load cats
        alert('No results found, showing cats instead.')
      } else {
        data.results.forEach((photo) => {
          const card = document.createElement('div')
          card.className = 'card'

          const img = document.createElement('img')
          img.src = `${photo.urls.raw}&w=300&h=450&fit=crop`
          img.alt = photo.alt_description || 'No description'
          card.appendChild(img)

          const title = document.createElement('h2')
          title.textContent = photo.description || 'No title'
          card.appendChild(title)

          const description = document.createElement('p')
          description.textContent = photo.alt_description || 'No description'
          card.appendChild(description)

          const userInfo = document.createElement('div')
          userInfo.className = 'user-info'

          const userImg = document.createElement('img')
          userImg.src = photo.user.profile_image.small
          userImg.className = 'user-img'
          userInfo.appendChild(userImg)

          const likesContainer = document.createElement('div')
          likesContainer.className = 'likes-container'

          const heartIcon = document.createElement('span')
          heartIcon.className = 'heart-icon'
          heartIcon.innerHTML = '❤️' // Using a heart emoji or replace with an image
          /* 
          const likes = document.createElement('span');
          likes.className = 'likes-count'; 1st clsass ""
          likes.textContent = `${photo.likes} likes`; */
          const likes = document.createElement('span')
          likes.className = 'likes-count'
          likes.textContent = `${photo.likes} likes`

          likesContainer.appendChild(heartIcon)
          likesContainer.appendChild(likes)

          userInfo.appendChild(likesContainer)
          card.appendChild(userInfo)

          cardsContainer.appendChild(card)
        })
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
      alert('Something went wrong. Please try again later.')
    })
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
  performSearch()
})

// Event listener for Enter key in the search input
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    performSearch()
  }
})

function performSearch() {
  const query = searchInput.value.trim()
  if (query) {
    loadImages(query)
    searchInput.value = '' // Optionally clear input after search
  }
}

loadImages()

const resetToLandingPage = () => {
  loadImages()
}

headerLogo.addEventListener('click', resetToLandingPage)

toggleBtn.addEventListener('click', () => {
  darkMode = !darkMode
  if (darkMode) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
})
