import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import * as suggestedAccountService from '~/services/suggestedAccountService';
import VideoFollowing from '~/components/VideoFollowing';
import styles from './Following.module.scss';

const cx = classNames.bind(styles);

function Following() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [volume, setVolume] = useState(0.4);
    const [prevVolume, setPrevVolume] = useState(volume);
    const [mute, setMute] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await suggestedAccountService.suggest(page, 9);
            setVideos((prev) => [...prev, ...result]);
        };

        fetchAPI();
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleScroll() {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            setPage((page) => page + 1);
        }
    }

    const handleAdjustVolume = (e) => {
        setVolume(e.target.value / 100);
    };

    const toggleMuted = () => {
        if (mute) {
            setVolume(prevVolume);
            setMute(false);
        } else {
            setPrevVolume(volume);
            setVolume(0);
            setMute(true);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {videos.map((video, index) => (
                <VideoFollowing
                    key={index}
                    data={video}
                    volume={volume}
                    mute={mute}
                    adjustVolume={handleAdjustVolume}
                    toggleMuted={toggleMuted}
                ></VideoFollowing>
            ))}
        </div>
    );
}

export default Following;
