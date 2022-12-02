// Creation of tweet
// DONE - form to get input from tweet. Name and message
// Crear un boton con el texto 'Create Tweet' que cuando se pulse ovtenga los datos del form y 
//los imprima por consola como si fuera un objeto
// una vez el boton se haya pulsado limpiaremos los datos del form. 

const createTweetFromElement = document.querySelector('#createTweetForm')

createTweetFromElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameTweet = document.querySelector('#userName');
    const textTweet = document.querySelector('#tweetMessage');

    let obj = {
        name: nameTweet.value,
        message: textTweet.value,
    }
    console.log(obj);

    nameTweet.value = '';
    textTweet.value = '';

})

// 2 Listado de tweets
// Pintar en pantalla los tweets wue obtenemos, tenemos que pintar ese tweet en pantalla mostrando:
// autor, mensaje, numero de likes y numero de comentarios

const tweetListElement = document.querySelector('.tweetList');


async function fetchTweets() {
    const response = await fetch('https://kc-fake-tweets-api.onrender.com/posts');
    const tweets = await response.json();

    tweets.forEach((tweet) => {
        const tweetElement = document.createElement('article');
        tweetElement.innerHTML = `
        <p>Autor: ${tweet.autor}</p>
        <p>${tweet.message}</p>
        <p>${tweet.likes.length} likes y ${tweet.comments.length} comentarios</p>
        `;

        tweetListElement.appendChild(tweetElement)
    })
}
fetchTweets()