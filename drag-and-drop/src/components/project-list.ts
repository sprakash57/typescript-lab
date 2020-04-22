import { DragTarget } from "../models/drag-drop";
import { Component } from './base-component'
import { projectState } from "../state/project-state";
import * as P from "../models/project";
import { Autobind } from "../decorators/autobind";
import { ProjectItem } from "./project-item";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: P.Project[] = [];

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
        projectState.moveProject(projId, this.type === 'active' ? P.Status.Active : P.Status.Finished)
    }
    @Autobind
    dragLeaveHandler(_: DragEvent): void {
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
        projectState.addListeners((projects: P.Project[]) => {
            this.assignedProjects = projects.filter(prj => {
                if (this.type === 'active') return prj.status === P.Status.Active;
                return prj.status === P.Status.Finished;
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