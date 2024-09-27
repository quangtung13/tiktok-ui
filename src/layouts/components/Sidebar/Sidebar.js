import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useEffect, useState } from 'react';

import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import config from '~/config';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as suggestedAccountService from '~/services/suggestedAccountService';
import Footer from './Footer';

const cx = classNames.bind(styles);

function Sidebar() {
    const currentUser = true;

    const [seeAll, setSeeAll] = useState(true);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            if (seeAll) {
                const result = await suggestedAccountService.suggest(1, 10);
                setAccounts(result);
            } else {
                const result = await suggestedAccountService.suggest(1, 20);
                setAccounts(result);
            }
        };
        fetchApi();
    }, [seeAll]);

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Menu>
                    <MenuItem
                        title="For You"
                        to={config.routes.home}
                        icon={<HomeIcon />}
                        activeIcon={<HomeActiveIcon />}
                    />
                    <MenuItem
                        title="Following"
                        to={config.routes.following}
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupActiveIcon />}
                    />
                    <MenuItem
                        title="LIVE"
                        to={config.routes.live}
                        icon={<LiveIcon />}
                        activeIcon={<LiveActiveIcon />}
                    />
                </Menu>

                {currentUser ? (
                    <div className={cx('following-container')}>
                        <h2 className={cx('label')}>Following accounts</h2>
                        {accounts.map((account) => (
                            <SuggestedAccounts data={account} key={account.id} />
                        ))}
                        {seeAll ? (
                            <div className={cx('see-all')} onClick={() => setSeeAll(false)}>
                                See more
                            </div>
                        ) : (
                            <div className={cx('see-all')} onClick={() => setSeeAll(true)}>
                                See less
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={cx('login-container')}>
                        <h4 className={cx('login-content')}>
                            Log in to follow creators, like videos, and view comments.
                        </h4>
                    </div>
                )}

                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
