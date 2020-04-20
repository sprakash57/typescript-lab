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
var Status;
(function (Status) {
    Status[Status["Active"] = 0] = "Active";
    Status[Status["Finished"] = 1] = "Finished";
})(Status || (Status = {}));
;
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListeners(fn) {
        this.listeners.push(fn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        return new ProjectState();
    }
    addProject(title, description, people) {
        const newProject = new Project(Math.random().toString(), title, description, people, Status.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projId, newStatus) {
        const project = this.projects.find(prj => prj.id === projId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const fn of this.listeners) {
            fn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
class Component {
    constructor(templateId, rootId, insertPosition, newElementId) {
        this.insertPosition = insertPosition;
        this.templateEl = document.getElementById(templateId);
        this.rootEl = document.getElementById(rootId);
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = newElementId || '';
        this.attach();
    }
    attach() {
        this.rootEl.insertAdjacentElement(this.insertPosition, this.element);
    }
}
class ProjectItem extends Component {
    constructor(rootId, project) {
        super('single-project', rootId, 'beforeend', project.id);
        this.project = project;
        this.configure();
        this.fillContent();
    }
    get persons() {
        return this.project.people + ' person(s) assigned';
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragStopHandler(event) {
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragStopHandler);
    }
    fillContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons;
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    Autobind
], ProjectItem.prototype, "dragStartHandler", null);
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', 'beforeend', `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.fillContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            this.element.querySelector('ul').classList.add('droppable');
        }
    }
    dropHandler(event) {
        const projId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(projId, this.type === 'active' ? Status.Active : Status.Finished);
    }
    dragLeaveHandler(event) {
        this.element.querySelector('ul').classList.remove('droppable');
    }
    renderProject() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const item of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul').id, item);
        }
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListeners((projects) => {
            this.assignedProjects = projects.filter(prj => {
                if (this.type === 'active')
                    return prj.status === Status.Active;
                return prj.status === Status.Finished;
            });
            this.renderProject();
        });
    }
    fillContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' Projects';
    }
}
__decorate([
    Autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dragLeaveHandler", null);
class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', 'afterbegin', 'user-input');
        this.inputDesc = document.getElementById('description');
        this.inputPeople = document.getElementById('people');
        this.inputTitle = document.querySelector('#title');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.handleSubmit);
    }
    fillContent() { }
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
}
__decorate([
    Autobind
], ProjectInput.prototype, "handleSubmit", null);
const projInput = new ProjectInput();
const activeProject = new ProjectList('active');
const finishedProject = new ProjectList('finished');
