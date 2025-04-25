export const quoteSwitching = () => {

    const quotes = document.querySelectorAll('.quote')
    const quotesLen = quotes.length
    let quoteIndex = 0;

    const updateQuote = () => {
        quotes.forEach((quote, index) => {
            quote.classList.toggle('active', quoteIndex === index);
        })
    }

    const nextQuote = () => {
        quoteIndex = (quoteIndex + 1) % quotesLen;
        updateQuote();
    }

    const prevQuote = () => {
        quoteIndex = (quoteIndex - 1 + quotesLen) % quotesLen;
        updateQuote();
    }

    return {
        nextQuote,
        prevQuote
    }
}


