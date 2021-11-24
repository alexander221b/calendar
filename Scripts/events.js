const urlEvents = 'https://calendarrest.azurewebsites.net/api/eventos/';

//Trae la data del servicio rest
function requestEvents(){
        fetch(urlEvents, {
          method: "GET",
          headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then(response => response.json())  
        .then(data => {
        	     //Si hay respuesta pasa la data  
        	     //crea los eventos en el calendario
                 loadEvents(data);
              }

        )
        .catch(err => err);
}

//Crea un objeto Json con los eventos de la base de datos
function loadEvents(data){
	var jsonEvents = [];
    for (let event of data) {
    	var feed = {
    		    'id': event.id,
    				'title': event.title, 
    				'start': event.start, 
    				'end': event.end,
            'allDay':event.allday
            
    			};
		jsonEvents.push(feed);
    }

    console.log("Eventos cargados de la base de datos:");
    console.log(jsonEvents);

    //Crea el calendario con el objeto json
    createCalendar(jsonEvents);
}   


//Crea un evento en la base de datos y con la respuesta en el calendario usando
// su id de evento proveniente de la base de datos
function createEvent(calendar, arg, title){
    // data to be sent to the POST request
   
    let data = {
      title: title,
      start: arg.start, 
      end: arg.end,
      allday: arg.allDay
     }
     

     console.log(arg.allDay);
     
    fetch(urlEvents, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(data => {
      //crea el evento con el id asignado en base de datos data.id
      calendar.addEvent({
            id: data.id,
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay
          })

    })
    .catch(err => console.log(err));
}


function removeEventApi(id){
   //Remueve el evento de la api
    fetch(urlEvents + id, {
      method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(res => console.log(res));
}

function updateEvent(arg){
    id = arg.id;
    // data to be sent to the POST request
    let data = {
      id:id,
      title:arg.title,
      start: arg.start, 
      end: arg.end,
      allday: arg.allDay
    };
     
     const putMethod = {
       method: 'PUT', // Method itself
       headers: {
        'Content-type': 'application/json' // Indicates the content 
       },
       body: JSON.stringify(data) // We send data in JSON format
      };

      // make the HTTP put request using fetch api
      fetch(urlEvents + id, putMethod)
      .then(response => response.json())
      .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch(err => console.log(err)); // Do something with the error


}




