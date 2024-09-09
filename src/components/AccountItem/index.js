import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/c1e04ca453189d9e40ddb5cca3e5b78c.jpeg?lk3s=a5d48078&nonce=31755&refresh_token=0187985dbcf0a3a55a74d051acd31857&x-expires=1726020000&x-signature=NOPJnm4Za4u8xP09zbkUxPzPA%2B0%3D&shp=a5d48078&shcp=81f88b70"
                alt="meow"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;
