import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ButtonGroup } from 'reactstrap';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import CreateEntry from '../../../models/Entry/Commands/CreateEntry';
import Entry from '../../../models/Entry/Entry';
import { ICreateEntryState, actionToggleModal, actionAddEntry } from '../../../reducers/reducerCreateEntry'
import { rootState } from '../../../Store/combinedReducers';
import applicationConstants from '../../../Utils/applicationConstants';
import { validateEntryPhoneNumber, validate10DigitPhoneNumber, validateEntryName } from '../../../Utils/Validation/validations';
import elementInput from '../../elements/elementInputError'
import Notification from '../../Notification/ToastNotification'

// State: Form
interface DataFromProps {
    name: string,
    phoneNumber: string,
}

// State : mapStateToProps
interface StateFromProps extends ICreateEntryState {
}

// State : mapDispatchToProps
interface DispatchFromProps {
    actionToggleModal: any,
    actionAddEntry:any
}

function mapStateToProps(state: rootState): StateFromProps {
    return {
        isOpen: state.createEntry.isOpen,
        entries: state.createEntry.entries
    }
}

const mapDispatchToProps: DispatchFromProps = {
    actionToggleModal,
    actionAddEntry
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

class CreateEntryModal extends React.Component<PropsFromRedux & InjectedFormProps<DataFromProps>> {

    public constructor(props: any) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public submit(e: any) {
        const {name, phoneNumber} = e;

        // Check if name already exists
        let nameCheck = this.props.entries.find((c: CreateEntry)=>{
            return c.name.toLowerCase().trim() === name.toLowerCase().trim();
        });

        if(nameCheck){
            Notification({
                message: applicationConstants.entryNameExists,
                position: 'top-center',
                type: 'error'
            });

            this.props.change('name', "");

            return;
        }

        // Check if phone already exists
        let phoneNumberCheck = this.props.entries.find((c: CreateEntry)=>{
            return c.phoneNumber.toLowerCase().trim() === phoneNumber.toLowerCase().trim();
        });

        if(phoneNumberCheck){
            Notification({
                message: applicationConstants.entryPhoneNumberExists,
                position: 'top-center',
                type: 'error'
            });

            this.props.change('phoneNumber', "");
            return;
        }

        let newEntry = new Entry();
        newEntry.id = 0;
        newEntry.name = name;
        newEntry.phoneNumber = phoneNumber;

        this.props.actionAddEntry(newEntry);

        this.handleCancel();
    }

    public handleCancel(){
        this.props.reset();
        this.props.actionToggleModal();
    }

    public render() {

        const {handleSubmit} = this.props;

        return (
            <Modal isOpen={this.props.isOpen}>
                <ModalHeader>{applicationConstants.Titles.createEntry}</ModalHeader>
                <ModalBody>

                    <form onSubmit={handleSubmit(this.submit)}  >
                        <Field
                            label="Name"
                            name="name"
                            type="text"
                            component={elementInput}
                            validate={validateEntryName}
                        />

                        <Field
                            label="Phone Number"
                            name="phoneNumber"
                            type="text"
                            component={elementInput}
                            validate={[validateEntryPhoneNumber, validate10DigitPhoneNumber]}
                        />

                        <div className="row mt-2 float-right" style={{ marginRight: "40px" }} >
                            <ButtonGroup>
                                <button type="submit" className="btn btn-outline-danger mr-2">Save</button>
                                <button type="button" onClick={()=> this.handleCancel()} className="btn btn-outline-warning"> Cancel </button>
                            </ButtonGroup>
                        </div>

                    </form>

                </ModalBody>
            </Modal>
        )
    }
}

const form = reduxForm<DataFromProps>({ form: 'createEntry' })(CreateEntryModal);

export default connect(mapStateToProps, mapDispatchToProps)(form);