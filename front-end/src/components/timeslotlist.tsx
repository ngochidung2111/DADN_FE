import React, { useState } from 'react';
import styles from './TimeSlotList.module.css';
import DeleteButton from './deletebutton';

type TimeSlotProps = {
  startTime?: string;
  endTime?: string;
  days?: string;
  devices?: string[];
  onDelete?: () => void;  // Now optional, so empty rows work
};

const TimeSlot: React.FC<TimeSlotProps> = ({
  startTime = '',
  endTime = '',
  days = '',
  devices = [],
  
}) => {
  return (
    <div className={styles.timeSlot}>
      <div className={styles.timeContainer}>
        <div className={styles.timeLeft}>{startTime}</div>
        <div className={styles.timeRight}>{endTime}</div>
      </div>
      <div className={styles.detailsAndDevices}>
        <div className={styles.details}>{days}</div>
        <div className={styles.devices}>
          {devices.map((device, index) => (
            <span key={index}>
              {device}
              {index < devices.length - 1 && ' | '}
            </span>
          ))}
        </div>
      </div>
      
    </div>
  );
};

const TimeSlotList: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState([
    {
      startTime: '05:30',
      endTime: '06:00',
      days: 'T2, T4, T6, CN',
      devices: ['Đèn', 'Cửa', 'Rèm'],
    },
    {
      startTime: '05:30',
      endTime: '06:00',
      days: 'T2, T4, T6, CN',
      devices: ['Đèn', 'Cửa', 'Rèm'],
    },
    {
      startTime: '05:30',
      endTime: '06:00',
      days: 'T2, T4, T6, CN',
      devices: ['Đèn', 'Cửa', 'Rèm'],
    },
  ]);

  const handleDelete = (index: number) => {
    const newTimeSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(newTimeSlots);
  };

  // Always render 4 rows
  const totalRows = 6;
  const rows = Array.from({ length: totalRows }).map((_, idx) => {
    if (idx < timeSlots.length) {
      const slot = timeSlots[idx];
      return (
        <div key={idx} className={styles.timeSlotWithDelete}>
          <TimeSlot
            startTime={slot.startTime}
            endTime={slot.endTime}
            days={slot.days}
            devices={slot.devices}
            onDelete={() => handleDelete(idx)}
          />
          <div className={styles.deleteButtonContainer}>
            <DeleteButton onClick={() => handleDelete(idx)} />
          </div>
        </div>
      );
    } else {
      // Render an empty placeholder row and apply an extra CSS class for styling
      return (
        <div key={idx} className={`${styles.timeSlotWithDelete} ${styles.emptyTimeSlot}`}>
          <TimeSlot />
        </div>
      );
    }
  });

  return <div className={styles.wrapper}>{rows}</div>;
};

export default TimeSlotList;