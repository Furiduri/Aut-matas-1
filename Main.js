//Vue Object
const app = new Vue({
    el: '#app',
    data: {
        errors: null,
        name: null,
        age: null,
        movie: null,
        Title: "",
        MSG: ""
    }
});

document.getElementById("txtValor").addEventListener('keyup', function(event) {
    var Valor = document.getElementById("txtValor").value;

    console.log('Bloq Mayus está activado.' + Valor); //que será verdadero cuando presiones Bloq Mayus
    fnStart(Valor);
});

//Inico de la comparacion
function fnStart(Valor) {
    if (!Valor) {    	
        app.Title = "Notificación!";
        app.MSG = "Favor de llenar el campo";
        app.errors  = true;
    }else{
    fnC1(Valor);     
    app.Title = "Correcto";
    
    
    }
}

//Estado C0
function fnC1(Valor){
	
	switch(Valor){
		case Valor:
		if(Valor)
		app.MSG = "Identtificador"+Valor;
		else
		app.MSG = "Digito"+Valor;
		
		Valor = Valor.substr(0);
		app.errors =  true;
		break;
		default:
		app.MSG = "Error";
		app.errors =  false;
	}
}