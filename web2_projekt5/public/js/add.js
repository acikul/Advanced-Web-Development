import {
    get,
    set
} from "https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm";

var forma = document.getElementById('forma')

async function sendGeocache(e) {
    e.preventDefault()

    let formData = {
        latitude: e.target.elements.lat.value,
        longitude: e.target.elements.long.value,
        desc: e.target.elements.desc.value
    }

    if (!formData.latitude || !formData.longitude || !formData.desc.trim()) {
        alert('All fields must be filled')
        return false;
    }

    document.getElementById('lat').value = ''
    document.getElementById('long').value = ''
    document.getElementById('desc').value = ''

    await fetch("/geocaches", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }).then((res) => {
        if (res.ok && !res.url.includes("offline")) {
            alert('Successfully uploaded')
        } else {
            throw new Error("error uploading new geocache!")
        }
    }).catch(err => {
        alert('Temporary hiccup while uploading, it will be sent in the background.')
        
        let ts = new Date().toISOString();
        let id = ts + formData.desc.replace(/\s/g, '_');
        set(id, {
                    id,
                    lat: formData.latitude, 
                    long: formData.longitude, 
                    desc: formData.desc
                }
        )

        console.log("starting sync...")

        navigator.serviceWorker.getRegistrations().then(function ([reg]) {
            reg.sync.register('sync-geocaches');
        })
    })
}

forma.addEventListener("submit", sendGeocache)

// TODO - napraviti formu sa koordinatama i descriptionom, 
//        hendlat sync u sw.js i backendu,
//        gumb i hendlanje pusha