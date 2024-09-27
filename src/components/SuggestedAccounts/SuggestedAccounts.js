import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ data, ...props }) {
    return (
        <div className={cx('wrapper')}>
            <AccountItem data={data} />
        </div>
    );
}
SuggestedAccounts.propTypes = {
    data: PropTypes.object.isRequired,
};
export default SuggestedAccounts;
