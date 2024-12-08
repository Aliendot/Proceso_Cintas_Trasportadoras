const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const green_light = document.getElementById('circulo_estado_ED');
const red_light = document.getElementById('circulo_estado_P');
const sensor_1 = document.getElementById('sensor_1');
const sensor_2 = document.getElementById('sensor_2');
const sensor_3 = document.getElementById('sensor_3');
let isRunning = false;
let cajas = [];
let intervalo;
let cronometro;
let tiempo = 0; 

class Caja {
    constructor(tamaño, left, top) {
        this.tamaño = tamaño;
        this.left = left;
        this.top = top;
        this.elemento = document.createElement('div');
    }

    agregarCaja() {
        this.elemento.classList.add('caja');
        this.elemento.style.left = `${this.left}px`;
        this.elemento.style.top = `${this.top}px`;

        if (this.tamaño === 'caja_g') {
            this.elemento.classList.add('caja_g');
        } else {
            this.elemento.classList.add('caja_p');
        }

        document.getElementById('simulation').appendChild(this.elemento);
    }

    iniciarAnimaciones() {
        // Agregar la animación de mover la caja a la derecha
        this.elemento.classList.add('moveX1');
        


        // sensores 
        console.log(this.elemento.classList.contains('caja_g'));
        if(this.elemento.classList.contains('caja_g')){
            setTimeout(() => {
                this.elemento.classList.add('moveY2B');
            }, 9000);
    
            console.log('entro')
            setTimeout(() => {  
                    
                sensor_1.classList.add('sensor_1A');
                setTimeout(() => {sensor_2.classList.add('sensor_2A');}, 500); 
                setTimeout(() => {sensor_3.classList.add('sensor_3A');}, 500);
                
                
            }, 4000);
            setTimeout(()=>{
                sensor_1.classList.remove('sensor_1A');
                sensor_2.classList.remove('sensor_2A');
                sensor_3.classList.remove('sensor_3A');

                sensor_1.classList.add('sensor_1');
                sensor_2.classList.add('sensor_2');
                sensor_3.classList.add('sensor_3');
            }, 8000)
        }
        else if(this.elemento.classList.contains('caja_p')){
            console.log('entro')
            setTimeout(() => {
                this.elemento.classList.add('moveY2A');
            }, 9000);
            setTimeout(() => {  
                setTimeout(() => {sensor_2.classList.add('sensor_2A');}, 500); 
            }, 4000);
            setTimeout(()=>{
                sensor_2.classList.remove('sensor_2A');
                sensor_2.classList.add('sensor_2');
            }, 8000)
        }
        
    }

    eliminarCaja() {
        this.elemento.remove();  // Eliminar el elemento del DOM
    }
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        green_light.classList.remove('circulo_estado_EA');
        green_light.classList.remove('circulo_estado_PD');
        
        sensor_1.classList.remove('sensor_1A');
        sensor_2.classList.remove('sensor_2A');
        sensor_3.classList.remove('sensor_3A');

        green_light.classList.add('circulo_estado_EA');
        red_light.classList.add('circulo_estado_PD');

        sensor_1.classList.add('sensor_1');
        sensor_2.classList.add('sensor_2');
        sensor_3.classList.add('sensor_3');

        isRunning = true;
        processCaja();
        intervalo = setInterval(processCaja, 10000);
        iniciarCronometro(); 
    }
});

resetButton.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalo);
        clearInterval(cronometro);
        tiempo = 0;  
        document.getElementById('timer').textContent = '00:00';
        green_light.classList.remove('circulo_estado_EA');
        red_light.classList.remove('circulo_estado_PD');
        green_light.classList.add('circulo_estado_ED');
        red_light.classList.add('circulo_estado_P');

        cajas.forEach(caja => caja.eliminarCaja());
         
        cajas = [];  // Limpiar el array de cajas
        
    }
});

function processCaja() {
    if (!isRunning) return;

    const isGrande = Math.random() > 0.5;
    const tamaño = isGrande ? 'caja_g' : 'caja_p';
    const left = 50;
    const top = 197;

    const nuevaCaja = new Caja(tamaño, left, top);
    nuevaCaja.agregarCaja();
    nuevaCaja.iniciarAnimaciones(); 

    cajas.push(nuevaCaja);
}

function iniciarCronometro() {
    tiempo = 0;
    cronometro = setInterval(() => {
        if (isRunning) {
            tiempo++;
            const minutos = Math.floor(tiempo / 60);
            const segundos = tiempo % 60;
            if(segundos<10){
            console.log(segundos)
            document.getElementById('timer').textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
            }else{
                clearInterval(cronometro);
                tiempo = 0;  
                document.getElementById('timer').textContent = '00:00';
                iniciarCronometro();
            }
        }
    }, 1000);  
    
}