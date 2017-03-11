import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creater to sign up the user!
    this.props.signupUser(formProps);
  }

  renderField({ input, label, type, name, meta: { touched, error } }) {
    return (
      <fieldset className={'form-group ' + (touched && error && 'has-danger') }>
        <label className="control-label" htmlFor={name}>{label}:</label>
        <input className="form-control" {...input} placeholder={label} type={type} />
        {touched && error && <strong className="text-danger">{error}</strong>}
      </fieldset>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field label="Email" name="email" component={this.renderField} type="email" />
        <Field label="Password" name="password" component={this.renderField} type="password" />
        <Field label="Confirm Password" name="passwordConfirm" component={this.renderField} type="password" />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign in!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter an password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter an password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const InitializeFromStateForm = reduxForm({
  form: 'signup',
  validate,
})(Signup);

export default connect(mapStateToProps, actions)(InitializeFromStateForm);
