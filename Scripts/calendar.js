//Configura y crea un calendario js
function createCalendar(jsonEvents){
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialDate: '2020-09-12',
      timeZone: 'local',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectMirror: true,
      select: function(arg) {
        var title = prompt('Event Title:');
        console.log("Datos para crear evento: ");
        console.log(arg);
        if (title) {
          //Crea un evento
          createEvent(calendar, arg, title);
        }
        

        calendar.unselect()
      },
      eventClick: function(info) {
        if (confirm('Are you sure you want to delete this event?')) {
          var eventObj = info.event;
            if (eventObj.id) {
                //Quita el evento del calendario
                var event = calendar.getEventById(eventObj.id);
                event.remove();
                //Quita el evento de la api
                removeEventApi(eventObj.id); 
            }
        }
      },
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: jsonEvents,
      eventDrop: function(event) {
        var arg = event.event;
        updateEvent(arg);
      },
      eventResize: function(event) {
        var arg = event.event;
        updateEvent(arg);
      }
    });
    
    calendar.render();
    calendar.today();
  }


