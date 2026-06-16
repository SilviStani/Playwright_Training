class Persona {
    name: string;
    age: number;
    constructor(parameters: { name: string; age: number }) {
        this.name = parameters.name;
        this.age = parameters.age;
    }

     showDetails() {
        console.log(`${this.name} is ${this.age} years old.`);
    }
}