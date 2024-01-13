let string = "";

let buttons = document.querySelectorAll('.buttons');

Array.from(buttons).forEach((buttons) => {
    buttons.addEventListener('click', (e) => {
        
        if(e.target.innerHTML == '='){
            string = eval(string);
            document.getElementById('display').value = string;
        }
        else if(e.target.innerHTML == 'C'){
            string = "";
            document.getElementById('display').value = string;
        }
        else if(e.target.innerHTML == 'Del'){
            string = string.slice(0,-1);
            document.getElementById('display').value = string;
        }
        else if(e.target.innerHTML == '%'){
            string = (eval(string) / 100);
            document.getElementById("display").value = string;
        }
        else if(e.target.innerHTML == 'x²'){
            string = Math.pow(eval(string), 2);
            document.getElementById("display").value = string;
        }
        else{
            string = string + e.target.innerHTML;
            document.getElementById('display').value = string;
        }
    })
})
