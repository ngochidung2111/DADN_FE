import React, { useState } from 'react';
import { FaHome, FaCircle, FaCog, FaBars } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
// import Person from '../assets/person.png';

interface SidebarProps {
  isLogin: boolean;
  userName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isLogin, userName = 'User' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [activeForm, setActiveForm] = useState<string | null>(null);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const showForm = (formType: string) => {
    setActiveForm(formType);
    // Đóng dropdown sau khi chọn form
    setIsSettingsOpen(true);
  };

  // Hàm đóng form
  const closeForm = () => {
    setActiveForm(null);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  const navigate = useNavigate();


  return (
    <div>
      <div className={`${styles.sidebar} ${(isOpen || isSettingsOpen) ? styles.open : ''}`}>
        <div className={styles.icon} onClick={toggleSidebar}>
          <FaBars size={24} />
        </div>

        <div className={styles.iconprimary}>
          <div className={styles.iconWrapper} onClick={() => navigate('/')}>
            <div className={styles.icon1}>
              <FaHome size={24} />
            </div>
            <span className={styles.label}>Trang chủ</span>
          </div>
          {isLogin && (
            <>
              <div className={styles.iconWrapper} onClick={() => navigate('/operations')}>
                <div className={styles.icon1}>
                  <IoPersonSharp size={24} />
                </div>
                <span className={styles.label}>Trợ năng</span>
              </div>
              {/* Wrapper bao quanh nút "Cài đặt" và dropdown options */}
              <div
                className={styles.settingsWrapper}
                onMouseEnter={() => setIsSettingsOpen(true)}
                onMouseLeave={() => setIsSettingsOpen(true)}
                onClick={() => setIsSettingsOpen(true)} // Khi click, hiển thị dropdown
              >
                <div className={styles.iconWrapper} onClick={toggleSettings}>
                  <div className={styles.icon1}>
                    <FaCog size={24} />
                  </div>
                  <span className={styles.label}>Cài đặt</span>
                </div>
                {/* Dropdown các option của Cài đặt */}
                {isSettingsOpen && (
                  <div className={styles.settingsDropdown}>
                    <div
                      className={styles.dropdownItem}
                      onClick={() => showForm('accountConfig')}
                    >
                      Cấu hình tài khoản
                    </div>
                    <div
                      className={styles.dropdownItem}
                      onClick={() => showForm('addDevice')}
                    >
                      Thêm thiết bị
                    </div>
                    <div
                      className={styles.dropdownItem}
                      onClick={() => showForm('addSensor')}
                    >
                      Thêm cảm biến
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        {isLogin && (
          <div className={styles.iconperson}>
            <FaCircle size={24} />
            <span className={styles.labelperson}>{userName}</span>
          </div>
        )}
      </div>
      {/* Phần hiển thị form khi người dùng chọn option */}
      {/* Render overlay và form khi activeForm khác null */}
      {activeForm && (
        <>
          {/* Lớp phủ overlay */}
          <div className={styles.overlay} onClick={closeForm}></div>
          {/* Form hiển thị */}
          <div className={styles.formContainer}>
            {activeForm === 'accountConfig' && (
              <div className={styles.formContent}>
                <h2>Cấu hình tài khoản</h2>
                <form>
                  <div className={styles.formGroup}>
                    <label>Username</label>
                    <input type="text" placeholder="Nhập username" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Userkey</label>
                    <input type="text" placeholder="Nhập userkey" />
                  </div>
                  <button type="submit">Lưu</button>
                  <button type="button" onClick={closeForm}>Đóng</button>
                </form>
              </div>
            )}
            {activeForm === 'addDevice' && (
              <div className={styles.formContent}>
                <h2>Thêm thiết bị</h2>
                <form>
                  <div className={styles.formGroup}>
                    <label>Feedname</label>
                    <input type="text" placeholder="Nhập feedname" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Name</label>
                    <input type="text" placeholder="Nhập name" />
                  </div>
                  <button type="submit">Lưu</button>
                  <button type="button" onClick={closeForm}>Đóng</button>
                </form>
              </div>
            )}
            {activeForm === 'addSensor' && (
              <div className={styles.formContent}>
                <h2>Thêm cảm biến</h2>
                <form>
                  <div className={styles.formGroup}>
                    <label>Trường dữ liệu</label>
                    <input type="text" placeholder="Nhập dữ liệu cảm biến" />
                  </div>
                  <button type="submit">Lưu</button>
                  <button type="button" onClick={closeForm}>Đóng</button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </div >
  );
};

export default Sidebar;