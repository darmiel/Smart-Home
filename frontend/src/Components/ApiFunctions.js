export function alarmAPI(state, time) {
    let token = localStorage.getItem('token')
    fetch("api/result", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content_type": "application/json",
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({'time': [state, time]})
        }
    ).then(res => console.log(res))
}

export async function roomsGetter() {
    const rooms = {};
    let token = localStorage.getItem('token')
    await fetch('api/rooms', {
        method: "GET",
        cache: "no-cache",
        headers: {
            "content_type": "application/json",
            Authorization: 'Bearer ' + token
        },
    }).then(res => res.json()).then(data => {
        const dataa = Object.values(data)[0];
        for (let i = 0; i < Object.values(dataa).length; i++) {
            rooms[Object.keys(dataa)[i]] = Object.values(dataa)[i]
        }
    })
    return rooms
}

export async function sendToApi(JSONOb) {
    let token = localStorage.getItem('token')
    await fetch("/api/result", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content_type": "application/json",
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({'colors': JSONOb})
        }
    )
}

export async function tileNameGetter() {
    let token = localStorage.getItem('token')
    const TileNames = [];
    const res = await fetch('api/tiles', {
        method: "GET",
        cache: "no-cache",
        headers: {
            "content_type": "application/json",
            Authorization: 'Bearer ' + token
        },

    })
    const json = await res.json()
    for (let i = 0; i < Object.values(json)[0].length; i++) {
        TileNames.push(Object.values(json)[0][i])
    }
    return TileNames
}
