import Entry from "../Entry/Entry";

export default class Phonebook {

    public id: number = 0;

    public name: string = "";

    public entries: Array<Entry> = new Array<Entry>();

}