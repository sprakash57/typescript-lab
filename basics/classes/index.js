/**
 * Why we need private properties?
 * It may happen that editEmployees have validation check, which will
 * be skippped if someone directly access employees array and add any
 * employee through index.
 */
var Action;
(function (Action) {
    Action[Action["ADD"] = 0] = "ADD";
    Action[Action["REMOVE"] = 1] = "REMOVE";
})(Action || (Action = {}));
class Department {
    // private name: string;
    // constructor(n: string) {
    //     this.name = n;
    // }
    //or
    constructor(name, id) {
        this.name = name;
        this.id = id;
        //Access modifier: Default is public if you won't allow anything
        //Public -> Everyone, Protected -> Class and their inherited childs, Private -> only class
        this.employees = [];
    }
    describe() {
        console.log('This is ' + this.name + ' department');
    }
    editEmployees(empName, action) {
        if (action === 0)
            this.employees.push(empName);
        else
            this.employees = this.employees.filter(emp => emp !== empName);
        this.printEmployees();
    }
    printEmployees() {
        console.log(this.employees);
    }
}
//Encapsulation
class AccountDepartment extends Department {
    constructor(name, id, reports = []) {
        super(name, id);
        this.name = name;
        this.id = id;
        this.reports = reports;
    }
    get mostRecent() {
        if (this.reports.length === 0)
            throw new Error('No reports found');
        this.lastReport = this.reports[0];
        return this.lastReport;
    }
    set mostRecent(value) {
        this.addReports(value);
    }
    addReports(report) {
        if (report === '')
            throw { msg: 'Not a valid value' };
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
    constructor(id, admins) {
        super('IT', id);
        this.id = id;
        this.admins = admins;
    }
}
const it = new ITDepartment('A002', ['sunny']);
console.log(it);
class WebDepartment extends ITDepartment {
    constructor(id, admins) {
        super(id, admins);
        this.id = id;
        this.admins = admins;
        this.name = 'Web'; //Overriding
    }
}
const w = new WebDepartment('A003', ['Bruce']);
console.log(w);
