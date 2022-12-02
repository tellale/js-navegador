// Creates a tweet from form
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

// Generates comments in HTML to add to DOM
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

// Asks for confirmation and deletes tweets if confirmed
async function deleteTweet(tweetId) {
    console.log(tweetId);

    const removeConfirmation = window.confirm('Estas seguro de borrar el tweet?')

    if (removeConfirmation) {
        await fetch(`https://kc-fake-tweets-api.onrender.com/posts/${tweetId}`, {
            method: 'DELETE',
        })
    
        const tweetElement = document.getElementById(tweetId);
        tweetElement.remove();
    }

}

// Draws tweet with all elements
function drawTweet(tweet) {
    const tweetElement = document.createElement('article');

    tweetElement.setAttribute('id', tweet.id)

    let tweetContent = `
    <p>Autor: ${tweet.author}</p>
    <p>${tweet.message}</p>
    <p>${tweet.likes.length} likes y ${tweet.comments.length} comentarios</p>
    <button onclick = 'deleteTweet(${tweet.id})'>Delete Tweet</button>
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

// Fetch tweets from API and calls drawTweet
async function fetchTweets() {
    const response = await fetch('https://kc-fake-tweets-api.onrender.com/posts');
    const tweets = await response.json();
    tweetListElement.innerHTML = '';

    tweets.forEach((tweet) => {
        drawTweet(tweet)
    })

}
fetchTweets()