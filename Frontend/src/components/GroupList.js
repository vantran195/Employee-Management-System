const GroupList = (props) => {
    return (
        <>
            <div className="filter-title">Group</div>
            <select name="departmentId" id="type" className="filter-select" onChange={props.handleChangeFilter}>
                <option value="">All</option>
                {props.departments.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}

            </select>
        </>
    );
}
export default GroupList;