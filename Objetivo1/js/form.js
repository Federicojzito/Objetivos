
//Variables
var inputs = document.getElementsByClassName('form__input');

/* For Range if it has at least 1 character it is fixed*/

for(var i =0; i < inputs.length; i++){
    /*KeyUp- stop pressing key */
    inputs[i].addEventListener('keyup',function(){
        if(this.value.length >= 1){
            this.nextElementSibling.classList.add('select');
        }else{
            this.nextElementSibling.classList.remove('select');
        }
    });
}