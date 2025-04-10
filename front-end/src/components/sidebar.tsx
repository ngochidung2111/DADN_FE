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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsSettingsOpen(false);
  };


  return (
    <div className={`${styles.sidebar} ${(isOpen || isSettingsOpen) ? styles.open : ''}`}>
      <div className={styles.icon} onClick={toggleSidebar}>
        <FaBars size={24} />
      </div>
      <div className={styles.iconprimary}>
        <div className={styles.iconWrapper} onClick={() => handleNavigate('/')}>
          <div className={styles.icon1}>
            <FaHome size={24} />
          </div>
          <span className={styles.label}>Trang chủ</span>
        </div>
        {isLogin && (
          <>
            <div className={styles.iconWrapper} onClick={() => handleNavigate('/operations')}>
              <div className={styles.icon1}>
                <IoPersonSharp size={24} />
              </div>
              <span className={styles.label}>Trợ năng</span>
            </div>
            {/* Wrapper bao quanh nút "Cài đặt" và dropdown options */}
            <div
              className={styles.settingsWrapper}
              onMouseEnter={() => setIsSettingsOpen(true)}
              onMouseLeave={() => setIsSettingsOpen(false)}
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
                    onClick={() => handleNavigate('/account-config')}
                  >
                    Cấu hình tài khoản
                  </div>
                  <div
                    className={styles.dropdownItem}
                    onClick={() => handleNavigate('/add-device')}
                  >
                    Thêm thiết bị
                  </div>
                  <div
                    className={styles.dropdownItem}
                    onClick={() => handleNavigate('/add-sensor')}
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
  );
};

export default Sidebar;