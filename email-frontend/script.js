document.getElementById('emailForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
  
    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, text: message }),
      });
  
      const result = await response.json();
      const responseElement = document.getElementById('response');
  
      if (result.success) {
        responseElement.textContent = result.message;
        responseElement.style.color = 'green';
      } else {
        responseElement.textContent = result.message;
        responseElement.style.color = 'red';
      }
    } catch (error) {
      document.getElementById('response').textContent = 'Erreur : connexion au serveur impossible.';
      document.getElementById('response').style.color = 'red';
    }
  });