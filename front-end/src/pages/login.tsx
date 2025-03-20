import React, { useState } from 'react';
import Home from '../assets/home.svg';
import styles from './login.module.css';

const Login = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý submit tại đây
        console.log({ name, phone, password });
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={Home} alt="Smart Home" className={styles.homeImage} />
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Xác nhận
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
