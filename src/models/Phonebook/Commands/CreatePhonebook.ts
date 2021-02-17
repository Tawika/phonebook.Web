import CreateEntry from "../../Entry/Commands/CreateEntry";

export default class CreatePhonebookCommand {
    public name: string = "";
    public entries: Array<CreateEntry> = new Array<CreateEntry>();
}