import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Card, CardBody, Button } from 'reactstrap';

export interface IHomeCardProps {
    icon: IconDefinition,
    navigate: () => void,
    buttonTitle: string,
    size: string,
}


export default class HomeCard extends React.Component<IHomeCardProps> {

    public constructor(props: IHomeCardProps) {
        super(props);
    }

    public render() {
        return (
            <div className="col-6">
                <Card>
                    <CardBody className="mx-auto">

                        <div className="col-12">
                            <div className="col-6">
                                <FontAwesomeIcon icon={this.props.icon} size="9x" />
                            </div>

                            <div className="col-6 mt-2" style={{ marginLeft: `${this.props.size}` }}>
                                <Button outline
                                    color="danger"
                                    size="sm"
                                    onClick={(e) => {
                                        this.props.navigate();
                                    }}
                                >
                                    {this.props.buttonTitle}
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

