const newPostHandler = async (event) => {
    event.preventDefault();
  
    const newArticle = document.querySelector('#new-article');
    const postForm = document.getElementById('new-article-form');
    
    postForm.style.display = "block";
  }
  
  const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#article-name').value.trim();
    const description = document.querySelector('#article-description').value.trim();
  
    if (name && description) {
      const response = await fetch(`/api/articles`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Error. Article not Created.');
      }
    }
  };
  
  document
    .querySelector('.new-article-form')
    .addEventListener('submit', newFormHandler);
  
    document
    .querySelector('.new-article')
    .addEventListener('click', newPostHandler);
  