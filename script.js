      var
      formSubmitBtn = document.querySelectorAll('.form-submit'),
      errorMsg = document.querySelectorAll(".phoneNumberError"), // Phone Number err-msg      
      phoneInputField = []  ,
      phoneNumber = [],
      validNumber = '';        
       
      // on Keyup: validate phoneNumber
      document.querySelectorAll('.phoneNumber')
      .forEach((inputField,index)=>{
        phoneInputField.push(inputField);
        inputField.addEventListener('keyup', function() {
          phoneNumber = inputField.value ; 
          if(phoneNumber == ''){
           showError('Please Provide a valid Number' , index);
          }
          else if(!phoneNumber.match(/^[0-9+]+$/)){
            showError('Enter numbers only!' , index);                    
          }
          else if(!(phoneNumber.charAt(0) == 0 || phoneNumber.charAt(0) == '+')){
            showError('PhoneNumber should start from 0 or +' , index);                    
          }
          else if((phoneNumber.charAt(0) == 0) && phoneNumber.length > 1 && ((phoneNumber.slice(0,2) !== '03') && (phoneNumber.slice(0,2) !== '00'))){
            showError('0 should be followed by a 0 or 3' , index);                    
          }
          else if((phoneNumber.slice(0,2) === '00') && phoneNumber.length > 3 && ((phoneNumber.slice(0,4) !== '0092'))){
            showError('00 should be followed by 92' , index);                    
          }
          else if((phoneNumber.charAt(0) == '+') && phoneNumber.length > 2 && (phoneNumber.slice(0,3) !== '+92')){
            showError('+ should be followed by 92' , index);                    
          }
          else if((phoneNumber.slice(0,4) === '0092') && ((phoneNumber.slice(0,5) !== '00923'))){
            showError('0092 Should be followed by 3' , index);                    
          }
          else if((phoneNumber.slice(0,3) === '+92') && ((phoneNumber.slice(0,4) !== '+923'))){
            showError('+92 Should be followed by 3' , index);                    
          }


          else if((phoneNumber.slice(0,2) === '03') && (phoneNumber.length <= 10)){
            showError('Too short!' , index);
          }
          else if((phoneNumber.slice(0,2) === '03') && (phoneNumber.length > 11)){
            showError('Too Long!' , index);
          }

          else if((phoneNumber.slice(0,3) === '+92') && (phoneNumber.length < 13)){
            showError('Too short!' , index);
          }
          else if((phoneNumber.slice(0,3) === '+92') && (phoneNumber.length > 13)){
            showError('Too Long!' , index);
          }

          else if((phoneNumber.slice(0,4) === '0092') && (phoneNumber.length < 14)){
            showError('Too short!' , index);
          }
          else if((phoneNumber.slice(0,4) === '0092') && (phoneNumber.length > 14)){
            showError('Too Long!' , index);
          }          
         
          else{                       
            inputField.style.border = "1px solid black" ;          
            errorMsg[index].innerHTML = 'Nice, Please Proceed farward';
            errorMsg[index].style.color='gray';
            formSubmitBtn[index].disabled = false; // Enable submit_form btn
            formSubmitBtn[index].style.cursor = 'pointer';
            return true ;  
          }
        });

        // Now do something when user left the field
        inputField.addEventListener('blur',()=>{
          phoneNumber = inputField.value ;
          if((phoneNumber.slice(0,2) === '03') && (phoneNumber.length == 11)){
            validNumber = '+92' + phoneNumber.slice(1,11);
            alert(validNumber)            
            return true;
          }
          else if((phoneNumber.slice(0,3) === '+92') && (phoneNumber.length == 13)){
            validNumber = phoneNumber;
            alert(validNumber);
            return true;
          }
          else if((phoneNumber.slice(0,4) === '0092') && (phoneNumber.length == 14)){
            validNumber = '+' + phoneNumber.slice(2,14);            
            alert(validNumber);
            return true;
          }
        })
      })    
      
      function showError(message , index){
        phoneInputField[index].style.border = "1px dotted red" ;      
        errorMsg[index].innerHTML = message;
        errorMsg[index].style.color='red';
        phoneInputField[index].focus();
        formSubmitBtn[index].disabled = true; // Disable submit_from btn
        formSubmitBtn[index].style.cursor = 'not-allowed';

        if((message === 'Enter numbers only!') || (message === 'PhoneNumber should start from 0 or +')){
          phoneInputField[index].value = (phoneInputField[index].value).slice(0,(phoneInputField[index].value.length)-1);
          return false ;
        }
        else if((message === '+ should be followed by 92') || (message === '0 should be followed by a 0 or 3')){
          phoneInputField[index].value = (phoneInputField[index].value).slice(0,1);
          return false ;
        }
        else if((message === '00 should be followed by 92')){
          phoneInputField[index].value = (phoneInputField[index].value).slice(0,2);
          return false ;
        }
        else if((message === '0092 Should be followed by 3')){
          phoneInputField[index].value = (phoneInputField[index].value).slice(0,4);
          return false ;
        }
        else if((message === '+92 Should be followed by 3')){
          phoneInputField[index].value = (phoneInputField[index].value).slice(0,3);
          return false ;
        }
        return false;
      }
