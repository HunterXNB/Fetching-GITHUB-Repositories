"use strict"
let theInput = document.querySelector(".get-repos input[type='text']");
let reposData = document.querySelector(".show-data");
let form = document.querySelector("form")
form.addEventListener("submit", getRepos);

function getRepos(event) {
    event.preventDefault()
    if (theInput.value.trim() == "") {
        reposData.innerHTML = "<span>Please Write Github Username</span>"
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`).then((response) => response.json()).then(response => {
            reposData.innerHTML = ""
            response.forEach(ele => {
                let mainDiv = document.createElement("div")
                let mainText = document.createTextNode(`${ele.name}`)
                let paragraph = document.createElement("p")
                paragraph.appendChild(mainText)
                mainDiv.appendChild(paragraph)
                let theURL = document.createElement("a")
                let UrlText = document.createTextNode("Visit")
                theURL.appendChild(UrlText)
                theURL.href = `https://github.com/${ele.owner.login}/${ele.name}`
                theURL.target = "_blank"
                mainDiv.appendChild(theURL)
                let starsSpan = document.createElement("span")
                let starsText = document.createTextNode(`${ele.stargazers_count}`)
                starsSpan.appendChild(starsText)
                mainDiv.appendChild(starsSpan)
                mainDiv.className = "repo-box"
                paragraph.title = ele.name
                reposData.appendChild(mainDiv)

            }
            )
            if (reposData.children.length == 0) {
                reposData.innerHTML = "This User Has No Repositories"
            }
        })

    }
}