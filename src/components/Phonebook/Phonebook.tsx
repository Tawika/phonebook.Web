import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { connect, ConnectedProps } from 'react-redux'
import { Button, ButtonGroup } from 'reactstrap';
import { rootState } from '../../Store/combinedReducers'
import CreateEntryModal from './Modals/CreateEntryModal'
import { actionToggleModal, actionClearReducer } from '../../reducers/reducerCreateEntry'
import { thunkSavePhonebook } from '../../reducers/reducerPhonebook'
import ReactTable from 'react-table-6'
import Notification from '../../components/Notification/ToastNotification'
import applicationConstants from '../../Utils/applicationConstants'
import CreatePhonebookCommand from '../../models/Phonebook/Commands/CreatePhonebook'
import { history } from '../../Store/combinedReducers'
import CreateEntry from '../../models/Entry/Commands/CreateEntry'

// State: Form
interface DataFromProps {
    name: string;
}

// State : mapStateToProps
interface StateFromProps {
    phonebookName: string
    entries: Array<CreateEntry>,
}

// State : mapDispatchToProps
interface DispatchFromProps {
    actionToggleModal: any,
    thunkSavePhonebook: any,
    actionClearReducer: any
}

function mapStateToProps(state: rootState): StateFromProps {
    return {
        phonebookName: state.createPhonebook.phonebookName,
        entries: state.createEntry.entries,
    };
}

const mapDispatchToProps: DispatchFromProps = {
    actionToggleModal,
    thunkSavePhonebook,
    actionClearReducer
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

class CreatePhonebook extends React.Component<PropsFromRedux & InjectedFormProps<DataFromProps>> {

    public constructor(props: any) {
        super(props);
        this.savPhonebook = this.savPhonebook.bind(this);
        this.disableAddContact = this.disableAddContact.bind(this);
    }

    public savPhonebook() {
        // Check that at least one contact has been added 
        if (this.props.entries.length === 0) {
            Notification({
                position: "top-right",
                message: applicationConstants.addAtLeastOneEntry,
                type: "warning"
            })

            return;
        }

        // Create phonebook
        let phonebookToSave = new CreatePhonebookCommand();
        phonebookToSave.name = this.props.phonebookName;
        phonebookToSave.entries = this.props.entries;

        this.props.thunkSavePhonebook(phonebookToSave).then((response: boolean) => {

            // Show success notification message
            Notification({
                position: "top-right",
                message: "Phonebook saved successfully.",
                type: "success"
            })

            // Clear reducer
            this.props.actionClearReducer();

            // Navigate to home page
            history.push("/");
        });
    }

    public disableAddContact(): boolean {
        if (this.props.phonebookName) {
            const length = this.props.phonebookName.length > 0;
            return !length;
        }
        return true;
    }

    public render() {

        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
        }, {
            Header: 'Phone Number',
            accessor: 'phoneNumber',
        }];

        return (
            <React.Fragment>
                <div className="center">

                    <ButtonGroup className="mt-2">
                        <Button outline color="danger"
                            disabled={this.disableAddContact()}
                            onClick={(e: any) => { this.props.actionToggleModal() }}
                            className="mr-2">
                            Add Contact
                            </Button>
                        <button type="button" className="btn btn-success" onClick={ ()=> this.savPhonebook() }>Save Phonebook</button>
                    </ButtonGroup>

                    <ReactTable className="mt-2"
                        data={this.props.entries}
                        columns={columns}
                        defaultPageSize={5}
                    />
                    <CreateEntryModal />
                </div>

            </React.Fragment>
        )
    }
}

const form = reduxForm<DataFromProps>({ form: 'createPhonebook' })(CreatePhonebook);

export default connect(mapStateToProps, mapDispatchToProps)(form);