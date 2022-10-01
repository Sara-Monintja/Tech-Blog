const createPostBtn = document.getElementById("create-post");
const form = document.getElementById("new-post-form");

createPostBtn.addEventListener('click', function() {
    // show form
    form.setAttribute('style', 'display: block;')
    createPostBtn.setAttribute('style', 'display: none;')
});

const newBlog = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

if (title && content) {
    const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json',
          },
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to save blog');
    }
};  
}

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newBlog);
