import { useState, forwardRef } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.userImage, ...props }, ref) => {
    const [fallback, setFallback] = useState({});

    const handleError = () => {
        setFallback(customFallback);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={src || fallback}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;
