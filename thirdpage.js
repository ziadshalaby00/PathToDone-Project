const container = document.getElementById("container");
let bigObject = {}

function showInPage()
{
    container.innerHTML = "";
    for(let task in bigObject)
    {
        console.log(bigObject[task])
        if(bigObject[task] !== bigObject.title)
        {
            showTasks(bigObject[task]);        
        }
    }
}


function showTasks(task) {
    let contentTask = document.createElement("div");
    contentTask.className = `${valueOfdoneList(task)}`;
    contentTask.innerHTML =`
            <div>
                <h3 class="textHeader">${task.title}</h3>
                <div class="date">
                    <span class="material-symbols-outlined no-lih">
                        calendar_month
                    </span>
                    <span>${task.date}</span>
                </div>
            </div>
            <div class="buttons">
                <button class="${valueOfdoneColor(task)}">
                    ${valueOfdoneIcon(task)}
                </button>
                <button class="${valueOfStarColor(task)}">
                    <span class="material-symbols-outlined">
                        star_rate
                    </span>
                </button>
            </div>
            <div class="goToList" onclick="tasksPage(${task.IDList})">
            <h5>${task.titleList}</h5>
                <span class="material-symbols-outlined no-lih">
                    arrow_back
                </span>
            </div>`
    container.insertBefore(contentTask, container.firstChild);
}

function valueOfStarColor(task) {
    let doneClassColor = "notStarBTN";
    let notDoneClassColor = "starBTN";
    let doneClassColorSTR;
    if(task.isStar)
    {
        doneClassColorSTR = doneClassColor;
    }
    else
    {
        doneClassColorSTR = notDoneClassColor;
    }
    return doneClassColorSTR;
}



function valueOfdoneIcon(task) {
    let doneIcon = `<span class="material-symbols-outlined">
                        check
                    </span>`;
    let notDoneIcon = `<span class="material-symbols-outlined">
                            check_box_outline_blank
                        </span>`;
    let doneIconeSTR;
    if(task.isDone)
    {
        doneIconeSTR = doneIcon;
    }
    else
    {
        doneIconeSTR = notDoneIcon;
    }
    return doneIconeSTR;
}

function valueOfdoneColor(task) {
    let doneClassColor = "notCheckBTN";
    let notDoneClassColor = "checkBTN";
    let doneClassColorSTR;
    if(task.isDone)
    {
        doneClassColorSTR = doneClassColor;
    }
    else
    {
        doneClassColorSTR = notDoneClassColor;
    }
    return doneClassColorSTR;
}

function valueOfdoneList(task) {
    let doneClassColor = "newListDone";
    let notDoneClassColor = "newList";
    let doneClassColorSTR;
    if(task.isDone)
    {
        doneClassColorSTR = doneClassColor;
    }
    else
    {
        doneClassColorSTR = notDoneClassColor;
    }
    return doneClassColorSTR;
}

function tasksPage(ID) {
    localStorage.setItem("objectSent", ID)
    location.href = "./secondpage.html";
}

const beforTasks = document.getElementById("beforTasks");

window.addEventListener("load", function(){
    bigObject = JSON.parse(localStorage.getItem("objectForThirdPage"));

    let header = document.getElementById("header");
    switch(bigObject.title) {
        case `<h2>المهام المنجزة</h2>` : header.className += " headerDone"; break;
        case `<h2>المهام المميزة</h2>` : header.className += " headerStar"; break;
        default : 
    }
    

    beforTasks.innerHTML = bigObject.title;
    showInPage();
})