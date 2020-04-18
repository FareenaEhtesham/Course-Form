
'use strict';


(function(){
    // check fields and hide the submit button
    document.addEventListener('DOMContentLoaded', function(){
        const display1 = new Display();
        display1.Checking();
        display1.hideSubmit();
    });

document.getElementById("customer-form").addEventListener("submit" , function(e){

    e.preventDefault();
    const name = this.querySelector(".name");
    const course = this.querySelector(".course");
    const author = this.querySelector(".author");

    const customer1 =new Customer(name.value , course.value , author.value)
    const display1 = new Display();

    display1.Feedback(customer1);
    display1.ClearAll();
});

//Display is the constructor function
function Display(){
    
    this.name = document.querySelector("#name")
    this.course = document.querySelector("#course")
    this.author = document.querySelector("#author")
    this.newCustomer = document.querySelector(".customer-list")

};

//making Display Class function

Display.prototype.Checking = function(){

    this.name.addEventListener('blur' , this.Validation)
    this.course.addEventListener('blur' , this.Validation)
    this.author.addEventListener('blur' , this.Validation)
 

};

Display.prototype.Validation = function(){

    if(this.value === ''){
        this.classList.remove("complete");
        this.classList.add("fail");
    }

    else{
        this.classList.remove("fail");
        this.classList.add("complete");
    }

    const All_Fields_Complete = document.querySelectorAll(".complete");

    if(All_Fields_Complete.length === 3){

        document.querySelector(".submitBtn").disabled = false;

    }

    else{
        document.querySelector(".submitBtn").disabled = true;
    }

};


Display.prototype.hideSubmit = function(){

    const submit_btn= document.querySelector(".submitBtn")
    submit_btn.disabled =true
};

Display.prototype.Feedback= function(customer1){

    
    const feedback= document.querySelector(".feedback")
    const loading = document.querySelector(".loading")
    const here = document.querySelector("#practice")
  
    feedback.classList.add("showItem" ,"alert" , "alert-success")
    loading.classList.add("showItem")
    here.classList.add("loading")

    const a =this;
    a.hideSubmit();
    
    //After 3 sec 
    setTimeout(function(){

        feedback.classList.remove("showItem" ,"alert" , "alert-success")
        loading.classList.remove("showItem");
        
        a.addCustomer(customer1);

    }, 3000)


};


Display.prototype.addCustomer = function(customer1){

    const random = this.getRandom();
    

    const div = document.createElement('div');
     div.classList.add('col-11', 'mx-auto', 'col-md-6', 'my-3', 'col-lg-4');
     div.innerHTML = `<div class="card text-left">
     <center>

     <img width="90%" src="./image/web${random}.jpg" class="card-img-top" alt="">
   
     <img width="30%" src="./rating/rating${random}.jpg"  alt="">
     
     </center>
     
     <div class="card-body">
      <!-- customer name -->
      <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name">${customer1.name}</span></h6>
      <!-- end of customer name -->
      <!-- customer name -->
      <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
        ${customer1.course}
       </span></h6>
      <!-- end of customer name -->
      <!-- customer name -->
      <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span id="course-author">${customer1.author}</span></h6>
      <!-- end of customer name -->
     </div>
    </div>`
    this.newCustomer.appendChild(div);
};

Display.prototype.getRandom = function(){
    let random = Math.floor(Math.random()*5+1);
    return random;
};



Display.prototype.ClearAll =function(){

        this.name.value = "";
        this.author.value="";
        this.course.value="";

        this.name.classList.remove("complete" , "fail");
        this.author.classList.remove("complete" , "fail");
        this.course.classList.remove("complete" , "fail");
};



function Customer(name ,course ,author){
    this.name =name ;
    this.course = course;
    this.author = author;

}

})()