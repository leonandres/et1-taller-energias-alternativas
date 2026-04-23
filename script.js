function calcular() {
    // 1. Capturamos los datos de los inputs
    const watts = parseFloat(document.getElementById('inputWatts').value);
    const hsp = parseFloat(document.getElementById('inputHsp').value);
    const eficiencia = parseFloat(document.getElementById('inputEff').value) / 100;
    
    const resultBox = document.getElementById('resultBox');

    // Validación básica
    if (isNaN(watts) || isNaN(hsp) || watts <= 0 || hsp <= 0 || eficiencia <= 0) {
        resultBox.innerHTML = `<p class="text-red-500 font-bold">Por favor, ingresá valores válidos mayores a cero.</p>`;
        resultBox.classList.remove('hidden');
        return;
    }

    // 2. Cálculo de energía: Potencia x Horas x Eficiencia
    // El resultado es en Wh (Watts hora)
    const energiaWh = watts * hsp * eficiencia;
    
    // Pasamos a kWh (que es como viene en la factura de luz)
    const energiaKwh = (energiaWh / 1000).toFixed(2);
    
    // Un celular promedio necesita unos 15Wh para cargarse de 0 a 100%
    const cargasCelu = Math.floor(energiaWh / 15);

    // 3. Mostramos los resultados con una pequeña animación
    document.getElementById('outKwh').innerText = `${energiaKwh} kWh`;
    document.getElementById('outCarga').innerText = `${cargasCelu} celulares`;
    
    resultBox.classList.remove('hidden');
}