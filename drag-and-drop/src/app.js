"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Autobind(_, _2, description) {
    const boundMethod = description.value;
    const newDescription = {
        configurable: true,
        get() {
            return boundMethod.bind(this);
        }
    };
    return newDescription;
}
//State Management
class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        return new ProjectState();
    }
    addProject(title, description, people) {
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            people
        };
        this.projects.push(newProject);
        console.log('1', this.projects);
        for (const fn of this.listeners) {
            fn(this.projects.slice());
        }
    }
    addListeners(fn) {
        this.listeners.push(fn);
    }
}
const projectState = ProjectState.getInstance();
class ProjectList {
    constructor(type) {
        this.type = type;
        this.assignedProjects = [];
        this.templateEl = document.getElementById('project-list');
        this.rootEl = document.getElementById('app');
        const importedNode = document.importNode(this.templateEl.content, true);
        this.sectionEl = importedNode.firstElementChild;
        this.sectionEl.id = `${this.type}-projects`;
        projectState.addListeners((projects) => {
            this.assignedProjects = projects;
            this.renderProject();
        });
        this.attach();
        this.fillContent();
    }
    renderProject() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        for (const item of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = item.title;
            listEl.appendChild(listItem);
        }
    }
    fillContent() {
        const listId = `${this.type}-projects-list`;
        this.sectionEl.querySelector('ul').id = listId;
        this.sectionEl.querySelector('h2').textContent = this.type.toUpperCase() + ' Projects';
    }
    attach() {
        this.rootEl.insertAdjacentElement('afterbegin', this.sectionEl);
    }
}
class ProjectInput {
    constructor() {
        this.templateEl = document.getElementById('project-input');
        this.rootEl = document.getElementById('app');
        const importedNode = document.importNode(this.templateEl.content, true);
        this.insertedEl = importedNode.firstElementChild;
        this.insertedEl.id = 'user-input';
        this.attach();
        this.inputDesc = document.getElementById('description');
        this.inputPeople = document.getElementById('people');
        this.inputTitle = document.querySelector('#title');
        this.configure();
    }
    clearInputs() {
        this.inputTitle.value = this.inputDesc.value = this.inputPeople.value = '';
    }
    gatherInputs() {
        const titleValue = this.inputTitle.value;
        const descValue = this.inputDesc.value;
        const peopleValue = this.inputPeople.value;
        this.clearInputs();
        if ([titleValue.trim(), descValue.trim(), peopleValue.trim()].some(el => el === '')) {
            alert('Invalid input!! Please try again');
            return;
        }
        else {
            return [titleValue, descValue, +peopleValue];
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        const userInput = this.gatherInputs();
        if (Array.isArray(userInput)) {
            projectState.addProject(...userInput);
        }
    }
    configure() {
        this.insertedEl.addEventListener('submit', this.handleSubmit);
    }
    attach() {
        this.rootEl.insertAdjacentElement('afterbegin', this.insertedEl);
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "handleSubmit", null);
const finishedProject = new ProjectList('finished');
const activeProject = new ProjectList('active');
const projInput = new ProjectInput();
