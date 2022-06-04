export async function checkLoginState() {
    const res = await fetch('/api/login')
    const json = await res.json()
    return Object.values(json)
}

export function alarmAPI(state, time) {
    fetch("api/result", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content_type": "application/json",
            },
            body: JSON.stringify({'time': [state, time]})
        }
    )
}

export async function checkLogin(email, password) {
    await fetch("/api/login", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content_type": "application/json",
            },
            body: JSON.stringify({[email]: password})
        }
    )
}

export async function register(email, password) {
    await fetch("/api/register", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content_type": "application/json",
            },
            body: JSON.stringify({[email]: password})
        }
    )
}

export async function rooms_getter() {
    const rooms = {};
    await fetch('http://localhost:5000/rooms').then(res => res.json()).then(data => {
        const dataa = Object.values(data)[0];
        for (let i = 0; i < Object.values(dataa).length; i++) {
            rooms[Object.keys(dataa)[i]] = Object.values(dataa)[i]
        }
    })
    return rooms
}

export async function sendToApi(JSONOb) {
    await fetch("/api/result", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content_type": "application/json",
            },
            body: JSON.stringify({'colors': JSONOb})
        }
    )
}