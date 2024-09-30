import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './DarkModeToggle.module.scss';

const cx = classNames.bind(styles);

export const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.body.classList.add(cx('dark'));
        } else {
            document.body.classList.remove(cx('dark'));
        }
    }, [isDark]);

    return (
        <div>
            <input
                className={cx('input')}
                type="checkbox"
                checked={isDark}
                onChange={(e) => setIsDark(e.target.checked)}
                id="input"
            />
            <label className={cx('switch')} htmlFor="input"></label>
        </div>
    );
};
