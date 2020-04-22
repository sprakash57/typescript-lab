export abstract class Component<T extends HTMLElement, U extends HTMLElement>{

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
