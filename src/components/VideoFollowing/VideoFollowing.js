import classNames from 'classnames/bind';
import styles from './VideoFollowing.module.scss';

import { useRef, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faCircleCheck, faHeart, faCommentDots, faShare, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { MuteIcon, PauseIcon, PlaySolidIcon, UnMuteIcon } from '~/components/Icons';
import Image from '~/components/Image';
import AccountPreview from '~/components/SuggestedAccounts/AccountPreview';
import ShareAction from '../ShareAction/ShareAction';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

function Video({ data, mute, volume, adjustVolume, toggleMuted }) {
    const [isPlaying, setIsPlaying] = useState(true);

    const videoRef = useRef();
    const context = useContext(ModalContext);

    useEffect(() => {
        if (mute) {
            videoRef.current.volume = 0;
        } else videoRef.current.volume = volume;
    });

    const playVideo = () => {
        if (isPlaying === false) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const pauseVideo = () => {
        if (isPlaying === true) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const togglePlay = () => {
        if (isPlaying === false) {
            playVideo();
        } else {
            pauseVideo();
        }
    };

    function playVideoInViewport() {
        var bounding = videoRef.current.getBoundingClientRect();

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
    }

    useEffect(() => {
        window.addEventListener('scroll', playVideoInViewport);
        return () => window.removeEventListener('scroll', playVideoInViewport);
    });

    const renderPreview = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <AccountPreview data={data} />
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
                    <Link className={cx('avatar-large')} to={`/@${data.nickname}`} state={data}>
                        <Image className={cx('avatar')} src={data.avatar} alt={data.avatar} />
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
                            <Link className={cx('avatar-small')} to={`/@${data.nickname}`} state={data}>
                                <Image className={cx('avatar')} src={data.avatar} alt={data.avatar} />
                            </Link>
                            <Link className={cx('name')} to={`/@${data.nickname}`} state={data}>
                                <h3 className={cx('username')}>
                                    {data.nickname}
                                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
                                </h3>
                                <h4 className={cx('full-name')}>
                                    {data.full_name || `${data.first_name} ${data.last_name}`}
                                </h4>
                            </Link>
                        </div>
                    </HeadlessTippy>

                    <div className={cx('desc')}>{data.popular_video.description}</div>
                    <Link to="/" className={cx('music')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faMusic} />
                        <h4 className={cx('music-desc')}>{data.popular_video.music}</h4>
                    </Link>
                </div>
                <div className={cx('video-wrapper')}>
                    <div className={cx('video-container')}>
                        <div className={cx('video')}>
                            <img src={data.popular_video.thumb_url} alt={data.popular_video.thumb_url} />
                            <video ref={videoRef} loop src={data.popular_video.file_url} />
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
                        <strong>{data.popular_video.likes_count}</strong>

                        <button onClick={context.handleShowModal}>
                            <FontAwesomeIcon icon={faCommentDots} />
                        </button>
                        <strong>{data.popular_video.comments_count}</strong>

                        <button onClick={context.handleShowModal}>
                            <FontAwesomeIcon icon={faBookmark} />
                        </button>
                        <strong>0</strong>

                        <ShareAction offset={[90, 12]} arrow={true}>
                            <div className={cx('share-btn')}>
                                <button>
                                    <FontAwesomeIcon icon={faShare} />
                                </button>
                                <strong>{data.popular_video.shares_count}</strong>
                            </div>
                        </ShareAction>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
