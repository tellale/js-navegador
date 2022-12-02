// Creation of tweet -> from form

const createTweetFromElement = document.querySelector('#createTweetForm')
const tweetListElement = document.querySelector('.tweetList');

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

    drawTweet(createdTweet)

})

function generateTweetCommentsHTML(comments) {
    let HTLMResult = ''

    comments.forEach(comment => {
        HTLMResult = HTLMResult + `
        <li>
            <p>Autor: ${comment.author}</p>
            <p>${comment.message}</p>
        </li>
        `
    })
    return HTLMResult
}

function drawTweet(tweet) {
    const tweetElement = document.createElement('article');

    let tweetContent = `
    <p>Autor: ${tweet.author}</p>
    <p>${tweet.message}</p>
    <p>${tweet.likes.length} likes y ${tweet.comments.length} comentarios</p>
    `;

    if (tweet.comments.length > 0) {
        const tweetComments = generateTweetCommentsHTML(tweet.comments);
        tweetContent = tweetContent + `
        <hr>
        <p> Comentarios </p>
        <ul> ${tweetComments}</ul>
        `;
    }

    tweetElement.innerHTML = tweetContent

    tweetListElement.prepend(tweetElement)
}


// 2 Listado de tweets-> Pintar listado de tweets from api

async function fetchTweets() {
    const response = await fetch('https://kc-fake-tweets-api.onrender.com/posts');
    const tweets = await response.json();
    tweetListElement.innerHTML = '';

    tweets.forEach((tweet) => {
        drawTweet(tweet)
    })

}
fetchTweets()