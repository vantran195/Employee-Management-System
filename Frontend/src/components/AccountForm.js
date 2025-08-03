import React from 'react';

const AccountForm = (props) => {
    return (
        <div className="account-crud">
            <form onSubmit={props.handleSubmit} className="account-crud-form">
                <h1 className="account-crud-title">{props.formTitle}</h1>
                <div className="crud-label-value">
                    <label htmlFor="username" className="account-crud-label">Username</label>
                    <input
                        className="account-crud-value"
                        value={props.account.username}
                        name="username"
                        onChange={props.handleInputChange}
                        disabled={props.isEditMode}
                    />
                </div>
                <div className="crud-label-value">
                    <label htmlFor="firstName" className="account-crud-label">First Name</label>
                    <input
                        className="account-crud-value"
                        value={props.account.firstName}
                        name="firstName"
                        onChange={props.handleInputChange}
                        disabled={props.isEditMode}
                    />
                </div>
                <div className="crud-label-value">
                    <label htmlFor="lastName" className="account-crud-label">Last Name</label>
                    <input
                        className="account-crud-value"
                        value={props.account.lastName}
                        name="lastName"
                        onChange={props.handleInputChange}
                        disabled={props.isEditMode}
                    />
                </div>
                <div className="crud-label-value">
                    <label htmlFor="role" className="account-crud-label">Role</label>
                    <select name="role" id="role" className="account-crud-value" value={props.account.role} onChange={props.handleInputChange}>
                        {props.roles.length > 0 ? 
                            props.roles.map((item) => (
                                <option key={item.value} value={item.value}>{item.name}</option>
                            ))
                        : ""}       
                    </select>
                </div>
                <div className="crud-label-value">
                    <label htmlFor="department" className="account-crud-label">Group</label>
                    <select name="departmentId" id="department" className="account-crud-value" value={props.account.departmentId} onChange={props.handleInputChange}>
                        <option value="0">Unknown</option>
                        {props.departments.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="account-crud-actions">
                    <button type="button" className="account-crud-cancel" onClick={props.handleCancel}>Cancel</button>
                    <button type="submit" className="account-crud-submit">{props.isEditMode ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </div>
    );
};

export default AccountForm;