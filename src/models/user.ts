export class User {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public email: string,
        public role_id: number,
    ){}

    get name() {
        return this.first_name + ' ' + this.last_name;
    }
}
