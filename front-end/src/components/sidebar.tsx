// filepath: /d:/DADN/FRONTEND/front-end/src/components/sidebar.tsx
import React, { useState } from 'react';
import { FaHome, FaCircle, FaCog, FaBars } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";
import styles from './Sidebar.module.css';
import Person from '../assets/person.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.icon} onClick={toggleSidebar}>
        <FaBars size={24} />
      </div>
      <div className={styles.iconprimary}>
        <div className={styles.iconWrapper}>
          <div className={styles.icon1}>
            <FaHome size={24} />
          </div>
          <span className={styles.label}>Trang chủ</span>
        </div>
        <div className={styles.iconWrapper}>
          <div className={styles.icon1}>
            <IoPersonSharp size={24} />
          </div>
          <span className={styles.label}>Trợ năng </span>
        </div>
        <div className={styles.iconWrapper}>
          <div className={styles.icon1}>
            <FaCog size={24} />
          </div>
          <span className={styles.label}>Cài đặt</span>
        </div>
        <div className={styles.iconWrapper}>
          
          {/* Nếu không có label cho icon này, bạn có thể bỏ qua */}
        </div>
      </div>
      <div className={styles.iconperson}>
            <FaCircle size={24} />
      </div>
    </div>
  );
};

export default Sidebar;