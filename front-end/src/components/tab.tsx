import React, { useState } from "react";
import styles from "./tabs.module.css";

const Tabs: React.FC = () => {
  const [selectedTabs, setSelectedTabs] = useState<string[]>(["T2"]);

  const tabs = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  const toggleTab = (tab: string) => {
    setSelectedTabs((prevSelected) =>
      prevSelected.includes(tab)
        ? prevSelected.filter((t) => t !== tab) // Bỏ chọn nếu đã được chọn
        : [...prevSelected, tab] // Thêm vào danh sách nếu chưa chọn
    );
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <React.Fragment key={tab}>
          <div
            className={`${styles.tab} ${
              selectedTabs.includes(tab) ? styles.selected : styles.unselected
            }`}
            onClick={() => toggleTab(tab)}
          >
            {tab}
          </div>
          {index < tabs.length - 1 && <div className={styles.separator}></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Tabs;
