
document.addEventListener('click', async (event)=>{
    const id = event.target.dataset.id
    if(event.target.dataset.type === 'remove') {
        await fetch(`/${id}`, {method: 'DELETE'}).then(()=>{
            event.target.closest('li').remove()
        })
    } else if (event.target.dataset.type === 'edit') {
        const newNoteText = prompt('Введите новое название:')
        if(newNoteText) {
            await fetch(`/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({title: newNoteText})}).then(()=>{
                const element = event.target.closest('li')
                element.querySelector('.title').textContent = newNoteText
            })
        }
    }
})

