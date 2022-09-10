var createPostBtn = document.getElementById("create-post");
var form = document.getElementById("new-post-form");

createPostBtn.addEventListener('click', function() {
    // show form
    form.setAttribute('style', 'display: block;')
    createPostBtn.setAttribute('style', 'display: none;')
})