import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import '../assets/styles/preprofile.css';

const PreProfile = ({ menuVisible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className={`feature_logout ${menuVisible ? 'show' : ''}`}>
      <div className="pre-profile">
        <p className="pre-profile-name">{currentUser?.fullName}</p>
        <button className="logout_button" onClick={handleLogout}>
          Thoát
        </button>
        <button className="logout_button" onClick={() => navigate('/password')}>
          Đổi Mật khẩu
        </button>
        <button className="logout_button" onClick={() => navigate('/profile')}>
          Sửa thông tin cá nhân
        </button>
      </div>
    </div>
  );
};

export default PreProfile;