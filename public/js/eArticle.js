const commentButtonHandler = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#article-comment').value.trim();
    
    if (event.target.hasAttribute('data-id')) {
      const article_id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text, article_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/eArticle/'+article_id);
      } else {
        alert('Error! Comment not Added');
      }
    }
  };
  
  document
    .querySelector('.article-list')
    .addEventListener('submit', commentButtonHandler);
  