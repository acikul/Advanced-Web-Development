function loadGeocaches() {
    let geos = document.getElementById("geos")
    fetch("/getCaches").then(res => res.json())
      .then(res => {
        res.forEach(geocache => {
          let d = document.createElement("div");
          d.classList.add('geocache');
          d.innerHTML = `(${geocache.latitude}, ${geocache.longitude})`;
          let sub = document.createElement("div");
          sub.innerHTML = `${geocache.desc}`;
          d.appendChild(sub)
          let subd = document.createElement("div");
          let a = document.createElement("a");
          a.innerHTML = 'View on Google Maps'
          a.href = `https://www.google.com/maps/place/${geocache.latitude}+${geocache.longitude}/@${geocache.latitude},${geocache.longitude},15z`
          a.target = '_blank'
          a.rel = 'noreferrer noopener'
          subd.appendChild(a)
          d.appendChild(subd);
          geos.appendChild(d);
        })
      }).catch((error) => {console.log("Error while loading available geocaches: You are offline.")}) 
  }

  window.loadGeocaches = loadGeocaches