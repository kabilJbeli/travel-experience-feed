var pass = document.getElementById('password');
var login = document.getElementById('login');
var msg=[];
var msgEL = document.querySelector(".msg");
var formContainer = document.querySelector(".form-container");
var body = document.querySelector("body");
var container = document.querySelector(".container");
var mainAppContainer = document.querySelector(".main-app-container");
var title = document.querySelector("#title");
var budget = document.querySelector("#budget");
var description = document.querySelector("#description");
var file = document.querySelector("#file");
var modalMsg = document.querySelector("#modalMsg");
mainAppContainer.style="display:none;";
var feed = document.querySelector(".feed");
var publications = [
    {
        id:1,
        title:"Lorem ipsum dolor sit amet",
        userImage:"img/linnmeyersheadshot.jpg",
        budget:1500,
        liked:true,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id lacus at lacus volutpat porta. Nunc pellentesque velit non facilisis fermentum. Proin porttitor nisi et leo vestibulum, a feugiat odio accumsan. Integer volutpat sed elit vitae maximus.",
        images:['img/IMG_1221-768x576.jpg']
    },
    {
        id:2,
        title:"Lorem ipsum dolor sit amet",
        userImage:"img/Max-R_Headshot.jpg",
        budget:500,
        liked:false,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id lacus at lacus volutpat porta. Nunc pellentesque velit non facilisis fermentum. Proin porttitor nisi et leo vestibulum, a feugiat odio accumsan. Integer volutpat sed elit vitae maximus.",
        images:['img/IMG_6439-1024x682.jpg']
    },
    {
        id:3,
        title:"Lorem ipsum dolor sit amet",
        userImage:"img/P1090594-1.jpeg",
        budget:1000,
        liked:true,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id lacus at lacus volutpat porta. Nunc pellentesque velit non facilisis fermentum. Proin porttitor nisi et leo vestibulum, a feugiat odio accumsan. Integer volutpat sed elit vitae maximus.",
        images:['img/IMG_6556-768x512.jpg']
    },
    {
        id:4,
        title:"Lorem ipsum dolor sit amet",
        userImage:"img/Jason_Ulaszek_2017_340_340_s_c1_center.png",
        budget:2500,
        liked:false,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id lacus at lacus volutpat porta. Nunc pellentesque velit non facilisis fermentum. Proin porttitor nisi et leo vestibulum, a feugiat odio accumsan. Integer volutpat sed elit vitae maximus.",
        images:['img/IMG_9981-1024x682.jpg']
    }
]

if(!localStorage.getItem("publication") !== false){
    localStorage.setItem("publication",JSON.stringify(publications))
}else{
  publications =  JSON.parse(localStorage.getItem("publication"));
}

function addPublicationItem(e){
    e.preventDefault();
    if(title.value !=="" && description.value != "" && budget.value != "" && file.value !=""){
       let id=  Math.max.apply(Math, publications.map(function(o) { return o.id; }));
        var item = new Object();
        item.id = id+1;
        item.title=title.value;
        item.description=description.value;
        item.userImage="img/userImage.png";
        item.budget=budget.value;
        var tmppath = URL.createObjectURL(file.files[0]);
        item.images=[tmppath];
        item.liked=false;
        publications.unshift(item);
        localStorage.setItem("publication",JSON.stringify(publications))
        displayPublications();
        $('#ModalLoginForm').modal('hide');
        title.value="";
        description.value="";;
        budget.value="";
        file.value="";
    }else{
        if(title.value =="") {
            title.style="border:1px solid red;";
        }else{
            title.style="border:1px solid green;";
        }
        if(description.value == " ") {
            description.style="border:1px solid red;";
        }else{
            description.style="border:1px solid green;";
        }
        if(budget.value == "") {
            budget.style="border:1px solid red;";
        }else{
            budget.style="border:1px solid green;";
        }
        if(file.value =="") {
            file.style="border:1px solid red;";
        }else{
            file.style="border:1px solid green;";
        }
            msg =[];
msg.push("There's an empty field");
modalMsg.innerHTML= msg.toString();
    }
    var ct = document.querySelector(".w-mind");
ct.value="";
}
if(localStorage.getItem("logedin") == "true"){
    formContainer.style="display:none;";
    body.setAttribute("class","dashboard-body");
    container.setAttribute("class","container-fluid");
    mainAppContainer.style="display:block;";
    feed.innerHTML='';
    displayPublications();
}
function signout(e){
    localStorage.setItem('login','');
    localStorage.setItem('password','');
    localStorage.setItem('logedin','false');
    container.setAttribute("class","container container-wrapper");
    body.setAttribute("class","");
    formContainer.style="display:flex;";
    mainAppContainer.style="display:none;";

}
function signin(e)
{e.preventDefault();
    if (login.value == "root") {
        login.style="border:1px solid green;";
        if(pass.value == "root"){
            pass.style="border:1px solid green;";
            msg=[];
            msgEL.innerHTML = msg.toString();
            formContainer.style="display:none;";
            body.setAttribute("class","dashboard-body");
            localStorage.setItem('login','root');
            localStorage.setItem('password','root');
            localStorage.setItem('logedin','true');
            container.setAttribute("class","container-fluid");
            mainAppContainer.style="display:block;";
            feed.innerHTML='';
            displayPublications();
        }else{
            msg=[];
            msg.push("Wrong password");
            pass.style="border:1px solid red;";
            msgEL.innerHTML = msg.toString();
        }
    } else {
        msg=[];
        pass.style="border:1px solid red;";
        login.style="border:1px solid red;";
        msg.push("Wrong password or login");
        msgEL.innerHTML = msg.toString();
    }
}

function displayPublications(){
    feed.innerHTML='';
    publications.map((item,index) => {
        let wrapper = document.createElement("div");
        let feedItem = document.createElement("div");
        feedItem.classList="publicationItem";
        let description = document.createElement("p");
        description.innerText= item.description;
        let title = document.createElement("h2");
        title.innerText=item.title;
        let heart = document.createElement("i");
        heart.classList="fa fa-heart";
        let commentIcon =document.createElement("i");
        commentIcon.classList="fa fa-comment";

        heart.setAttribute("data-item",JSON.stringify(item));
        let removeIcon=document.createElement("i");
        removeIcon.setAttribute("data-item",JSON.stringify(item));
        removeIcon.classList=" removeBtn fa fa-times";
        heart.innerText=" Like";
        heart.setAttribute("aria-hidden","true")
        if(item.liked){
            heart.style="color:red;";
        }
        title.append(heart);
        let images=document.createElement("div");
        images.setAttribute('class','main-image');
        let userWrapper = document.createElement("span");
        let img = document.createElement("img");
        let budgets = document.createElement("span");
        budgets.classList="budget";
        budgets.append(title);
        budgets.append("Total Budget: "+item.budget+"$");
        img.src= item.userImage;
        userWrapper.append(img);
        item.images.map((item)=>{
        let img = document.createElement("img");
        img.src=item;
        images.append(img);
     });
        const actions= document.createElement("div");
        actions.setAttribute("class","actions");
        const actionLike= document.createElement("div");
        actionLike.setAttribute("class","action");

        actionLike.append(heart);
        actions.append(actionLike);
        const comment = document.createElement("div");
        comment.setAttribute("class","action");
        commentIcon.innerText="  Comments";
        comment.append(commentIcon);
        actions.append(comment);
        wrapper.classList="title-wrapper";
        feedItem.append(removeIcon);
        wrapper.append(userWrapper);
        wrapper.append(budgets);
        feedItem.append(wrapper);
        feedItem.append(description);
        feedItem.append(images);
        feedItem.append(actions);
        feed.append(feedItem);
    });
    eventListener();
    eventClickListener();
}
function eventListener(){
var el = document.querySelectorAll(".fa-heart");

for (i = 0; i < el.length; ++i) {
    el[i].addEventListener("click",  (event) => {
      let pub=  JSON.parse(event.target.getAttribute('data-item'));
       publications.map((item,index) => {
           if(item.id == pub.id){
         if(item.liked){
             item.liked=false;
             event.target.style="color:black;";
         }else{
             item.liked=true
             event.target.style="color:red;";
         }
           }
       });
       localStorage.setItem("publication",JSON.stringify(publications));
      }, false);
}}
function eventClickListener() {
    var el = document.querySelectorAll(".addItem");
    var ct = document.querySelector(".w-mind");

    for (i = 0; i < el.length; ++i) {

        el[i].addEventListener("click", (event) => {
            title.value = ct.value;
        }, false);
    }
    const close = document.querySelectorAll(".removeBtn");
    for (i = 0; i < close.length; ++i) {

        close[i].addEventListener("click", (event) => {
            let pub=  JSON.parse(event.target.getAttribute('data-item'));
            publications.splice(pub, 1);
            localStorage.setItem("publication",JSON.stringify(publications));
displayPublications();
        }, false);
    }


}


eventClickListener();