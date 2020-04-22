import { Draggable } from "../models/drag-drop";
import { Component } from './base-component'
import { Project } from "../models/project";
import { Autobind } from "../decorators/autobind";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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

    dragStopHandler(_: DragEvent): void { }

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
