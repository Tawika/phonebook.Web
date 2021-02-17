import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { rootState } from '../../../Store/combinedReducers'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import { actionToggleModal, actionAddPhonebookName} from '../../../reducers/reducerPhonebook'
import { ButtonGroup, Modal, ModalBody, ModalHeader } from 'reactstrap'
import applicationConstants from '../../../Utils/applicationConstants'
import { validatePhonebookName } from '../../../Utils/Validation/validations'
import elementInput from '../../elements/elementInputError'
import { history } from '../../../Store/combinedReducers'

// State: Form
interface DataFromProps {
    name: string,
}

// State : mapStateToProps
interface StateFromProps {
    isOpen: boolean
}

// State : mapDispatchToProps
interface DispatchFromProps {
    actionToggleModal: any,
    actionAddPhonebookName: any
}

function mapStateToProps(state: rootState): StateFromProps {
    return {
        isOpen: state.createPhonebook.isOpen,
    }
}

const mapDispatchToProps: DispatchFromProps = {
    actionToggleModal,
    actionAddPhonebookName
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>


class CreatePhonebookModal extends React.Component<InjectedFormProps<DataFromProps> & PropsFromRedux>{
    
    public constructor(props: any){
        super(props);
        this.submit = this.submit.bind(this);
    }

    public submit(e: any) {
        
        this.props.actionAddPhonebookName(e.name);

        this.handleCancel();

        history.push('/CreatePhonebook');
    }

    public handleCancel(){
        this.props.reset();
        this.props.actionToggleModal();
    }

    public render(){
        const {handleSubmit} = this.props;

        return (
            <Modal isOpen={this.props.isOpen}>
                <ModalHeader>{applicationConstants.Titles.createPhonebook}</ModalHeader>
                <ModalBody>

                    <form onSubmit={handleSubmit(this.submit)}  >
                        <Field
                            label="Name"
                            name="name"
                            type="text"
                            component={elementInput}
                            validate={validatePhonebookName}
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

const form = reduxForm<DataFromProps>({ form: 'createPhonebook' })(CreatePhonebookModal);

export default connect(mapStateToProps, mapDispatchToProps)(form);