const persona = new Persona({ name: "Silvina", age: 46 });
persona.showDetails();
/* Leave this as example */
const rest = (a: number, b: number) => {
    console.log(`${a} - ${b} = ${a - b}`);
    return a - b;
}
const sum = (a: number, b: number) => {
    console.log(`${a} + ${b} = ${a + b}`);
    return a + b;
}
/** Use this a more complex and complete math usage */
const mathFunction = (a: number, b: number, option: string) => {
    switch (option) {
        case "rest":
            console.log(`${a} - ${b} = ${a - b}`);
            return a - b;
            case "sum":
            console.log(`${a} + ${b} = ${a + b}`);
            return a + b;
            case "mult":
            console.log(`${a} * ${b} = ${a * b}`);
            return a * b;
            case "div":
            if (b === 0) {
                console.log("Cannot divide by zero");
                return null;
            }
            console.log(`${a} / ${b} = ${a / b}`);
            return a / b;
        default:
            console.log("Option not valid");
    }
}

mathFunction(10, 5, "rest"); // result: 5
mathFunction(10, 5, "sum"); // result: 15
mathFunction(10, 5, "mult"); // result: 50
mathFunction(10, 5, "div"); // result: 2
mathFunction(10, 0, "div"); // result: Cannot divide by zero
mathFunction(10, 5, "invalid"); // result: Option not valid