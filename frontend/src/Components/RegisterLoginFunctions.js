export async function register(email, password) {
    return fetch("/api/register", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "content_type": "application/json",
        },
        body: JSON.stringify({[email]: password})
    }).then(res => res.json()).then(data => {return(data['res'])})

}