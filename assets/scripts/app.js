const list = document.querySelector('.list');
let mainDiv = document.getElementsByClassName('row padding');
const expandDiv = document.getElementsByClassName('expanded');
const bodyExpanded = document.getElementById('body-div');
// const postTemplate = document.querySelector('#templ');

// function sendHttpRequest(method, url) {
//     return fetch(url, {
//         method:method
//     }).then(response => {
//         if(response.status >= 200 && response.status <= 300) {
//             return response.json();
//         } else {
//             return response.json().then(err => {
//                 console.log(err);
//                 throw new Error('Something went wrong - server side');
//             });
//         }
//     }).catch(error => {
//         console.log(error);
//         throw new Error('Something went wrong...')
//     });
// }

async function fetchPosts() {
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        );

        const listOfPosts = response.data;

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
            const postBody = postElement.body;
            bodyExpanded.innerHTML = postBody;
            transitionFunction(postId);
        }
        
    });
}

function transitionFunction(id) {
    const deleteBtn = document.getElementById('deleteData');
    deleteBtn.addEventListener('click', deletePost.bind(null, id));
}

async function deletePost(id) {
    try{
        const responseData = await axios.delete(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        alert('Data Deleted from the server');
    } catch(error) {
        console.log(error.message);
    }
}
// async function deletePost(id) {
//     deleteBtn.addEventListener('click', event => {
//         try{
//         const responseData = await sendHttpRequest(
//             'DELETE',
//             `https://jsonplaceholder.typicode.com/posts/${id}`
//         );
//         alert('Data Deleted from the server');
//     } catch(error) {
//         console.log(error.message);
//     }
//     });
    
// }

fetchPosts();
expandPost();