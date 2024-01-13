function convert() {
            var inputTemp = document.getElementById("inputTemp").value;
            var inputUnit = document.getElementById("inputUnit").value;
            var resultElement = document.getElementById("result");

            if (inputUnit === "celsius") {
                var fahrenheit = (inputTemp * 9/5) + 32;
                resultElement.textContent = inputTemp + "°C is " + fahrenheit + "°F";
            } else {
                var celsius = (inputTemp - 32) * 5/9;
                resultElement.textContent = inputTemp + "°F is " + celsius + "°C";
            }
        }
   