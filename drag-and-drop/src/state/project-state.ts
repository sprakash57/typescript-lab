import { Project, Status } from "../models/project";

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

export const projectState = ProjectState.getInstance();
