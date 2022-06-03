const list = document.querySelector('.list');
let mainDiv = document.getElementsByClassName('row padding');
// const postTemplate = document.querySelector('#templ');
console.log(mainDiv);

function sendHttpRequest(method, url) {
    return fetch(url, {
        method:method
    }).then(response => {
        if(response.status >= 200 && response.status <= 300) {
            return response.json();
        } else {
            return response.json().then(err => {
                console.log(err);
                throw new Error('Something went wrong - server side');
            });
        }
    }).catch(error => {
        console.log(error);
        throw new Error('Something went wrong...')
    });
}

async function fetchPosts() {
    try {
        const responseData = await sendHttpRequest(
            'GET',
            'https://jsonplaceholder.typicode.com/posts'
        );

        const listOfPosts = responseData;

        for(const post of listOfPosts) {
            const postEl = document.createElement('li');
            postEl.className = 'list-item';
            postEl.innerHTML = 
            `
                <div id="title-inlist">${post.title}</div>
                <div id="div-button">
                    <button id="expand-btn">Expand</button>
                </div>
            `;
            postEl.id = post.id;
            postEl.body = post.body;
            list.append(postEl);
        }
    }catch(error) {
        console.log(error.message);
    }
}

function expandPost() {
    list.addEventListener('click', event => {
        if(event.target.tagName === 'BUTTON'){
            const postElement = event.target.closest('li');
            const postId = postElement.id;
            const postTitle = postElement.title;
            const postBody = postElement.body;
            const expandedEl = document.createElement('div');
            expandedEl.className = 'expanded col-xl-6';
            expandedEl.innerHTML =
            `
                    <div id="title-expanded">${postTitle}</div>
                    <div id="design">
                        <div class="el one"></div> 
                        <div class="el two"></div> 
                        <div class="el three"></div>
                    </div>
                    <div id="body-div">
                        <p>${postBody}</p>
                    </div>
                    <div id="div-delete">
                        <button id="deleteData">Delete</button>
                    </div>
            `;
            mainDiv.innerHTML += expandedEl.innerHTML;
        }
    });
}

fetchPosts();
expandPost();