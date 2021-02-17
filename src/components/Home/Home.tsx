import React from 'react'
import textConstants from '../../Utils/applicationConstants'
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../../Utils/apiHandler/axiosInstance'
import { AxiosResponse } from 'axios'
import Notification from '../../components/Notification/ToastNotification'
import applicationConstants from '../../Utils/applicationConstants'
import { history } from '../../Store/combinedReducers'
import HomeCard from './components/homeCard';
import CreatePhonebookModal from '../Phonebook/Modals/CreatePhonebookModal';
import {actionToggleModal} from '../../reducers/reducerPhonebook'
import { rootState } from '../../Store/combinedReducers'
import { connect, ConnectedProps } from 'react-redux';

// State : mapStateToProps
interface StateFromProps {
}

// State : mapDispatchToProps
interface DispatchFromProps {
    actionToggleModal: any,
}

function mapStateToProps(state: rootState): StateFromProps {
    return {

    }
}

const mapDispatchToProps: DispatchFromProps = {
    actionToggleModal,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

class Home extends React.Component<PropsFromRedux> {

    public constructor(props: any) {
        super(props);
        this.createPhoneBook = this.createPhoneBook.bind(this);
    }

    public async createPhoneBook() {
        await axiosInstance.get('/api/Phonebook/PhonebookExists').then((response: AxiosResponse<boolean>) => {
            if (response.data) {
                Notification({
                    position: "top-right",
                    message: applicationConstants.phoneBookAlreadyExists,
                    type: "info"
                })
            }
            else {
                this.props.actionToggleModal();
            }
        });
    }

    public async viewPhoneBook() {
        await axiosInstance.get('/api/Phonebook/PhonebookExists').then((response: AxiosResponse<boolean>) => {
            if (response.data) {
                history.push('/ViewPhonebook');
            }
            else {
                Notification({
                    position: "top-right",
                    message: "Please create a phonebook before attempting to view.",
                    type: "info"
                })
            }
        });
    }

    public render() {
        return (
            <div className="mt-5 container">
                <div className="row">
                    <pre style={{ fontSize: "3rem", color: "red", paddingLeft:"15px"}}>
                        {textConstants.whatWouldYouLikeToDo}
                    </pre>
                </div>

                <div className="row">
                    <div className="col-12">

                        <div className="row">

                            {/* Create Phonebook Card */}
                            <HomeCard icon={faBook} size="22px" buttonTitle="Create Phonebook" navigate={()=> this.createPhoneBook()}/>

                            {/* View Phonebook Card */}
                            <HomeCard icon={faBookOpen} size="38px" buttonTitle="View Phonebook" navigate={()=> this.viewPhoneBook()}/>

                        </div>
                    </div>
                </div>
                <CreatePhonebookModal/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);