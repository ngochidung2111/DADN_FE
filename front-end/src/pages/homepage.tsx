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
import './homepage.css';

// Dữ liệu mẫu cho biểu đồ
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

// Hàm trả về màu dựa trên giá trị quality
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
        <div className="custom-legend-container">
            <div className="custom-legend">
                <span>
                    <span className="legend-color-box" style={{ backgroundColor: '#63B15E' }}></span>
                    TỐT
                </span>
                <span>
                    <span className="legend-color-box" style={{ backgroundColor: '#FBA669' }}></span>
                    TRUNG BÌNH
                </span>
                <span>
                    <span className="legend-color-box" style={{ backgroundColor: '#F57F7F' }}></span>
                    KÉM
                </span>
            </div>
        </div>
    );
};

const Homepage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="main-content">
            {/* Các chỉ số (metrics) */}
            <div className="metrics-container">
                <div className="metric-card">
                    <div className="metric-icon">🌡</div>
                    <div className="metric-info">
                        <p>NHIỆT ĐỘ</p>
                        <h2>37°C</h2>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-icon">💧</div>
                    <div className="metric-info">
                        <p>ĐỘ ẨM</p>
                        <h2>37%</h2>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-icon">☀️</div>
                    <div className="metric-info">
                        <p>CƯỜNG ĐỘ </p>
                        <p>ÁNH SÁNG</p>
                        <h2>37cd</h2>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-icon">🌱</div>
                    <div className="metric-info">
                        <p>CO2</p>
                        <h2>37%</h2>
                    </div>
                </div>
            </div>

            {/* Biểu đồ */}
            <div className="chart-container">
                <h3>THỐNG KÊ CHẤT LƯỢNG KHÔNG KHÍ GẦN ĐÂY</h3>
                {/* Bọc BarChart trong container có nền màu */}
                <div className="chart-wrapper">
                    <BarChart
                        width={940}
                        height={400}
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend content={<CustomizedLegend />} />
                        <Bar dataKey="quality" name="Chất lượng" radius={[10, 10, 10, 10]} barSize={20}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getColorByValue(entry.quality)} />
                            ))}
                            {data.map((entry, index) => {
                                const baseColor = getColorByValue(entry.quality);
                                // Ví dụ: khi hover, ta thay đổi màu thành phiên bản đậm hơn (ở đây dùng ví dụ màu đen, bạn có thể thay đổi theo ý)
                                const fillColor = activeIndex === index ? "#000" : baseColor;
                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={fillColor}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        onMouseLeave={() => setActiveIndex(null)}
                                    />
                                );
                            })}
                        </Bar>
                    </BarChart>
                </div>
                <div className="button-container">
                    <button className="detail-button">Xem chi tiết</button>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
