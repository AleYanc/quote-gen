const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitter = document.getElementById('twitter');
const newQuote = document.getElementById('new-quote');

// Get Quote From API //
async function getQuote() {
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // If there's no author, add Unknown //
        if (data.quoteAuthor === 0) {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        
        //Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quote.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

    } catch (err) {
        getQuote();
    }
}

// Twitter Function //
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners //
newQuote.addEventListener('click', getQuote);

twitter.addEventListener('click', tweetQuote);

// On Load //
getQuote();