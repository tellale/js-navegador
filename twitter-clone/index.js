// Creation of tweet -> from form

const createTweetFromElement = document.querySelector('#createTweetForm')

createTweetFromElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nameTweet = document.querySelector('#userName');
    const textTweet = document.querySelector('#tweetMessage');

    let obj = {
        author: nameTweet.value,
        message: textTweet.value,
        image: 'https://i.pinimg.com/474x/4c/c2/3e/4cc23e28035d3bef286c29139319c044--twitter-icon-icons.jpg',
    }

    const response = await fetch('https://kc-fake-tweets-api.onrender.com/posts', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const createdTweet = await response.json();

    nameTweet.value = '';
    textTweet.value = '';

    fetchTweets(createdTweet)

})

// 2 Listado de tweets-> Pintar listado de tweets from api

const tweetListElement = document.querySelector('.tweetList');

async function fetchTweets(tweet) {
    const response = await fetch('https://kc-fake-tweets-api.onrender.com/posts');
    const tweets = await response.json();
    tweetListElement.innerHTML = '';

    tweets.forEach((tweet) => {
        const tweetElement = document.createElement('article');
        tweetElement.innerHTML = `
        <p>Autor: ${tweet.author}</p>
        <p>${tweet.message}</p>
        <p>${tweet.likes.length} likes y ${tweet.comments.length} comentarios</p>
        `;

        tweetListElement.appendChild(tweetElement)
    })
}
fetchTweets()