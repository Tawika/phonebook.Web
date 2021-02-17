import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import Phonebook from '../../models/Phonebook/Phonebook'
import { rootState } from '../../Store/combinedReducers'
import { debounce } from 'lodash'
import ReactTable from 'react-table-6'
import { thunkGetPhonebook, actionClearReducer, thunkDownloadPhonebook } from '../../reducers/reducerPhonebook'
import './ViewPhonebook.css'
import Entry from '../../models/Entry/Entry'
import { Button } from 'reactstrap'

// State : component
interface StateFromComponent {
    defaultPageSize: number,
    defaultPageNo: number,
    defaultSortFunction: { id: string, desc: boolean },
    searchText: string,
    pageSize: number,
    pageNo: number,
    sortFunction: { id: string, desc: boolean }
}

// State : mapStateToProps
interface StateFromProps {
    phonebook: Phonebook | null,
    isLoading: boolean
}

// State : mapDispatchToProps
interface DispatchFromProps {
    thunkGetPhonebook: any,
    actionClearReducer: any,
    thunkDownloadPhonebook:any
}

function mapStateToProps(rootState: rootState): StateFromProps {
    return {
        phonebook: rootState.createPhonebook.phonebook,
        isLoading: rootState.createPhonebook.isLoading,
    }
}

const mapDispatchToProps: DispatchFromProps = {
    thunkGetPhonebook,
    actionClearReducer,
    thunkDownloadPhonebook
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

class ViewPhoneBook extends React.Component<PropsFromRedux, StateFromComponent>{

    public constructor(props: PropsFromRedux) {
        super(props);

        this.state = {
            defaultPageSize: 5,
            defaultPageNo: 0,
            defaultSortFunction: { id: "name", desc: false },
            searchText: "",
            pageSize: 5,
            pageNo: 0,
            sortFunction: { id: "name", desc: false },
        }

        this.handleOnChange = debounce(this.handleOnChange, 1000);
        this.tableData = this.tableData.bind(this);
    }

    public componentDidMount() {
        this.props.thunkGetPhonebook(this.state.defaultPageSize, this.state.defaultPageNo, this.state.searchText, this.state.defaultSortFunction.id, this.state.defaultSortFunction.desc);
    }

    public componentWillUnmount() {
        this.props.actionClearReducer();
    }

    public handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState((previousState, props) => ({
            searchText: e.target.value,
        }));
        this.props.thunkGetPhonebook(this.state.pageSize, this.state.pageNo, e.target.value, this.state.sortFunction.id, this.state.sortFunction.desc);
    }

    public tableData() {

        if (this.props.phonebook) {
            return this.props.phonebook.entries;
        }

        return new Array<Entry>();
    }

    public render() {

        const cols = [{
            Header: 'Name',
            accessor: 'name'
        }, {
            Header: 'Phone Number',
            accessor: 'phoneNumber',
        }];

        return (
            <div className="row">
                <div className="center">

                    <div className="form-group search">
                        <span className="form-control-feedback">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input type="text"
                            className="form-control"
                            placeholder="Search"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                this.handleOnChange(e);
                            }} />
                    </div>

                    <Button className="right" color="danger" outline onClick={()=> this.props.thunkDownloadPhonebook()}>
                        Download Entries
                    </Button>

                    <div className="tableMargin">
                        <ReactTable
                            data={this.tableData()}
                            columns={cols}

                            pages={this.state.defaultPageNo}
                            defaultPageSize={this.state.defaultPageSize}
                            pageSizeOptions={[5, 10, 20]}
                            loading={this.props.isLoading}
                            showPagination={true}
                            showPaginationTop={false}
                            showPaginationBottom={true}
                            defaultSorted={[this.state.defaultSortFunction]}

                            onPageSizeChange={(newPageSize, newPage) => {
                                this.setState((previousState, props) => ({
                                    pageSize: newPageSize,
                                }));
                                this.props.thunkGetPhonebook(newPageSize, this.state.pageNo, this.state.searchText, this.state.sortFunction.id, this.state.sortFunction.desc);
                            }}

                            onSortedChange={(e) => {

                                const { id, desc } = e[0];

                                this.setState((previousState, props) => ({
                                    sortFunction: { id, desc },
                                }));
                                this.props.thunkGetPhonebook(this.state.pageSize, this.state.pageNo, this.state.searchText, id, desc);
                            }}

                            onPageChange={(e) => {
                                this.setState((previousState, props) => ({
                                    pageNo: e,
                                }));
                                this.props.thunkGetPhonebook(this.state.pageSize, e, this.state.searchText, this.state.sortFunction.id, this.state.sortFunction.desc);
                            }}
                        />
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPhoneBook);