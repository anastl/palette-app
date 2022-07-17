const seed = document.getElementById('color-picker')
const mode = document.getElementById('palette-type')
const colorsContainer = document.getElementById('colors-container')

document.getElementById('color-form').addEventListener("submit", (e) => {
    e.preventDefault()
    getColor()
})

function getColor() {
    const baseURL = `https://www.thecolorapi.com/scheme?hex=${seed.value.substring(1)}&mode=${mode.value}`
    fetch(baseURL)
        .then(res => res.json())
        .then(data => {
            const colorsHex = new Array
            const colorsArray = data.colors
            colorsArray.map(color => {
                colorsHex.push(color.hex.value)
            })
            let colorHtml = ''
            for (const [index, color] of colorsHex.entries()) {
                colorHtml += `
                    <div class="color-container">
                        <div class="color-expo" id='color-expo-${index}' style="background-color:${color}"></div>
                        <p class="color-hex" id='color-name-${index}'>${color}</p>
                    </div>
                `
            }
            colorsContainer.innerHTML = colorHtml
            const colorDivs = document.getElementsByClassName('color-container')
            for (const div of colorDivs){
                const preHex = div.innerHTML.indexOf('#')
                div.addEventListener("click", () => {
                    navigator.clipboard.writeText(div.innerHTML.slice(preHex+1, preHex+7))
                    .then(function() {
                        alert("Hex code copied! 🤩")
                    })
                })
            }
        })
            // colorDivs.map( div => div.addEventListener("click", () => {
            //     navigator.permissions.query({name: "clipboard-write"}).then(result => {
            //       if (result.state == "granted" || result.state == "prompt") {
            //         console.log(div.innerHTML)
            //       }
            //     })
            // }))
}



getColor()

// navigator.permissions.query({name: "clipboard-write"}).then(result => {
//   if (result.state == "granted" || result.state == "prompt") {
//     /* write to the clipboard now */
//   }
// })