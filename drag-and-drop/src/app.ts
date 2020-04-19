function Autobind(_: any, _2: string, description: PropertyDescriptor) {
    const boundMethod = description.value;
    const newDescription: PropertyDescriptor = {
        configurable: true,
        get() {
            return boundMethod.bind(this);
        }
    }
    return newDescription;
}

//State Management
class ProjectState {
    private projects: any[] = [];
    private listeners: any[] = [];
    private static instance: ProjectState;
    private constructor() { }
    static getInstance() {
        if (this.instance) return this.instance;
        return new ProjectState();
    }
    addProject(title: string, description: string, people: number) {
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            people
        }
        this.projects.push(newProject);
        console.log('1', this.projects);
        for (const fn of this.listeners) {
            fn(this.projects.slice());
        }
    }
    addListeners(fn: Function) {
        this.listeners.push(fn);
    }
}

const projectState = ProjectState.getInstance();

class ProjectList {
    templateEl: HTMLTemplateElement;
    rootEl: HTMLDivElement;
    sectionEl: HTMLElement;
    assignedProjects: any[] = [];

    constructor(private type: 'active' | 'finished') {
        this.templateEl = document.getElementById('project-list')! as HTMLTemplateElement;
        this.rootEl = document.getElementById('app')! as HTMLDivElement;
        const importedNode = document.importNode(this.templateEl.content, true);
        this.sectionEl = importedNode.firstElementChild as HTMLElement;
        this.sectionEl.id = `${this.type}-projects`;
        projectState.addListeners((projects: any[]) => {
            this.assignedProjects = projects;
            this.renderProject();
        })
        this.attach();
        this.fillContent();
    }

    private renderProject() {
        const listEl = document.getElementById(`${this.type}-projects-list`)!;
        for (const item of this.assignedProjects) {
            const listItem = document.createElement('li')!;
            listItem.textContent = item.title;
            listEl.appendChild(listItem);
        }
    }

    private fillContent() {
        const listId = `${this.type}-projects-list`;
        this.sectionEl.querySelector('ul')!.id = listId;
        this.sectionEl.querySelector('h2')!.textContent = this.type.toUpperCase() + ' Projects'
    }

    private attach() {
        this.rootEl.insertAdjacentElement('afterbegin', this.sectionEl);
    }

}

class ProjectInput {
    templateEl: HTMLTemplateElement;
    rootEl: HTMLDivElement;
    insertedEl: HTMLFormElement;
    inputTitle: HTMLInputElement;
    inputDesc: HTMLTextAreaElement;
    inputPeople: HTMLInputElement;

    constructor() {
        this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
        this.rootEl = document.getElementById('app')! as HTMLDivElement;
        const importedNode = document.importNode(this.templateEl.content, true);
        this.insertedEl = importedNode.firstElementChild as HTMLFormElement;
        this.insertedEl.id = 'user-input';
        this.attach();
        this.inputDesc = document.getElementById('description')! as HTMLTextAreaElement;
        this.inputPeople = document.getElementById('people')! as HTMLInputElement;
        this.inputTitle = document.querySelector('#title')! as HTMLInputElement;
        this.configure();
    }

    private clearInputs() {
        this.inputTitle.value = this.inputDesc.value = this.inputPeople.value = ''
    }

    private gatherInputs(): [string, string, number] | undefined {
        const titleValue = this.inputTitle.value;
        const descValue = this.inputDesc.value;
        const peopleValue = this.inputPeople.value;
        this.clearInputs()
        if ([titleValue.trim(), descValue.trim(), peopleValue.trim()].some(el => el === '')) {
            alert('Invalid input!! Please try again');
            return;
        } else {
            return [titleValue, descValue, +peopleValue];
        }
    }

    @Autobind
    private handleSubmit(e: Event) {
        e.preventDefault();
        const userInput = this.gatherInputs();
        if (Array.isArray(userInput)) {
            projectState.addProject(...userInput);
        }
    }

    private configure() {
        this.insertedEl.addEventListener('submit', this.handleSubmit)
    }

    private attach() {
        this.rootEl.insertAdjacentElement('afterbegin', this.insertedEl);
    }
}

const finishedProject = new ProjectList('finished');
const activeProject = new ProjectList('active');
const projInput = new ProjectInput();
