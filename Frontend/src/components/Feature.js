
import SortBy from "./SortBy";

const DISPLAY_ADD = 1;

const Feature = ({ searchTerm, setSearchTerm, setDisplay, sortBy, setSortBy, handleModify, handleDelete, sort}) => {

    return (
        <div className="account-feature">
            {/* chức năng tìm kiếm */}
            <div className="feature-search">
                <input
                    className="search-text"
                    type="text"
                    placeholder="Enter username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
            
            {/* chức năng thêm, sửa, xóa */}
            <div className="feature-crud">
                <button className="feature-create"
                    onClick={() => {
                        setDisplay(DISPLAY_ADD);
                    }}>
                   Thêm
                </button>
                <button className="feature-update" onClick={handleModify}>
                     Sửa
                </button>
                <button className="feature-delete" onClick={handleDelete}>
                     Xóa
                </button>
            </div>
            <SortBy sort={sort} sortBy={sortBy} setSortBy={setSortBy}
            />
        </div>
    );
}
export default Feature;