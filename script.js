'use strict';

const DOM = Object.freeze({
    "tasks" : document.getElementById("tasks"), 
    "newTask" : document.getElementById("newTask"),
});

DOM.tasks.addEventListener('submit', e => {e.preventDefault(); createTask(e);})

class TaskWriter{

    constructor(){
        this.num = 0;
        this.template = document.createElement("div");
        this.template.setAttribute("class", "task");
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.classList.add('chk');
        const label = document.createElement("label");
        label.innerText = "I am a task."
        this.template.appendChild(checkbox);
        this.template.appendChild(label);
    }

    addTask(text, checked){
        const newNode = this.template.cloneNode(true);
        newNode.childNodes[0].setAttribute("id", `task${this.num}`);
        newNode.childNodes[0].checked = checked;
        newNode.childNodes[0].onchange = e => updateTask(text, e);
        newNode.childNodes[1].setAttribute("for", `task${this.num}`);
        newNode.childNodes[1].innerText = text
        DOM.tasks.insertBefore(newNode, DOM.newTask);
        this.num++;
    }

    writeTask(tk, done){
        console.log(`Task ${tk} is ${done?'done':'not done'}`)
        tw.addTask(tk, done);
    }

    writeTasks(){
        Object.entries(taskStore).forEach( ([tk, done]) => this.writeTask(tk, done) )
    }

}

const tw = new TaskWriter();
const initialTasks = {
    "Wake up": false,
    "Brush teeth": false,
    "Have breakfast": false,
}

let taskStore = {};

function createTask(e){
    const val = DOM.newTask.value;
    if(val.trim()){
        tw.addTask(val);
        taskStore[val] = false;
        saveTasks();
    }
    DOM.newTask.value = "";
}

function updateTask(task, e){
    taskStore[task] = e.target.checked
    saveTasks();
}

document.body.onload = loadTasks;

function loadTasks(){
    taskStore = JSON.parse(localStorage.getItem("tasks"));
    if(!taskStore || Object.keys(taskStore).length === 0) taskStore = initialTasks;
    tw.writeTasks();
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(taskStore));
}

function clearTasks(){
    Array.from(document.getElementsByClassName("chk"))
        .filter(it => it.checked)
        .forEach(it => {
            it.parentElement.remove()
        })
    taskStore = Object.fromEntries(Object.entries(taskStore).filter(([_, snd]) => !snd))
    saveTasks()
}

