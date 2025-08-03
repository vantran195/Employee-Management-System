import axiosClient from "../configs/axiosClient";
const url = "/api/v1/accounts";

const register = (account) => {
    return axiosClient.post(`${url}/register`, account);
};

const getAllPaging = (params) => {
    return axiosClient.get(`${url}/page`, { params });
};

const getRoles = () => {
    return axiosClient.get(`${url}/roles`);
};

const createAccount = (data) => {
    return axiosClient.post(`${url}`, data);
};

const deleteAccount = (ids) => {
    return axiosClient.delete(`${url}`, {
        data: { ids },
    });
};

const getListAccountById = (ids) => {
    return axiosClient.get(`${url}/ids`, {
        params: { ids: ids.join(",") },
    });
};

const updateAccount = (data) => {
    return axiosClient.put(`${url}`, data);
};

const getAllAccountsNoDepartment = () => {
    return axiosClient.get(`${url}`);
};

const resetPassword = (email) => {
    return axiosClient.post(`${url}/resetPassword`, null, {
        params: { email },
    });
};

const validateToken = (token) => {
    return axiosClient.get(`${url}/change-password`, {
        params: { token },
    });
};

const changePassword = (data) => {
    return axiosClient.post(`${url}/savePassword`, data);
};

const registerAccount = (data) => {
    return axiosClient.post(`${url}/register`, data);
};

const updatePassword = (userName, data) => {
    return axiosClient.put(`${url}/update-password/username/${userName}`, data);
};

const activeAcount = (token) => {
    return axiosClient.post(`${url}/active-account`, null, {
        params: { token },
    });
};

const findAccountById = (id) => {
    return axiosClient.get(`${url}/id/${id}`);
};

const editProfile = (username, formData) => {
    return axiosClient.post(`${url}/edit-profile/${username}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

const AccountApi = {
    register,
    getAllPaging,
    getRoles,
    createAccount,
    deleteAccount,
    getListAccountById,
    updateAccount,
    getAllAccountsNoDepartment,
    resetPassword,
    validateToken,
    changePassword,
    registerAccount,
    updatePassword,
    activeAcount,
    findAccountById,
    editProfile,
};

export default AccountApi;