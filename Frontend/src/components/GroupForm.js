import React from "react";
const GroupForm = ({
    department,
    handleChange,
    handleSubmit,
    handleCancel,
    handleReset,
    formTitle,
}) => {

    return (
        <>
            <form className="department-crud-form" onSubmit={handleSubmit}>
                <h1 className="department-crud-title">{formTitle}</h1>
                    <div className="form-element">
                        <label className="crud-label crud-label-v2">Group ID</label>
                        <input
                            className="crud-value-text"
                            value={department.id}
                            disabled
                        />
                    </div>
                

                <div className="form-element">
                    <label className="crud-label crud-label-v2">Group Name</label>
                    <input
                        className="crud-value-text"
                        value={department.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Group name..."

                    />
                </div>


                <div className="crud-button">
                    <button
                        className="crud-button-reset"
                        type="button"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        className="crud-button-cancel"
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button className="crud-button-submit" type="submit">
                        Confirm
                    </button>
                </div>
            </form>
        </>
    );
};

export default GroupForm;