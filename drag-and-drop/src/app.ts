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

//Drag and drop interface
interface Draggable {
    dragStartHandler(event: DragEvent): void
    dragStopHandler(event: DragEvent): void
}


interface DragTarget {
    dragOverHandler(event: DragEvent): void
    dropHandler(event: DragEvent): void
    dragLeaveHandler(event: DragEvent): void
}

enum Status { Active, Finished };
class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: Status
    ) { }
}

//State Management
type Listeners<T> = (items: T[]) => void

class State<T>{
    protected listeners: Listeners<T>[] = [];
    addListeners(fn: Listeners<T>) {
        this.listeners.push(fn);
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;
    private constructor() {
        super()
    }
    static getInstance() {
        if (this.instance) return this.instance;
        return new ProjectState();
    }
    addProject(title: string, description: string, people: number) {
        const newProject = new Project(Math.random().toString(), title, description, people, Status.Active)
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projId: string, newStatus: Status) {
        const project = this.projects.find(prj => prj.id === projId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const fn of this.listeners) {
            fn(this.projects.slice());
        }
    }

}

const projectState = ProjectState.getInstance();

abstract class Component<T extends HTMLElement, U extends HTMLElement>{
    templateEl: HTMLTemplateElement;
    rootEl: T;
    element: U;

    constructor(templateId: string, rootId: string, public insertPosition: InsertPosition, newElementId?: string) {
        this.templateEl = document.getElementById(templateId)! as HTMLTemplateElement;
        this.rootEl = document.getElementById(rootId)! as T;
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as U;
        this.element.id = newElementId || '';
        this.attach();
    }

    private attach() {
        this.rootEl.insertAdjacentElement(this.insertPosition, this.element);
    }

    abstract configure(): void;
    abstract fillContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;
    get persons() {
        return this.project.people + ' person(s) assigned';
    }
    constructor(rootId: string, project: Project) {
        super('single-project', rootId, 'beforeend', project.id);
        this.project = project;
        this.configure();
        this.fillContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragStopHandler(event: DragEvent): void {

    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler)
        this.element.addEventListener('dragend', this.dragStopHandler)
    }

    fillContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons;
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', 'beforeend', `${type}-projects`)
        this.configure();
        this.fillContent();
    }
    @Autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            this.element.querySelector('ul')!.classList.add('droppable');
        }
    }
    @Autobind
    dropHandler(event: DragEvent): void {
        const projId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projId, this.type === 'active' ? Status.Active : Status.Finished)
    }
    @Autobind
    dragLeaveHandler(event: DragEvent): void {
        this.element.querySelector('ul')!.classList.remove('droppable')
    }

    private renderProject() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const item of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, item);
        }
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListeners((projects: Project[]) => {
            this.assignedProjects = projects.filter(prj => {
                if (this.type === 'active') return prj.status === Status.Active;
                return prj.status === Status.Finished;
            });
            this.renderProject();
        });
    }

    fillContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' Projects'
    }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    inputTitle: HTMLInputElement;
    inputDesc: HTMLTextAreaElement;
    inputPeople: HTMLInputElement;
    constructor() {
        super('project-input', 'app', 'afterbegin', 'user-input')
        this.inputDesc = document.getElementById('description')! as HTMLTextAreaElement;
        this.inputPeople = document.getElementById('people')! as HTMLInputElement;
        this.inputTitle = document.querySelector('#title')! as HTMLInputElement;
        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.handleSubmit)
    }

    fillContent() { }

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
}

const projInput = new ProjectInput();
const activeProject = new ProjectList('active');
const finishedProject = new ProjectList('finished');
