const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
  let removeName = document.getElementById('remove').value
  console.log(removeName);
  fetch('/data', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      Name: removeName
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'Nothing to delete') {
          messageDiv.textContent = 'Nothing to delete'
        } else {
          window.location.reload()
        }
      })
      .catch(console.error)
  })
  

/*update.addEventListener('click', _ => {
    fetch('/data', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      name: 'Darth Vadar',
      address: 'I find your lack of faith disturbing.'
      })
    })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload()
  })
  })*/