
export async function register(url, email, password) {
    return fetch("/api/" + url, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "content_type": "application/json",
        },
        body: JSON.stringify({[email]: password})
    }).then(res => res.json()).then(data => {return(data['res'])})

}