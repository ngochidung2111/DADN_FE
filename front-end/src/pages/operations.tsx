import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Nếu bạn dùng react-router-dom
import lightIcon from '../assets/light.png';
import curtainIcon from '../assets/curtain.png';
import windowIcon from '../assets/window.png';
import clockIcon from '../assets/clock.png';
import styles from './operations.module.css'; // Import file CSS nếu tách riêng
// import { AlignCenter } from 'lucide-react';

interface ToggleSwitchProps {
    label: React.ReactNode; // Sửa từ string sang React.ReactNode để hỗ trợ JSX
    checked: boolean;
    onChange: (checked: boolean) => void;
}

// Component ToggleSwitch để tạo nút bật/tắt
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange }) => {
    return (
        <div className={styles['toggle-container']}>
            <span>{label}</span>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
        </div>
    );
};

const Operation: React.FC = () => {
    // State cho các nút bật/tắt
    const [denPhong, setDenPhong] = useState(false);
    const [remCua, setRemCua] = useState(false);
    const [cuaSo, setCuaSo] = useState(false);

    // Nếu dùng react-router, ta có thể điều hướng sang trang khác
    // const navigate = useNavigate();

    // Xử lý khi bấm vào nút Cài đặt hẹn giờ
    const handleHenGioClick = () => {
        // Ví dụ: điều hướng sang trang hẹn giờ (nếu đã có route "/hen-gio")
        // navigate('/hen-gio');

        // Hoặc tạm thời chỉ in ra console
        console.log("Chuyển qua giao diện cài đặt hẹn giờ (chưa hiện thực)");
    };

    return (
        <div className={styles['container-operation']}>
            {/* Bên trái: Thông tin Chất lượng không khí */}
            <div className={styles['left-panel']}>
                <h2>Chất lượng</h2>
                <h2>không khí</h2>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.icon}>🌡️</div>
                        <div className={styles.info}>
                            <span>Nhiệt độ</span>
                            <span className={styles.value}>37°C</span>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.icon}>💧</div>
                        <div className={styles.info}>
                            <span>Độ ẩm</span>
                            <span className={styles.value}>37%</span>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.icon}>☀️</div>
                        <div className={styles.info}>
                            <span>Nhiệt độ</span>
                            <span className={styles.value}>37°C</span>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles['co2-icon']}>CO₂</div>
                        <div className={styles.info}>
                            <span>Nồng độ CO₂</span>
                            <span className={styles.value}>37</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bên phải: Trợ năng */}
            <div className={styles['right-panel']}>
                <h3>Trợ năng</h3>
                <ToggleSwitch
                    label={
                        <div className={styles['label-container']}>
                            <img
                                src={lightIcon}
                                alt="Light"
                                style={{ width: '50px', height: '50px', marginRight: '10px' }}
                            />
                            <span>Đèn phòng</span>
                        </div>
                    }
                    checked={denPhong}
                    onChange={setDenPhong}
                />
                <ToggleSwitch label={
                    <div className={styles['label-container']}>
                        <img
                            src={curtainIcon}
                            alt="Curtain"
                            style={{ width: '50px', height: '50px', marginRight: '10px' }}
                        />
                        <span>Rèm cửa</span>
                    </div>
                }
                    checked={remCua}
                    onChange={setRemCua}
                />
                <ToggleSwitch label={
                    <div className={styles['label-container']}>
                        <img
                            src={windowIcon}
                            alt="Window"
                            style={{ width: '50px', height: '50px', marginRight: '10px' }}
                        />
                        <span>Cửa sổ</span>
                    </div>
                }
                    checked={cuaSo}
                    onChange={setCuaSo}
                />

                {/* Nút Cài đặt hẹn giờ (dấu +) */}
                <div className={styles['hen-gio-container']}>
                    <div className={styles['label-container']}>
                        <img
                            src={clockIcon}
                            alt="Clock"
                            style={{ width: '50px', height: '50px', marginRight: '10px' }}
                        />
                        <span>Cài đặt hẹn giờ</span>
                    </div>
                    <button className={styles['hen-gio-button']} onClick={handleHenGioClick}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Operation;
