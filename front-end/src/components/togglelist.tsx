import React, { useState } from "react";
import Switch from "./switch"; // Import switch của bạn
import styles from "./ToggleList.module.css";
import bulbIcon from "../assets/bulb.png";
import curtainIcon from "../assets/curtain.png";
import windowIcon from "../assets/window.png";
interface ToggleItem {
  id: number;
  icon: string;
  label: string;
  state: boolean;
}

const initialItems: ToggleItem[] = [
  { id: 1, icon: "../assets/bulb.png", label: "Đèn phòng", state: false },
  { id: 2, icon: "../assets/curtain.png", label: "Rèm cửa", state: false },
  { id: 3, icon: "../assets/window.png", label: "Cửa sổ", state: false },
];
const iconMap: { [key: string]: string } = {
    "Đèn phòng": bulbIcon,
    "Rèm cửa": curtainIcon,
    "Cửa sổ": windowIcon,
};

const updatedItems = initialItems.map((item) => ({
    ...item,
    icon: iconMap[item.label] || item.icon,
}));

const ToggleList: React.FC = () => {
    const [items, setItems] = useState<ToggleItem[]>(updatedItems);


  const handleToggle = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, state: !item.state } : item
      )
    );
  };

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <img src={item.icon} alt={item.label} className={styles.icon} />
          <span className={styles.label}>{item.label}</span>
          <div className={styles.switch}>
          <Switch checked={item.state} onChange={() => handleToggle(item.id)} id={`switch-${item.id}`} /></div>
        </div>
      ))}
    </div>
  );
};

export default ToggleList;
