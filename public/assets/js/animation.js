
(function() {
    // INITIALIZATION OF HEADER
    // =======================================================
    new HSHeader('#header').init()


    // INITIALIZATION OF MEGA MENU
    // =======================================================
    new HSMegaMenu('.js-mega-menu', {
        desktop: {
            position: 'left'
        }
    })


    // INITIALIZATION OF SHOW ANIMATIONS
    // =======================================================
    new HSShowAnimation('.js-animation-link')


    // INITIALIZATION OF BOOTSTRAP VALIDATION
    // =======================================================
    HSBsValidation.init('.js-validate', {
        onSubmit: data => {
            data.event.preventDefault()
            alert('Submited')
        }
    })


    // INITIALIZATION OF GO TO
    // =======================================================
    new HSGoTo('.js-go-to')


    // INITIALIZATION OF AOS
    // =======================================================
    AOS.init({
        duration: 650,
        once: true
    });
    const leaflet = HSCore.components.HSLeaflet.init(document.getElementById('map'))
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            id: 'mapbox/light-v9'
        }).addTo(leaflet)
})()
