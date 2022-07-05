window.addEventListener("load", () => {

    //Variables
    let temperaturaGrado = document.getElementById("section_one_column_grado");
    let ciudad = document.getElementById("ciudad");
    let fecha = document.getElementById("fecha")
    let humedad = document.getElementById("humedad")
    let presionAtmosferica = document.getElementById("presionAtmosferica")
    let vientoSpeed = document.getElementById("vientoSpeed")
    let temperaturaMax = document.getElementById("temperaturaMax")
    let temperaturaMin = document.getElementById("temperaturaMin")
    let ciudadURL = `London`

    //Funciones

    //Funcion - fecha
    function fechaContent() {
        setInterval(() => {
            //Variable fecha
            let fecha1 = new Date;
            fecha.innerText = fecha1.toLocaleString()
        }, 1000);
    }

    const getTemperature = (main) => {
        const maxTemp = Math.round(main.temp_max - 273);
        const minTemp = Math.round(main.temp_min - 273);

        return {maxTemp, minTemp};
    }

    //Funcion - proceso del clima

    function clima(data) {
        console.log(data);
        let temperaturaGradoValor = Math.round(data.main.temp - 273);
        temperaturaGrado.innerHTML = `${temperaturaGradoValor} °`

        ciudad.innerText = data.name

        let {humidity, pressure} = data.main
        humedad.innerHTML = `${humidity}%`
        presionAtmosferica.innerHTML = `${pressure} hPa`
        vientoSpeed.innerHTML = `${data.wind.speed} km/h`

        const {maxTemp, minTemp} = getTemperature(data.main);
        temperaturaMax.innerHTML = `${maxTemp}°`
        temperaturaMin.innerHTML = `${minTemp}°`

        const choiceSvg = {
            'Thuderstorm': 'thunder.svg',
            'Drizzle': 'rainy-2.svg',
            'Rain': 'rainy-7.svg',
            'Snow': 'snowy-6.svg',
            'Clear': 'day.svg',
            'Clouds': 'cloudy-day-1.svg',
            'Atmosphere': 'weather.svg'
        }
        const icon = choiceSvg[data.weather[0].main] || 'cloudy-day-1.svg';
        iconoClima.src = `img/animated/${icon}`;

    }

    //Funcion constructora intervalo de la actualizacion del clima

    fechaContent()

    function getClima(posicion) {
        const {longitude, latitude} = posicion;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6752644c4b10d307e40b484055d4f5a5`
        fetch(url)
            .then(response => {return response.json()})
            .then(data => {clima(data)})
            .catch(error => {
                console.log(error)
                console.log("Hola");
            })
    }

    async function getLocationDefault() {
        const request = await fetch("https://ipinfo.io/json?token=90d44b45827c47")
        const jsonResponse = await request.json()
        const loc = jsonResponse.loc.split(',');
        const coords = {
            latitude: loc[0],
            longitude: loc[1]
        };
        getClima(coords);
        return coords;
    }

    function init() {
        navigator.geolocation.getCurrentPosition(posicion => {
            getClima(posicion.coords)
        }, error => {
            getLocationDefault()
        })
    }

    init()

    // Actualizar climna cada 5 minutos
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(posicion => {
            getClima(posicion)
        }, error => {
            getLocationDefault()
        })
    }, 300000);

})