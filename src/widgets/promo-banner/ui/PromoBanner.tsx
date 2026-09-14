import clsx from 'clsx';
import styles from './PromoBanner.module.scss';
import promoAvatar from '@/shared/assets/images/promoAvatar.jpg';
import { Link } from 'react-router-dom';

import TelegramPurple from '@/shared/assets/images/telegramPurple.png';
import YoutubePurple from '@/shared/assets/images/youtubePurple.png';
import ProfilePurple from '@/shared/assets/images/profilePurple.png';

export function PromoBanner({ className }: { className?: string }) {
    return (
        <div className={clsx(styles.promoBanner, className)}>
            <div className={styles.nameContent}>
                <div className={styles.avatarContent}>
                    <img className={styles.avatar} src={promoAvatar} alt="парень в белой футболке" /> 
                </div>
                <div className={styles.nameTextWrapper}>
                    <p className={styles.name}>Руслан Куянец</p>
                    <p className={styles.subName}>Python Guru</p>
                </div>
            </div>
            <p className={styles.description}>Guru – это эксперты YeaHub, которые помогают развивать комьюнити.</p>
            <div className={styles.iconsList}>
                <Link to="/" target="_blank" rel="noopener noreferrer">
                    <img className={styles.socialIcon} src={TelegramPurple} alt="иконка телеграм" />
                </Link>

                <Link to="/" target="_blank" rel="noopener noreferrer">
                    <img className={styles.socialIcon} src={YoutubePurple} alt="иконка ютуб" />
                </Link>
                <Link to="/" target="_blank" rel="noopener noreferrer">
                    <img className={styles.socialIcon} src={ProfilePurple} alt="иконка профиля" />
                </Link>
            </div>
        </div >
    );
}
