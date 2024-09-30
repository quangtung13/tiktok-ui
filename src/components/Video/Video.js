import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import { useRef, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faCircleCheck, faHeart, faCommentDots, faShare, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { MuteIcon, PauseIcon, PlaySolidIcon, UnMuteIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Button from '~/components/Button/Button';
import AccountPreview from '~/components/SuggestedAccounts/AccountPreview';
import ShareAction from '~/components/ShareAction';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

function Video({ data, mute, volume, adjustVolume, toggleMuted }) {
    const [isPlaying, setIsPlaying] = useState(false); // Khởi tạo là false để tránh phát ngay từ đầu
    const videoRef = useRef();
    const context = useContext(ModalContext);

    // Điều chỉnh âm lượng của video
    useEffect(() => {
        if (mute) {
            videoRef.current.volume = 0;
        } else {
            videoRef.current.volume = volume;
        }
    }, [mute, volume]); // Chỉ chạy khi mute hoặc volume thay đổi

    // Hàm phát video
    const playVideo = () => {
        if (!isPlaying) {
            videoRef.current.play().catch((error) => {
                console.error('Playback failed', error);
            });
            setIsPlaying(true);
        }
    };

    // Hàm tạm dừng video
    const pauseVideo = () => {
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Hàm chuyển đổi trạng thái phát/tạm dừng
    const togglePlay = () => {
        if (isPlaying) {
            pauseVideo();
        } else {
            playVideo();
        }
    };

    // Kiểm tra video có nằm trong viewport không
    const playVideoInViewport = () => {
        const bounding = videoRef.current.getBoundingClientRect();

        if (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        ) {
            playVideo();
        } else {
            pauseVideo();
        }
    };

    // Thêm event listener để kiểm tra khi scroll
    useEffect(() => {
        window.addEventListener('scroll', playVideoInViewport);
        return () => {
            window.removeEventListener('scroll', playVideoInViewport);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]); // Chỉ chạy lại khi isPlaying thay đổi

    const renderPreview = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <AccountPreview data={data?.user} />
            </PopperWrapper>
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            <div>
                <HeadlessTippy
                    offset={[-6, 0]}
                    delay={[500, 200]}
                    interactive
                    placement="bottom-start"
                    render={renderPreview}
                >
                    <Link className={cx('avatar-large')} to={`/@${data?.user.nickname}`} state={data?.user}>
                        <Image className={cx('avatar')} src={data?.user.avatar} alt={data?.user.avatar} />
                    </Link>
                </HeadlessTippy>
            </div>
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <HeadlessTippy
                        offset={[-74, 36]}
                        delay={[500, 200]}
                        interactive
                        placement="bottom-start"
                        render={renderPreview}
                    >
                        <div className={cx('info-small')}>
                            <Link className={cx('avatar-small')} to={`/@${data?.user.nickname}`} state={data?.user}>
                                <Image className={cx('avatar')} src={data?.user.avatar} alt={data?.user.avatar} />
                            </Link>
                            <Link className={cx('name')} to={`/@${data?.user.nickname}`} state={data?.user}>
                                <h3 className={cx('username')}>
                                    {data?.user.nickname}
                                    {data?.user.tick && (
                                        <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
                                    )}
                                </h3>
                                <h4 className={cx('full-name')}>
                                    {data?.user.full_name || `${data?.user.first_name} ${data?.user.last_name}`}
                                </h4>
                            </Link>
                        </div>
                    </HeadlessTippy>
                    <Button outline className={cx('follow-btn')} onClick={context.handleShowModal}>
                        Follow
                    </Button>
                    <div className={cx('desc')}>{data?.description}</div>
                    <Link to="/" className={cx('music')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faMusic} />
                        <h4 className={cx('music-desc')}>{data?.music}</h4>
                    </Link>
                </div>
                <div className={cx('video-wrapper')}>
                    <div className={cx('video-container')}>
                        <div className={cx('video')}>
                            <img src={data?.thumb_url} alt={data?.thumb_url} />
                            <video ref={videoRef} loop src={data?.file_url} />
                        </div>
                        <div className={cx('play-btn')} onClick={togglePlay}>
                            {isPlaying ? <PauseIcon /> : <PlaySolidIcon />}
                        </div>

                        <div className={cx('volume-container', { active: mute })}>
                            <div className={cx('volume-range')}>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    orient="vertical"
                                    onChange={adjustVolume}
                                    value={volume * 100}
                                />
                            </div>

                            <div className={cx('volume-btn')} onClick={toggleMuted}>
                                {mute || volume === 0 ? <MuteIcon /> : <UnMuteIcon />}
                            </div>
                        </div>

                        <div className={cx('report')}>
                            <FontAwesomeIcon icon={faFlag} />
                            <span>Report</span>
                        </div>
                    </div>

                    <div className={cx('video-item')}>
                        <button onClick={context.handleShowModal}>
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                        <strong>{data?.likes_count}</strong>

                        <button onClick={context.handleShowModal}>
                            <FontAwesomeIcon icon={faCommentDots} />
                        </button>
                        <strong>{data?.comments_count}</strong>

                        <button onClick={context.handleShowModal}>
                            <FontAwesomeIcon icon={faBookmark} />
                        </button>
                        <strong>0</strong>

                        <ShareAction offset={[90, 12]} arrow={true}>
                            <div className={cx('share-btn')}>
                                <button>
                                    <FontAwesomeIcon icon={faShare} />
                                </button>
                                <strong>{data?.shares_count}</strong>
                            </div>
                        </ShareAction>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
