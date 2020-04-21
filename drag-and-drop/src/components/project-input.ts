import { Component } from './base-component.js'
import { Autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
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
