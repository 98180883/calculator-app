const display = document.getElementById("display")


let calculated = false;
  
let fNumber ="";
let sNumber ="";
let operator ="";

//number or .
function append(num){
    if(calculated && operator===""){
        fNumber="";
        calculated=false;
    }
    if(operator===""){
        if(num ==="." && fNumber.includes(".")) {return};
         
        fNumber+=num;
        display.value = fNumber;
    }
    else{
         if(num ==="." && sNumber.includes(".")) {return};
        sNumber=sNumber+num;
             display.value = fNumber + operator + sNumber;   
    }
}

//operator
function chooseoperator(op){
    if(fNumber==="" || fNumber===".") return;
    calculated=false;
   if(operator!=="")
    {
        calculate();
        return;
    } 
    operator = op;
   display.value = fNumber + operator;
 
}



//square root
function sqroot(){
    if(sNumber !== ''){
        const value = Number(sNumber);
        if(value < 0){
            display.value ="Error"
            clearAll();
            return;
          
            
        }
        sNumber=  formatResult(Math.sqrt(value)).toString();
        display.value = fNumber+operator+sNumber
    }
     else if(fNumber !== ''){
        const value = Number(fNumber);
        if(value < 0){
            display.value ="Error"
            clearAll();
            return;
        }
        fNumber=  formatResult(Math.sqrt(value)).toString();
        display.value = fNumber;
        calculated = true;
    }
}

//function square 
function sq(){
    if(fNumber==='.' || sNumber==='.') return;

    if(sNumber!==''){
        const value=Number(sNumber)
        sNumber = (value*value).toString()
        display.value = fNumber + operator + sNumber
    }
 else if(fNumber!==''){
const value = Number(fNumber)
fNumber =(value*value).toString();
display.value = fNumber 
}
calculated = true;
}

//calculate function 

function calculate(){
    //if(sNumber==="") return;
    let result;
    
    if(operator==='/' && Number(sNumber)===0){
        display.value="error"
        clearAll();
        return;
    }

    const num1 = Number(fNumber);
    const num2 = Number(sNumber)

     if(operator==='+'){
       result= num1+num2;
     }
      else if(operator==='-'){
       result= num1-num2;
     }
      else if(operator==='*'){
       result= num1*num2;
     }
 else if(operator==='/'){
       result= num1 / num2;
     }
     else if(operator==='%'){
        if(sNumber===''){
       result =num1 / 100
        }
      else {
        result = num1 * (num2/100)
    }
     }
     else return;
     
display.value = formatResult(result);
localStorage.setItem("lastresult", result);
fNumber=result.toString();
sNumber="";
operator="";

calculated = true;
}

//clearall(AC)
function clearAll(){
    fNumber="";
    sNumber="";
    operator="";
   display.value="0";
}

//removing last element 
function backSpace(){
    if(sNumber!==""){
        sNumber=sNumber.slice(0,-1);
        display.value=fNumber + operator +sNumber;
    }
    else if(operator!==""){
        operator="";
        display.value=fNumber || "0";
    }
    else{
        fNumber = fNumber.slice(0,-1);
        display.value = fNumber || "0";
    }
}

//saving last result localStorage
function save(){
       const lastresult =localStorage.getItem("lastresult")
       if(lastresult===null) return 
       display.value=formatResult(Number(lastresult));
 
      
}


//keyboard support 
document.addEventListener("keydown",
    function(event){
        

 //numbers       
if ((event.key >= "0"  && event.key <= "9" ) || event.key === "."){
      event.preventDefault();
         append(event.key)
         return;

}

//operators
if(['+','-','*','/','%'].includes(event.key)){
      event.preventDefault();
    chooseoperator(event.key)
    return;
}


//Enter
        if((event.key) === "Enter"){
            event.preventDefault();
            if(operator!==""){
            calculate();
            return;
        }
    }

 //Backspace   

else if((event.key)==="Backspace"){
      event.preventDefault();
 backSpace();
 return;
}
})

//result formatting 
function formatResult(value) {
    if (value.toString().length > 10) {
        return Number(value).toPrecision(7);
    }
    return value;
}
