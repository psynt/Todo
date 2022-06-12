'use strict';

const tasks = document.getElementById("tasks");
const newTask = document.getElementById("newTask");

class TaskWriter{

    constructor(){
        this.num = 0;
        this.template = document.createElement("div");
        this.template.setAttribute("class", "task");
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        const label = document.createElement("label");
        label.innerText = "I am a task."
        this.template.appendChild(checkbox);
        this.template.appendChild(label);
    }

    addTask(text){
        const newNode = this.template.cloneNode(true);
        newNode.childNodes[0].setAttribute("id", `task${this.num}`);
        newNode.childNodes[1].setAttribute("for", `task${this.num}`);
        newNode.childNodes[1].innerText = text
        tasks.insertBefore(newNode, newTask);
        this.num++;
    }
}

const tw = new TaskWriter();

function createTask(){
    newTask.value.trim() && tw.addTask(newTask.value);
    newTask.value = "";
}

document.body.onload = addInitialTasks;

function addInitialTasks(){
    tw.addTask("Wake up");
    tw.addTask("Brush teeth");
    tw.addTask("Have breakfast");
}


