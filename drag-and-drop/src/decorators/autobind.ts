export function Autobind(_: any, _2: string, description: PropertyDescriptor) {
    const boundMethod = description.value;
    const newDescription: PropertyDescriptor = {
        configurable: true,
        get() {
            return boundMethod.bind(this);
        }
    }
    return newDescription;
}