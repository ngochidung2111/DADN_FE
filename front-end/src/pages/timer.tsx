import React from 'react';
import Tabs from '../components/tab';
import ToggleList from '../components/togglelist';
import TimeSlotList from '../components/timeslotlist';
import Sidebar from '../components/sidebar';
import TimePicker from '../components/timepicker';
import styles from './timer.module.css';

const TimerPage: React.FC = () => {
    return (
        <div className={styles.timerPage}>
            <Sidebar isLogin={true} />
            <div className={styles.mainContent}>
                <div className={styles.timerSection}>
                    <div className={styles.leftSection}>
                    <div className={styles.timeslotListHeader}>Danh sách hẹn giờ</div>
                        <div className={styles.timeslot}><TimeSlotList /></div>
                    </div>
                    <div className={styles.rightSection}>
                        <div className={styles.timePickerWrapper}>
                            <TimePicker /></div>
                        <div className={styles.tabWrapper}>
                            <div className={styles.labelText}>Lặp lại</div>
                            <div className={styles.resizableTabs}>
                                <Tabs />
                            </div>
                        </div>
                        <div className={styles.toggleList}>
                            <ToggleList />
                        </div>
                        <div className={styles.confirmButtonWrapper}>
                            <button className={styles.confirmButton}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimerPage;