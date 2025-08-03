import { useState } from "react";
import DepartmentApi from "../api/groupApi";
import "../assets/styles/user/departmentadd.css";
import GroupForm from "../components/GroupForm";
import { handleError } from "../utils/GroupUtils";

const GroupAdd = ({ setDisplayStatus, page, refreshDepartmentList, sortBy, types}) => {
    const DISPLAY_NONE = 0;

    const [department, setDepartment] = useState({
        name: "",
    });
    const handleCancel = () => {
        if (setDisplayStatus) {
            setDisplayStatus(DISPLAY_NONE);
        }
    };

    const handleChangeDepartments = (e) => {
        const { name, value } = e.target;
        setDepartment({
            ...department,
            [name]: value
        });
    };

    const createNewDepartment = async (e) => {
        e.preventDefault();
        if (!department.name.trim()) {
            alert("Group name cannot be blank!");
            return;
        }

        try {
            const response = await DepartmentApi.createNewDepartment({
                name: department.name,
            });
            
            if (response.status === 200) {
                alert("Create a successful group!");
                refreshDepartmentList(page, sortBy);
                setDisplayStatus(DISPLAY_NONE);
            } else if (response.status === 401) {
                alert("You do not have permission to create groups!");
            } else if (response.status === 404) {
                alert("Group name already exists!");
            }
            else {
                alert("Group creation failed!");
            }
        } catch (error) {
            handleError(error, "creating the group");
        }
    };


    return (
        <div className="department-crud">
            <GroupForm
                department={department}
                types={types}
                handleChange={handleChangeDepartments}
                handleSubmit={createNewDepartment}
                handleCancel={handleCancel}
                handleReset={() => setDepartment({ name: "", accounts: [] })}
                formTitle="Create New Group"
            />
        </div>
    );
};

export default GroupAdd;