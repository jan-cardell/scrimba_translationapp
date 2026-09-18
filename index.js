import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js"
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify/dist/purify.es.mjs"

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


    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let translation = ''

    while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunkText = decoder.decode(value, { stream: true })
        translation += chunkText
        console.log(translation)
        let translationHtml = marked.parse(translation)
        let safetranslation = DOMPurify.sanitize(translationHtml)
        outputText.innerHTML = safetranslation
    }

    } catch(error) {
        console.log(error)
    }  
}