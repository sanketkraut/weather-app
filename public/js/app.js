const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch('/weather?address='+address).then((response) => {
    response.json().then(({error, location, forecast} ={}) => {
        if(error){
            return message1.textContent = error
        }
        message1.textContent = location
        message2.textContent = forecast
    })
})
})