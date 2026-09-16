const translateBtn = document.getElementById('translate-btn')
const selectLanguage = document.getElementById('select-language')
const outputDiv = document.getElementById('output-div')
const outputText = document.getElementById('output-text')

translateBtn.addEventListener('click', translate)

async function translate(e){
    e.preventDefault()

    const inputLanguage = document.querySelector('input[name="language"]:checked')?.value    
    const inputText = document.getElementById('ftext').value

    selectLanguage.style.display = 'none'
    outputDiv.style.display = 'flex'
    
    try {
        const response = await fetch('http://localhost:3001/api/translation', {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            userPromt: inputText,
            inputLanguage: inputLanguage,
         })   
    })

    const data = await response.json()
    outputText.innerText = data.translation

    } catch(error) {
        console.log(error)
    }  
}