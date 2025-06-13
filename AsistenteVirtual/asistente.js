// Variable para almacenar las voces de nuestro sistema.
var voices = [];

// Inicializamos utter.
var utter = new SpeechSynthesisUtterance();
utter.rate = 1;
utter.pitch = 0.5;

// Inicializar annyang
document.addEventListener('DOMContentLoaded', function() {
    if (annyang) {
        // Modificar la configuración del reconocimiento de voz para establecer el idioma en español
        if (annyang.getSpeechRecognizer()) {
            annyang.getSpeechRecognizer().lang = 'es-ES';
        } else {
            console.error('El reconocimiento de voz no está disponible.');
            utter.text = 'Lo siento, el reconocimiento de voz no está disponible en este navegador.';
            window.speechSynthesis.speak(utter);
        }
        // Resto del código que depende de annyang...
    } else {
        console.error('Annyang no está disponible.');
        utter.text = 'Lo siento, el reconocimiento de voz no está disponible en este navegador.';
        window.speechSynthesis.speak(utter);
    }
});

// Cargamos las voces que tenemos en nuestro sistema y las mostramos en un arreglo por consola.
window.speechSynthesis.onvoiceschanged = function () {
    voices = window.speechSynthesis.getVoices();
    console.log(voices);
    if (voices.length > 0) {
        // Default voice for all commands
        utter.voice = voices.find(voice => voice.lang === 'es-ES') || voices[0];
    }
};

var commands = {
    'hola salesiano': function () {
        utter.text = '¡Hola! ¿En qué puedo ayudarte?';
        window.speechSynthesis.speak(utter);
    },
    'director de la uni': function () {
        utter.text = 'Nestor';
        window.speechSynthesis.speak(utter);
    },
    'mascota de la uni': function () {
        utter.text = 'El scott';
        window.speechSynthesis.speak(utter);
        
    },
    'Donde queda la cancha': function () {
        utter.text = 'al fondo oeste ';
        window.speechSynthesis.speak(utter);
    },
    'Donde queda el snak': function () {
        utter.text = 'al oeste, pasando el bloque B ';
        window.speechSynthesis.speak(utter);
    },
    'dinosaurio de la uni': function () {
        utter.text = 'Ernesto guaman gomez';
        window.speechSynthesis.speak(utter);
    },
    'como estas': function () {
        utter.text = 'Estoy bien, ¡gracias por preguntar!';
        window.speechSynthesis.speak(utter);
    },
    'hola': function () {
        utter.text = 'Hola, ¿cómo te llamas?';
        window.speechSynthesis.speak(utter);

        var nombreListener = function (phrases) {
            console.log('Nombre:', phrases[0]);
            utter.text = 'Hola, ' + phrases[0] + ', ¿en qué puedo ayudarte?';
            window.speechSynthesis.speak(utter);
            annyang.removeCallback('result', nombreListener);
        };
    

        annyang.addCallback('result', nombreListener);
    },
    'cuentame un chiste': function () {
        const chistes = [
            '¿Por qué las focas del circo miran siempre hacia arriba? ¡Porque ahí están los focos!',
            '¿Cómo llama Superman a su papá? ¡Padre!',
            '¿Qué hace una abeja en el gimnasio? ¡Zum-ba!',
            '¿Qué le dice una iguana a su hermana gemela? ¡Iguanita!'
        ];
        utter.text = chistes[Math.floor(Math.random() * chistes.length)];
        window.speechSynthesis.speak(utter);
    
        
    },
    'clima actual': function () {
        obtenerClima();
    },
    'hora actual': function () {
        const date = new Date();
        const hora = date.getHours();
        const minutos = date.getMinutes();
        utter.text = 'Son las ' + hora + ' horas y ' + minutos + ' minutos.';
        window.speechSynthesis.speak(utter);
    },
    'adiós salesianito bot': function () {
        utter.text = '¡Adiós! ¡Que tengas un buen día!';
        window.speechSynthesis.speak(utter);
    },
    'abrir Word': function () {
        abrirWord();
    },
    'escribir carta de agradecimiento': function () {
        escribirCartaAgradecimiento();
    },
    'horario noveno semestre': function () {
        const horario = `
            Lunes:
            - 7:30 a 9:00: Ingeniería de Software II con el docente Miranda Chincherro Manuel Max 
            - 9:15 a 10:45: Lenguajes Formales y Compiladores con la docente Delgadillo Camacho Elizabeth 
            - 10:45 a 11:00: Descanso
            - 11:00 a 12:30: Inteligencia Artificial II con el docente Robles Saucedo Diego 

            Martes:
            - 7:30 a 9:00: Ingeniería de Sistemas II con el docente Cuevas Espinoza Evert Limber 
            - 9:15 a 10:45: Inglés III la docente Noya Roldan Patricia Ximenanoya Ximena 
            - 10:45 a 11:00: Descanso

            Miércoles:
            - 7:30 a 9:00: Ingeniería de Software II el docente Miranda Chincherro Manuel Max 
            - 9:15 a 10:45: Lenguajes Formales y Compiladores la docente Delgadillo Camacho Elizabeth 
            - 10:45 a 11:00: Descanso
            - 11:00 a 12:30: Inteligencia Artificial II con el docente Robles Saucedo Diego 

            Jueves:
            - 7:30 a 9:00: Ingeniería de Sistemas II con el docente Cuevas Espinoza Evert Limber 
            - 9:15 a 10:45: Inglés III con la docente Noya Roldan Patricia Ximenanoya Ximena 
            - 10:45 a 11:00: Descanso

            Viernes:
            - No hay clases programadas.
        `;
        
        utter.text = horario;
        window.speechSynthesis.speak(utter);
    }
    
    
};

function abrirWord() {
    console.log('Abriendo Microsoft Word...');
    utter.text = 'Abriendo Microsoft Word...';
    window.speechSynthesis.speak(utter);
}

function escribirCartaAgradecimiento() {
    console.log('Escribiendo carta de agradecimiento en Microsoft Word...');
    utter.text = 'Escribiendo carta de agradecimiento en Microsoft Word...';
    window.speechSynthesis.speak(utter);
}

function obtenerClima() {
    const apiKey = '';
    const ciudad = 'Cochabamba,BO';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperatura = (data.main.temp - 273.15).toFixed(1); // Convertir de Kelvin a Celsius
            const descripcion = data.weather[0].description;
            const respuesta = `La temperatura actual en ${ciudad} es de ${temperatura} grados Celsius. El clima está ${descripcion}.`;
            utter.text = respuesta;
            window.speechSynthesis.speak(utter);
        })
        .catch(error => {
            console.log('Error al obtener el clima:', error);
            utter.text = 'Lo siento, no pude obtener la información del clima en este momento.';
            window.speechSynthesis.speak(utter);
        });
}

/// Cuando el asistente de voz comienza a hablar
function handleSpeech() {
    // Quitar clase de animación de las líneas de la boca
    document.querySelector('.linha-h1').classList.remove('voice-animation');
    document.querySelector('.linha-h2').classList.remove('voice-animation');
}

// Cuando el asistente de voz haya terminado de hablar
function handleSpeechEnd() {
    // Agregar clase de animación a las líneas de la boca
    document.querySelector('.linha-h1').classList.add('voice-animation');
    document.querySelector('.linha-h2').classList.add('voice-animation');
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('speakButton');
    let isActive = false;

    button.addEventListener('click', () => {
        isActive = !isActive;
        if (isActive) {
            button.classList.add('active');
            button.classList.remove('inactive');
            button.textContent = 'Botón activo';
            annyang.start({ autoRestart: true, continuous: false });
        } else {
            button.classList.add('inactive');
            button.classList.remove('active');
            button.textContent = 'Botón inactivo';
            annyang.abort();
        }
    });

    // Inicializar el estado del botón
    button.classList.add('inactive');

    // Inicializar annyang
    if (annyang) {
        annyang.debug(true);
        annyang.addCommands(commands);
        annyang.addCallback('error', function (err) {
            console.error('Error en annyang:', err);
            utter.text = 'Lo siento, ocurrió un error en el reconocimiento de voz.';
            window.speechSynthesis.speak(utter);
        });

        // Para depuración, agregar un callback para cuando un comando sea reconocido
        annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
            console.log('Comando reconocido:', commandText);
        });

        annyang.addCallback('resultNoMatch', function (phrases) {
            console.log('No se reconoció ningún comando:', phrases);
        });

        // Agregar los callbacks para cuando el asistente de voz empiece y termine de hablar
        annyang.addCallback('start', handleSpeech);
        annyang.addCallback('end', handleSpeechEnd);
    } else {
        console.error('Annyang no está disponible.');
        utter.text = 'Lo siento, el reconocimiento de voz no está disponible en este navegador.';
        window.speechSynthesis.speak(utter);
    }
});
