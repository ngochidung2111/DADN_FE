import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell
} from 'recharts';
import styles from './homepage.module.css';
import Sidebar from '../components/sidebar';
import Alert from '../components/alert';
// Dữ liệu mẫu cho biểu đồ (giả sử giá trị giống với quality)
const data = [
    { date: '3/1', quality: 40 },
    { date: '3/2', quality: 60 },
    { date: '3/3', quality: 50 },
    { date: '3/4', quality: 100 },
    { date: '3/5', quality: 30 },
    { date: '3/6', quality: 40 },
    { date: '3/7', quality: 60 },
    { date: '3/8', quality: 50 },
    { date: '3/9', quality: 80 },
    { date: '3/10', quality: 30 },
    { date: '3/11', quality: 40 },
    { date: '3/12', quality: 60 },
    { date: '3/13', quality: 50 },
    { date: '3/14', quality: 80 },
    { date: '3/15', quality: 30 },
    { date: '3/16', quality: 100 },
    { date: '3/17', quality: 30 },
    { date: '3/18', quality: 40 },
    { date: '3/19', quality: 60 },
    { date: '3/20', quality: 50 },

];

// Hàm trả về màu dựa trên giá trị của tiêu chí (giống quality)
const getColorByValue = (value: number) => {
    if (value < 40) {
        return '#63B15E'; // xanh lá (Tốt)
    } else if (value < 70) {
        return '#FBA669'; // cam (Trung bình)
    } else {
        return '#F57F7F'; // đỏ (Kém)
    }
};

// Danh sách tiêu chí
const criteria = [
    { label: 'NHIỆT ĐỘ', key: 'quality' },
    { label: 'ĐỘ ẨM', key: 'quality' },
    { label: 'CƯỜNG ĐỘ ÁNH SÁNG', key: 'quality' },
    { label: 'CO2', key: 'quality' },
];

// Component legend tùy chỉnh gồm các ô màu và chú thích
const CustomizedLegend: React.FC = () => {
    return (
        <div className={styles.customLegendContainer}>
            <Sidebar />
            <div className={styles.customLegend}>
                <span>
                    <span className={styles.legendColorBox} style={{ backgroundColor: '#63B15E' }}></span>
                    TỐT
                </span>
                <span>
                    <span className={styles.legendColorBox} style={{ backgroundColor: '#FBA669' }}></span>
                    TRUNG BÌNH
                </span>
                <span>
                    <span className={styles.legendColorBox} style={{ backgroundColor: '#F57F7F' }}></span>
                    KÉM
                </span>
            </div>
        </div>
    );
};


const Homepage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedCriterion, setSelectedCriterion] = useState(criteria[0]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const selectedDataKey = selectedCriterion.key;
    const displayedData = data.slice(currentIndex, currentIndex + 7);

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 7);
        }
    };

    const goToNext = () => {
        if (currentIndex + 7 < data.length) {
            setCurrentIndex(currentIndex + 7);
        }
    };

    // Function to handle when a criterion is clicked
    const handleCriterionClick = (criterion: any) => {
        setSelectedCriterion(criterion);
    };

    return (
        <div className={styles.mainContent}>
            {/* Các chỉ số (metrics) */}
            <Alert type='temperature' value={80} message='Phát hiện nhiệt độ phòng cao bất thương!!!Tự động khởi động hệ thống chữa cháy khẩn cấp' />
            <div className={styles.metricsContainer}>
                {criteria.map((criterion, index) => (
                    <div
                        key={index}
                        className={`${styles.metricCard} ${selectedCriterion.label === criterion.label ? styles.selected : ''}`}
                        onClick={() => handleCriterionClick(criterion)}
                    >
                        <div className={styles.metricIcon}>
                            {/* Chọn icon tương ứng cho mỗi tiêu chí */}
                            {criterion.label === 'NHIỆT ĐỘ' && '🌡️'}
                            {criterion.label === 'ĐỘ ẨM' && '💧'}
                            {criterion.label === 'CƯỜNG ĐỘ ÁNH SÁNG' && '☀️'}
                            {criterion.label === 'CO2' && '🌱'}
                        </div>
                        <div className={styles.metricInfo}>
                            <p>{criterion.label}</p>
                            <h2>{criterion.label === 'NHIỆT ĐỘ' ? '37°C' :
                                criterion.label === 'ĐỘ ẨM' ? '37%' :
                                    criterion.label === 'CƯỜNG ĐỘ ÁNH SÁNG' ? '37cd' : '37%'}</h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* Biểu đồ */}
            <div className={styles.chartContainer}>
                {/* Tiêu đề biểu đồ cập nhật theo tiêu chí được chọn */}
                <h3 className={styles.chartName}>THỐNG KÊ {selectedCriterion.label} GẦN ĐÂY</h3>
                <div className={styles.chartWrapper}>
                    <button className={styles.detailButton} onClick={goToPrevious} disabled={currentIndex === 0}>{"<"}</button>

                    {/* Bọc BarChart trong container có nền màu */}
                    <BarChart
                        width={940}
                        height={350}
                        data={displayedData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend content={<CustomizedLegend />} />
                        <Bar dataKey={selectedDataKey} name={selectedCriterion.label} radius={[10, 10, 10, 10]} barSize={20}>
                            {displayedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getColorByValue(entry[selectedDataKey])} />
                            ))}
                            {displayedData.map((entry, index) => {
                                const baseColor = getColorByValue(entry[selectedDataKey]);
                                const fillColor = activeIndex === index ? "#000" : baseColor;
                                return (
                                    <Cell
                                        key={`cell-hover-${index}`}
                                        fill={fillColor}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        onMouseLeave={() => setActiveIndex(null)}
                                    />
                                );
                            })}
                        </Bar>
                    </BarChart>

                    <button className={styles.detailButton} onClick={goToNext} disabled={currentIndex + 7 >= data.length}>{">"}</button>
                </div>

            </div>

        </div>
    );
};

export default Homepage;
