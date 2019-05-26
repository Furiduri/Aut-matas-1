const CssStart = "<b class='text-danger'>";
const CssEnd = "</b>";
//Vue Object
const app = new Vue({
    el: '#app',
    data: {
        errors: null,
        TTotal: 0,
        Ttrue: 0,
        TFalse: 0,
        TIdent: 0,
        TInt: 0,
        TFlooat: 0,
        TAsig: 0,
        TEnd: 0,
        TSum: 0,
        MSG: ""
    }
});

//Se ejecuta cada ves cambia el valor del input txtValor
document.getElementById("txtValor").addEventListener('keyup', function (event) {
    var Valor = this.value.trim();
    Valor = Valor.replace(/\s+/g, ' ');
    if (Valor == null || Valor.length == 0 || /^\s*$/.test(Valor)) {
        app.MSG = "";
        app.errors = null;
    } else {
        Comparar(Valor);
        app.errors = false;
    }
});

//Inico de la comparacion
function Comparar(Valor) {
    //Se setan a 0, los contadores de tokens
    app.MSG = "";
    app.Ttrue = 0;
    app.TFalse = 0;
    app.TIdent = 0;
    app.TInt = 0;
    app.TFlooat = 0;
    app.TAsig = 0;
    app.TEnd = 0;
    app.TSum = 0;

    //Se obtienen los Tokens
    var Tokens = Valor.split(" ");
    //Se guarda el total de Tokens
    app.TTotal = Tokens.length;
    //Se leen los Tokens
    Tokens.forEach(Token => {
        //Fue acceptado el token
        var TokenFlag = true;
        //Si es un string        
        if (isNaN(Token.replace(/[\(\)]/g, ''))) {
            TokenFlag = IsValidVar(Token);
        } else {
            //Si es un numero sin '.' decimal y sin "+" o "-"
            if (/^[0-9]{1,}$/.test(Token.replace(/[\(\)]/g, ''))) {
                app.TInt += 1;
            } else //Si es un numero con '.' decimal y sin "+" o "-"
                if (/^[0-9]{1,}[\.][0-9]{1,}$/.test(Token.replace(/[\(\)]/g, ''))) {
                    app.TFlooat += 1;
                } else //Si es un numero y tiene "+" o "-"
            {
                //Token No Valido
                app.TFalse += 1;
                TokenFlag = false;
            }
        }
        //Va guardando los tokens 
        //y los muestra en rojo, si son invalidos
        if (TokenFlag) {
            app.MSG += Token + " ";
        } else {
            app.MSG += CssStart + Token + CssEnd + " ";
        }
    });
    //Hace la suma de los tokens acceptados 
    //y guarda el numero total
    app.Ttrue = (app.TIdent + app.TInt + app.TFlooat + app.TAsig + app.TEnd + app.TSum);
}

//Comprueba el tipo de token de codena de texto
function IsValidVar(Token) {
    //segun el caso nos muestra que tipo de token es
    switch (Token) {
        //Si es ":=" es un Token de asgnacion
        case ":=":
            app.TAsig += 1;
            return true;
            //Si es ";" es un Token de fin de sentencia
        case ";":
            app.TEnd += 1;
            return true;
            //Si es "+" es un Token de suma
        case "+":
            app.TSum += 1;
            return true;
            //En todos los demas casos se comprueba si es un
            //Identificador valido
        default:
            //Si el primer caracter no es un numero
            if (isNaN(Token.replace(/[\(\)]/g, '').substring(0, 1))) {
                if (/^([\(]?[A-Za-z\-\_0-9]{1,}[\)]?)+$/.test(Token)) {
                    app.TIdent += 1;
                    return true;
                }
            }

            app.TFalse += 1;
            return false;
    }
}