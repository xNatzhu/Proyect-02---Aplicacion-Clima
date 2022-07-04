

window.addEventListener("load",()=>{

  //Variables

    let longitud 
    let latitud 
    let temperaturaGrado = document.getElementById("section_one_column_grado");
    let ciudad =  document.getElementById("ciudad");
    let fecha = document.getElementById ("fecha")
    let humedad = document.getElementById ("humedad")
    let presionAtmosferica = document.getElementById ("presionAtmosferica")
    let vientoSpeed = document.getElementById ("vientoSpeed")
    let temperaturaMax = document.getElementById ("temperaturaMax")
    let temperaturaMin = document.getElementById ("temperaturaMin")


    
    //Funciones

    //Funcion - fecha

    function fechaContent() {
        setInterval(() => {

            //Variable fecha

            let fecha1 = new Date; 
            fecha.innerText = fecha1.toLocaleString()

        }, 1000);
    }

 
    //Funcion - proceso del clima

    function clima(data){
      setInterval(() => {

        let temperaturaGradoValor = Math.round(data.main.temp - 273);
        temperaturaGrado.innerHTML = `${temperaturaGradoValor} °` 

        let ciudadValor = data.name
        ciudad.innerText = ciudadValor


        let humedadValor = data.main.humidity

        humedad.innerHTML = `${humedadValor}%`

        presionAtmosfericaValor = data.main.pressure

        presionAtmosferica.innerHTML = `${presionAtmosfericaValor} hPa`

        vientoSpeedValor = data.wind.speed
        
        vientoSpeed.innerHTML = `${vientoSpeedValor} km/h`
        

        temperaturaMaxValor = Math.round(data.main.temp_max - 273);

        temperaturaMax.innerHTML = `${temperaturaMaxValor}°`
        
        temperaturaMinValor = Math.round(data.main.temp_min - 273);

        temperaturaMin.innerHTML = `${temperaturaMinValor}°`

        switch (data.weather[0].main) {
            case 'Thunderstorm':
              iconoClima.src='img/animated/thunder.svg'
              console.log('TORMENTA');
              break;
            case 'Drizzle':
              iconoClima.src='img/animated/rainy-2.svg'
              console.log('LLOVIZNA');
              break;
            case 'Rain':
              iconoClima.src='img/animated/rainy-7.svg'
              console.log('LLUVIA');
              break;
            case 'Snow':
              iconoClima.src='img/animated/snowy-6.svg'
                console.log('NIEVE');
              break;                        
            case 'Clear':
                iconoClima.src='img/animated/day.svg'
                console.log('LIMPIO');
              break;
            case 'Atmosphere':
              iconoClima.src='img/animated/weather.svg'
                console.log('ATMOSFERA');
                break;  
            case 'Clouds':
                iconoClima.src='img/animated/cloudy-day-1.svg'
                console.log('NUBES');
                break;  
            default:
              iconoClima.src='img/animated/cloudy-day-1.svg'
              console.log('por defecto');
            }

        }, 5000);

    }


    fechaContent()


    //Condicional - ubicacion desde el navegador

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(posicion => {
            console.log("Hola mundo")
           
            longitud = posicion.coords.longitude
            latitud = posicion.coords.latitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=6752644c4b10d307e40b484055d4f5a5`


            fetch(url)
                
                .then(response=>{return response.json()})
                .then(data =>{
                    console.log(data)
                    console.log(data.weather);
                    clima(data)
                })
                .catch(error=> {
                    console.log(error)
                    console.log("Hola");
                })

        })
    }



})