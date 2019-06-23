window.onload = function () {
  // my array
  var topics = ['corgi', 'golden retriver', 'shiba inu', 'chow chow', 'poodle', 'beagle']
  var myButton = document.querySelector('#myButtons')
  var gifs = document.querySelector('#gifs')
  var moveGif = []
  var doggo
  var queryURL
  // array buttons
  function renderButtons () {
    myButton.innerHTML = ''
    for (let topic of topics) {
      var btn = document.createElement('button')
      btn.classList.add('dog')
      btn.setAttribute('data-topic', topic)
      btn.innerText = topic.trim()
      myButton.appendChild(btn)
    }
  }
  // display initial buttons
  renderButtons()
  // when a dog button is clicked
  myButton.addEventListener('click', function (event) {
    doggo = event.target.dataset.topic.replace(' ', '+')
    queryURL = `https://api.giphy.com/v1/gifs/search?api_key=7lGan93Wp6WZqVcPSX8uhY5l5DD8m7tH&q=${doggo}&limit=10`
    if (event.target.tagName === 'BUTTON') {
      // fetch gifs
      if (window.fetch) {
        fetch(queryURL, {
          method: 'GET'
        })
          .then(result => result.json())
          .then(response => {
            console.log(response)
            var results = response.data
            gifs.innerHTML = ''
            for (var i = 0; i < results.length; i++) {
              var doggyDiv = document.createElement('div')
              doggyDiv.classList.add('gif')
              var p = document.createElement('p')
              p.innerText = `Rating: ${results[i].rating.toUpperCase()}`
              var doggyImage = document.createElement('img')
              doggyImage.setAttribute('src', results[i].images.fixed_height_still.url)
              moveGif.push(results[i].images.fixed_height)
              doggyDiv.appendChild(p)
              doggyDiv.appendChild(doggyImage)
              gifs.prepend(doggyDiv)
            }
          })
      } else {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', queryURL)

        xhr.onload = (event) => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText).data
              gifs.innerHTML = ''
              for (var i = 0; i < data.length; i++) {
                var doggyDiv = document.createElement('div')
                doggyDiv.classList.add('gif')
                var p = document.createElement('p')
                p.innerText = `Rating: ${data[i].rating.toUpperCase()}`
                var doggyImage = document.createElement('img')
                doggyImage.setAttribute('src', data[i].images.fixed_height_still.url)
                doggyDiv.appendChild(p)
                doggyDiv.appendChild(doggyImage)
                gifs.prepend(doggyDiv)
              }
            } else {
              console.error(xhr.responseText)
            }
          }
        }
        xhr.onerror = (event) => {
          console.error(xhr.responseText)
        }
        xhr.send()
      }
    }
  })

  // function to stop and animate gifs
  gifs.addEventListener('click', function (event) {
    if (event.target.tagName === 'IMG') {
      if (window.fetch) {
        fetch(queryURL, {
          method: 'GET'
        })
          .then(result => result.json())
          .then(response => {
            console.log(event.target.src)
            var result = event.target.src
            if (result.indexOf('200.gif') !== -1) {
              var changeState = result.replace('200.gif', '200_s.gif')
              console.log(changeState)
              event.target.src = changeState
            } else if (result.indexOf('200_s.gif') !== -1) {
              var changeState = result.replace('200_s.gif', '200.gif')
              event.target.src = changeState
            }
          })
      } else {
        var xhr = new XMLHttpRequest()

        xhr.open('GET', queryURL)

        xhr.onload = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log(event.target.src)
              var result = event.target.src
              if (result.indexOf('200.gif') !== -1) {
                var changeState = result.replace('200.gif', '200_s.gif')
                console.log(changeState)
                event.target.src = changeState
              } else if (result.indexOf('200_s.gif') !== -1) {
                var changeState = result.replace('200_s.gif', '200.gif')
                event.target.src = changeState
              }
            }
          } else {
            console.error(xhr.responseText)
          }
        }

        xhr.onerror = (event) => {
          console.error(xhr.responseText)
        }
        xhr.send()
      }
    }
  })

  // add dog name buttons and display them
  document.querySelector('#add-dog').addEventListener('click', (event) => {
    event.preventDefault()
    // This line grabs the input from the textbox
    var topic = document.querySelector('#dog-input').value.trim()
    // Adding the dog name from the textbox to our array
    topics.push(topic)
    console.log(topics)
    // call function to apply to new buttons
    renderButtons()
    return false
  })
}
