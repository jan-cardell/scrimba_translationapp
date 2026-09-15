const translateBtn = document.getElementById('translate-btn')
translateBtn.addEventListener('click', translate)


async function translate(e){
    e.preventDefault()
    const inputText = document.getElementById('ftext') 
    console.log(inputText.value)

    try {
        const response = await fetch('api/translation', {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ inputText })    
    })

    const data = response.json()
    } catch(error) {
        console.log(error)
    }  
}