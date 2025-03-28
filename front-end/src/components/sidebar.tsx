import React, { useState } from 'react';
import { FaHome, FaCircle, FaCog, FaBars } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";
import styles from './sidebar.module.css';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isLogin: boolean;
  userName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isLogin, userName = 'User' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
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
            <div className={styles.iconWrapper}>
              <div className={styles.icon1}>
                <FaCog size={24} />
              </div>
              <span className={styles.label}>Cài đặt</span>
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
