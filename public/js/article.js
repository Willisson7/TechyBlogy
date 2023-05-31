const displayUpdateHandler = async (event) => {
    event.preventDefault();
  
    const oldPost = document.getElementById('old-post-form');
    
    oldPost.style.display = "block";
  }
  
  const updateButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const title = document.querySelector('#article-title').value.trim();
      const content = document.querySelector('#article-content').value.trim();
  
      const response = await fetch(`/api/article/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update Article');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    console.log(event.target);
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete Article');
      }
    }
  };
  
  document
  .querySelector('.article-update')
  .addEventListener('click', displayUpdateHandler);
  
  document
    .querySelector('.form-save')
    .addEventListener('click', updateButtonHandler);
  
  document
    .querySelector('.article-delete')
    .addEventListener('click', delButtonHandler);
  
  