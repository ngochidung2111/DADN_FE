import React, { useState, useEffect } from 'react';
import { FaHome, FaCircle, FaCog, FaBars } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";
import styles from './sidebar.module.css';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isLogin: boolean;
  userName?: string;
}

interface Device {
  id: number;
  name: string;
  feedName: string;
  state: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isLogin, userName = 'User' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);

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


  useEffect(() => {
    if (activeForm === 'devicesList') {
      const fetchDevicesAndStates = async () => {
        setLoading(true);
        try {
          // 1) Lấy danh sách devices
          const resAll = await fetch('https://iot-project-y7dx.onrender.com/api/v1/device/get-all');
          const jsonAll = await resAll.json();
          const list: Omit<Device, 'state'>[] = jsonAll.data;

          // 2) Với mỗi device, gọi API lấy state
          const withStates = await Promise.all(
            list.map(async dev => {
              const resState = await fetch(
                `https://iot-project-y7dx.onrender.com/api/v1/device/state/${dev.feedName}`
              );
              const jsonState = await resState.json();
              const rawState = jsonState.data;

              // map số sang chuỗi
              let stateValue: string;
              if (rawState === 1) stateValue = 'Online';
              else if (rawState === 0) stateValue = 'Offline';
              else stateValue = String(rawState);
              return { ...dev, state: stateValue };
            })
          );

          setDevices(withStates);
        } catch (err) {
          console.error('Fetch devices error:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchDevicesAndStates();
    }
  }, [activeForm]);



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
                    <div
                      className={styles.dropdownItem}
                      onClick={() => showForm('devicesList')}
                    >
                      Danh sách thiết bị
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
          <div className={styles.overlay} onClick={closeForm} />
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
                </form>
              </div>
            )}
            {activeForm === 'addSensor' && (
              <div className={styles.formContent}>
                <h2>Thêm cảm biến</h2>
                <form>
                  <div className={styles.formGroup}>
                    <label>Sensor Type</label>
                    <input type="text" placeholder="Nhập loại cảm biến" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Feedname</label>
                    <input type="text" placeholder="Nhập Feedname" />
                  </div>
                  <button type="submit">Lưu</button>
                </form>
              </div>
            )}
            {activeForm === 'devicesList' && (
              <div className={styles.formContent}>
                <h2>Danh sách thiết bị</h2>

                {loading ? (
                  <p>Đang tải...</p>
                ) : (
                  <table className={styles.deviceTable}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>FeedName</th>
                        <th>State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devices.map((d, idx) => (
                        <tr key={d.id}>
                          <td>{d.id}</td>
                          <td>{d.name}</td>
                          <td>{d.feedName}</td>
                          <td>{d.state}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <form>
                  <button type="button" onClick={closeForm}>
                    Xong
                  </button>
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
