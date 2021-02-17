import React from 'react'
import { WrappedFieldProps } from 'redux-form';

type FieldProps = {
    label: string,
    type: string,
    placeholder: string
}

export default class elementInputError extends React.Component<FieldProps & WrappedFieldProps, {}> {

    public constructor(props: FieldProps & WrappedFieldProps) {
        super(props);
    }

    public render() {

        const { input, label, type, placeholder, meta: { touched, error, warning } } = this.props;

        return (
            <div className="row justify-content-center">
                <div className="col-10">
                    <label className="col-form-label">{label}</label>
                    <input
                        {...input}
                        type={type}
                        placeholder={placeholder}
                        className="form-control"
                    />
                    {touched && ((error && <span style={{ color: "red" }}>{error}</span>) || (warning && <span>{warning}</span>))}
                </div>
            </div>
        )
    }
}