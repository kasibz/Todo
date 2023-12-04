try {
    let loginForm = document.getElementById('login')
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let userObj = {
            "username": event.target.username.value,
            "password": event.target.password.value
        }
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObj)
        })
        .then(res => res.json())
        .then(data => {
            console.log({"Success": data})
        })
        .catch(e => {
            console.error({"Error": JSON.stringify(e)})
        })
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

