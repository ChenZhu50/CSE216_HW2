class Undergraduate extends Student {
    constructor(initKey, firstName, lastName, initGPA, standingng) {
        super(initKey, firstName, lastName, initGPA)
        this.standingng = standingng
    }

    toString() {
        return `${super.toString()} ${this.standingng}`
    }
}

export { Person, Employee, Student, Undergraduate };