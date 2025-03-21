import React, { useState, useEffect } from 'react';
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

// Dữ liệu mặc định ban đầu (có thể thay đổi khi nhận dữ liệu từ WebSocket)
const initialData = [
    { date: '3/1', quality: 40 },
    { date: '3/1', quality: 70 },
    { date: '3/1', quality: 20 },
    { date: '3/1', quality: 100 },
    { date: '3/1', quality: 30 },
    { date: '3/1', quality: 40 },
    { date: '3/1', quality: 60 },
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
    // State chứa dữ liệu biểu đồ
    const [data, setData] = useState(initialData);

    // State chứa dữ liệu cảm biến nhận từ websocket
    const [sensorData, setSensorData] = useState({
        temperature: 0,
        humidity: 0,
        light: 0,
        airQuality: 0,
    });

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Cập nhật tiêu chí với key tương ứng với dữ liệu cảm biến
    const criteria = [
        { label: 'NHIỆT ĐỘ', key: 'temperature' },
        { label: 'ĐỘ ẨM', key: 'humidity' },
        { label: 'CƯỜNG ĐỘ ÁNH SÁNG', key: 'light' },
        { label: 'CO2', key: 'airQuality' },
    ];

    const [selectedCriterion, setSelectedCriterion] = useState(criteria[0]);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Kết nối WebSocket để nhận dữ liệu cảm biến thời gian thực
    useEffect(() => {
        const ws = new WebSocket('wss://iot-project-y7dx.onrender.com/ws/data');

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            // Dữ liệu nhận về dạng JSON: {"temperature":3.14,"humidity":60.3,"light":70,"airQuality":0.0}
            const sensor = JSON.parse(event.data);
            console.log('Received sensor data:', sensor);
            setSensorData(sensor);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);


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
                            <h2>
                                {criterion.label === 'NHIỆT ĐỘ'
                                    ? `${sensorData.temperature}°C`
                                    : criterion.label === 'ĐỘ ẨM'
                                        ? `${sensorData.humidity}%`
                                        : criterion.label === 'CƯỜNG ĐỘ ÁNH SÁNG'
                                            ? `${sensorData.light}cd`
                                            : criterion.label === 'CO2'
                                                ? `${sensorData.airQuality}%`
                                                : ''}
                            </h2>
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
