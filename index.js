const translateBtn = document.getElementById('translate-btn')
const selectLanguage = document.getElementById('select-language')
const outputText = document.getElementById('output-text')
translateBtn.addEventListener('click', translate)


async function translate(e){
    e.preventDefault()
    const inputText = document.getElementById('ftext') 
    
    selectLanguage.style.display = 'none'
    outputText.style.display = 'flex'

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