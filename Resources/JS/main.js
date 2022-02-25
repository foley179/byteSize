// Information to reach API
const apiKey = "YOUR_API_KEY_HERE";
const url = 'https://api.rebrandly.com/v1/links';

// Some page elements
const inputField = document.querySelector('#input');
const shortenButton = document.querySelector('#shorten');
const responseField = document.querySelector('#responseField');

// AJAX functions
const shortenUrl = () => {
    const urlToShorten = inputField.value;
    const data = JSON.stringify({destination: urlToShorten}); // we include this info because the API expects to see an object with a key "destination" that has a value of a url
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            //renderRawResponse(xhr.response); // for testing
            renderResponse(xhr.response);
        }
    }
    xhr.open("POST", url);
    // to access an api, we need a header with 2 key-value pairs, keys being "Content-type" and "apikey"
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('apikey', apiKey);
    xhr.send(data);
};

// for the fetch() version the headers are created within the fetch func itself along with the data and url
// this may look messy, its just to structure the object to show where each starts and finishes
/*
const shortenUrl = () => {
    const urlToShorten = inputField.value;
    const data = JSON.stringify({destination: urlToShorten});
    fetch(url, {method: "POST", // 1st arg is the url, 2nd is an object, the method being POST
                headers: {'Content-type': 'application/json', 
                        'apikey': apiKey}, // this is the headers created for the object, needed to access an API
                body: data})
    .then( (response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Request failed!');
        }
    }, (networkError) => {
        console.log(networkError.message);
    })
    .then( (jsonResponse) => {
        renderResponse(jsonResponse)
    })
};
*/

// fetch with async/await apparently the easiest/simplest way to do this
/* 
const shortenUrl = async() => {
    const urlToShorten = inputField.value;
    const data = JSON.stringify({destination: urlToShorten});
    try{
        const response = await fetch(url, {method: "POST",
                                           headers: {'Content-type': 'application/json', 
                                                     'apikey': apiKey}, 
                                           body: data})
        if (response.ok) {
            const jsonResponse = await response.json();
            renderResponse(jsonResponse);
        }
        throw new Error('Request failed!');
    } catch(error) {
        console.log(error.message);
    }
};
*/

// Clear page and call AJAX functions
const displayShortUrl = (event) => {
    event.preventDefault();
    while(responseField.firstChild){
        responseField.removeChild(responseField.firstChild);
    }
    shortenUrl();
}

shortenButton.addEventListener('click', displayShortUrl);
