const createPostBtn = document.getElementById("create-post");
const form = document.getElementById("new-post-form");

createPostBtn.addEventListener('click', function() {
    // show form
    form.setAttribute('style', 'display: block;')
    createPostBtn.setAttribute('style', 'display: none;')
});

// if (title && content) {
//     const response = await fetch(`/api/homeRoutes.js`, {
//         method: 'POST',
//         body: JSON.stringify({ title, content }),
//         // TODO: ADD : headers: ???
//     });

//     if(response.ok) {
//         document.location.replace('/profile');
//     } else {
//         alert('Failed to save blog');
//     }
// };
