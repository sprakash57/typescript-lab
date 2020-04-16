/**
 * Why we need private properties?
 * It may happen that editEmployees have validation check, which will
 * be skippped if someone directly access employees array and add any 
 * employee through index.
 */
enum Action { ADD, REMOVE }

abstract class Department {
    //Access modifier: Default is public if you won't allow anything
    //Public -> Everyone, Protected -> Class and their inherited childs, Private -> only class
    private employees: string[] = []
    // private name: string;
    // constructor(n: string) {
    //     this.name = n;
    // }
    //or
    constructor(protected name: string, readonly id: string) { }

    describe(this: Department) {
        console.log('This is ' + this.name + ' department');
    }

    editEmployees(empName: string, action: Action) {
        if (action === 0) this.employees.push(empName);
        else this.employees = this.employees.filter(emp => emp !== empName);
        this.printEmployees();
    }

    printEmployees(this: Department) {
        console.log(this.employees);
    }
}

//Encapsulation
class AccountDepartment extends Department {
    private lastReport: string;
    get mostRecent() {
        if (this.reports.length === 0) throw new Error('No reports found');
        this.lastReport = this.reports[0]
        return this.lastReport;
    }

    set mostRecent(value: string) {
        this.addReports(value);
    }
    constructor(protected name: string, readonly id: string, private reports: string[] = []) {
        super(name, id);
    }

    addReports(report: string) {
        if (report === '') throw { msg: 'Not a valid value' };
        this.reports.push(report);
        this.printReports();
    }

    printReports() {
        console.log(this.reports);
    }

}

const a = new AccountDepartment('Account', 'A004');
a.addReports('banks');

//You can't inherit from multiple classes
class ITDepartment extends Department {
    constructor(readonly id: string, public admins: string[]) {
        super('IT', id);
    }
}

const it = new ITDepartment('A002', ['sunny']);
console.log(it);

class WebDepartment extends ITDepartment {
    constructor(readonly id: string, public admins: string[]) {
        super(id, admins);
        this.name = 'Web';//Overriding
    }
}

const w = new WebDepartment('A003', ['Bruce']);
console.log(w);
//Singleton pattern
class HelpDesk {
    private static instance: HelpDesk;
    private constructor(private phone: number) {
        console.log(this.phone);
    }

    static getInstance() {
        if (this.instance) return this.instance;
        else new HelpDesk(124567897)
    }
}
