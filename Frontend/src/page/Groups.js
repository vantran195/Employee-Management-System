import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import DepartmentApi from "../api/groupApi";
import "../assets/styles/user/department.css";
import Feature from "../components/Feature";
import GroupFilter from '../components/GroupFilter';
import GroupTable from '../components/GroupTable';
import Paging from "../components/Paging";
import GroupAdd from './GroupsAdd';
import GroupModify from './GroupsModify';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// Kích hoạt plugin UTC
dayjs.extend(utc);

const Groups = () => {

    const DISPLAY_NONE = 0;
    const DISPLAY_ADD = 1;
    const DISPLAY_MODIFY = 2;
    const [dataDepartments, setDataDepartments] = useState([]);
    const [departmentId, setDepartmentId] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusDisplay, setStatusDisplay] = useState(DISPLAY_NONE);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("totalMember,desc");
    const [filters, setFilters] = useState({
        minCreateDate: null,
        maxCreateDate: null,
    });
    const [loading, setLoading] = useState(false);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);


    const sort = [
        { name: "Name A-Z", value: "name,asc" },
        { name: "Name Z-A", value: "name,desc" }
    ]
    const fetchDataListDepartmentWithPaging = async (pageNumber, sortBy, searchTerm, filters) => {
        setLoading(true);
        try {
            const response = await DepartmentApi.getDepartmentsPaging({
                pageNumber,
                size: 5,
                sort: sortBy,
                name: searchTerm,
                ...filters
            });

            if (response.data && response.data.content) {
                setDataDepartments(response.data.content);
                setTotalPages(response.data.totalPages);
            } else {
                console.error("Invalid data:", response.data);
                alert("Can not get departments. Please try again");
            }
        } catch (error) {
            console.error("An error occurred while get groups", error);
            if (error.response.status === 401) {
                setLoading(false)
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataListDepartmentWithPaging(page, sortBy, debouncedSearchTerm, filters);
    }, [page, sortBy, debouncedSearchTerm, filters]);

    const deleteDepartment = async (departmentId) => {
        try {
            const response = await DepartmentApi.deleteDepartment(departmentId)
            console.log(response);

            if (response.status === 200) {
                alert("Deleted successfully!");
                fetchDataListDepartmentWithPaging(page, sortBy, debouncedSearchTerm, filters);
            } else {
                alert("Delete failed!");
            }
        } catch (error) {
            console.error("Error when deleting department: ", error);
            alert("Group deletion failed, please try again later.");
        }
    }

    const handleDeleteDepartment = async () => {
        if (!departmentId) {
            alert("You have not selected a group to delete.");
            return;
        } else {
            if (window.confirm("Are you sure you want to delete?")) {
                deleteDepartment(departmentId);
            }
        }
    };

    const handleChangeDisplay = (value) => setStatusDisplay(value);

    const handleChangeFilter = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        })
    }


    const handleModify = () => {
        if (!departmentId) {
            alert("You must select an account to modify");
        } else if (departmentId) {
            setStatusDisplay(DISPLAY_MODIFY);
        } else {
            alert("You can only select one account for modification.");
        }
    };

    return (
        <>
            {statusDisplay === DISPLAY_ADD && (
                <GroupAdd
                    setDisplayStatus={handleChangeDisplay}
                    page={page}
                    sortBy={sortBy}
                    refreshDepartmentList={() => fetchDataListDepartmentWithPaging(page, sortBy, debouncedSearchTerm, filters)}
                />
            )}
            {statusDisplay === DISPLAY_MODIFY && (
                <GroupModify
                    setDisplayStatus={handleChangeDisplay}
                    page={page}
                    sortBy={sortBy}
                    refreshDepartmentList={() => fetchDataListDepartmentWithPaging(page, sortBy, debouncedSearchTerm, filters)}
                    departmentId={departmentId}
                />
            )}
            <div className="department">
                <h1 className="department-title">Danh sách nhóm</h1>
                <GroupFilter
                    filters={filters}
                    handleChangeFilter={handleChangeFilter}
                />

                <Feature
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setDisplay={setStatusDisplay}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    handleModify={handleModify}
                    handleDelete={handleDeleteDepartment}
                    sort={sort}
                />
                <GroupTable
                    dataDepartments={dataDepartments}
                    loading={loading}
                    handleChangeSelectDepartmentId={(e) => setDepartmentId(e.target.value)}
                />

                <Paging
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            </div >
        </>
    );
};

export default Groups;
