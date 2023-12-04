try {
    let loginForm = document.getElementById('login')
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault()
        // console.log(event.target.username.value)
        // console.log(event.target.password.value)
    })
} catch {
    console.log("Not on login page")
}

try {
    let logoutForm = document.getElementById('logout')
    logoutForm.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log(event.target.username.value)
        console.log(event.target.password.value)
    })
} catch {
    console.log("Not on logout page")
}

try {
    let signupForm = document.getElementById('signup')
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log(event.target.username.value)
        console.log(event.target.password.value)
    })    
} catch {
    console.log("Not on signup")
}

