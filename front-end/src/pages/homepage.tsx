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
// Dữ liệu mẫu cho biểu đồ (giả sử giá trị giống với quality)
const data = [
    { date: '3/1', quality: 40 },
    { date: '3/2', quality: 60 },
    { date: '3/3', quality: 50 },
    { date: '3/4', quality: 100 },
    { date: '3/5', quality: 30 },
    { date: '3/1', quality: 40 },
    { date: '3/2', quality: 60 },
    { date: '3/3', quality: 50 },
    { date: '3/4', quality: 80 },
    { date: '3/5', quality: 30 },
    { date: '3/1', quality: 40 },
    { date: '3/2', quality: 60 },
    { date: '3/3', quality: 50 },
    { date: '3/4', quality: 80 },
    { date: '3/5', quality: 30 },
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
    // Khởi tạo tiêu chí được chọn, mặc định chọn tiêu chí đầu tiên
    const [selectedCriterion, setSelectedCriterion] = useState(criteria[0]);

    // Vì giá trị của các tiêu chí giả sử giống quality nên ta dùng key "quality"
    const selectedDataKey = selectedCriterion.key;

    return (
        <div className={styles.mainContent}>
            {/* Các chỉ số (metrics) */}
            <div className={styles.metricsContainer}>
                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>🌡</div>
                    <div className={styles.metricInfo}>
                        <p>NHIỆT ĐỘ</p>
                        <h2>37°C</h2>
                    </div>
                </div>
                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>💧</div>
                    <div className={styles.metricInfo}>
                        <p>ĐỘ ẨM</p>
                        <h2>37%</h2>
                    </div>
                </div>
                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>☀️</div>
                    <div className={styles.metricInfo}>
                        <p>CƯỜNG ĐỘ</p>
                        <p>ÁNH SÁNG</p>
                        <h2>37cd</h2>
                    </div>
                </div>
                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>🌱</div>
                    <div className={styles.metricInfo}>
                        <p>CO2</p>
                        <h2>37%</h2>
                    </div>
                </div>
            </div>

            {/* Biểu đồ */}
            <div className={styles.chartContainer}>
                {/* Phần lựa chọn tiêu chí */}
                <div className={styles.criteriaSelector}>
                    {criteria.map((criterion) => (
                        <button
                            key={criterion.label}
                            onClick={() => setSelectedCriterion(criterion)}
                            className={
                                selectedCriterion.label === criterion.label
                                    ? styles.selectedCriterion
                                    : styles.criterionButton
                            }
                        >
                            {criterion.label}
                        </button>
                    ))}
                </div>
                {/* Tiêu đề biểu đồ cập nhật theo tiêu chí được chọn */}
                <h3>THỐNG KÊ {selectedCriterion.label} GẦN ĐÂY</h3>
                {/* Bọc BarChart trong container có nền màu */}
                <div className={styles.chartWrapper}>
                    <BarChart
                        width={940}
                        height={350}
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend content={<CustomizedLegend />} />
                        <Bar dataKey={selectedDataKey} name={selectedCriterion.label} radius={[10, 10, 10, 10]} barSize={20}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getColorByValue(entry[selectedDataKey])} />
                            ))}
                            {data.map((entry, index) => {
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
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.detailButton}>Xem chi tiết</button>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
