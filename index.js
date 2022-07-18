const seed = document.getElementById('color-picker')
const mode = document.getElementById('palette-type')
const colorsContainer = document.getElementById('colors-container')

document.getElementById('color-form').addEventListener("submit", (e) => {
    e.preventDefault()
    getPalette()
})

async function getPalette(){
    try {

        const colorsArray = await getColorsArray(seed.value.substring(1), mode.value)
        const colorsHtml = colorsArray.map( colorObj => {
            return getColorHtml(colorObj.hex.clean)
        }).join('')
        colorsContainer.innerHTML = colorsHtml

        const colorsAndContainers = Array.from(document.getElementsByClassName('clickable'))
        colorsAndContainers.map( div => {
            div.addEventListener('click', (e) => {
                const colorHash = '#' + e.target.classList[1]
                navigator.clipboard.writeText(colorHash)
            })
        })

    } catch (e) {
        console.log(e)
    }
}

async function getColorsArray(color, mode) {
    const response = await fetch (`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
    const data = await response.json()
    return data.colors
}

function getColorHtml(color) {
    return `
    <div class='clickable color-container'>
        <div class='color-expo ${color}' style='background-color:#${color}'></div>
        <p class='color-hex ${color}' >#${color}</p>
    </div>`
}

getPalette()