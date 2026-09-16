const translateBtn = document.getElementById('translate-btn')
const selectLanguage = document.getElementById('select-language')
const outputDiv = document.getElementById('output-div')
const outputText = document.getElementById('output-text')
translateBtn.addEventListener('click', translate)
const inputText = document.getElementById('ftext')


async function translate(e){
    e.preventDefault()
    
    selectLanguage.style.display = 'none'
    outputDiv.style.display = 'flex'
    const inputTextValue = inputText.value

    try {
        const response = await fetch('http://localhost:3001/api/translation', {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userPromt: inputTextValue })   
    })

    const data = await response.json()
    outputText.innerText = data.translation

    } catch(error) {
        console.log(error)
    }  
}