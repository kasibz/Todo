let noLogoutBtn = document.getElementById('no-logout')

// note that of course I can't use jinja but I also don't use the path of my project
// its the route given by the decorator


try {
    noLogoutBtn.addEventListener('click', (event) => {
        event.preventDefault()
        window.location.href = "/"
    })
} catch {
    console.log("no logout button here")
}