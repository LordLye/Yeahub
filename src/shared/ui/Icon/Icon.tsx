import clsx from "clsx";
import figmaIcon from '@/shared/assets/icons/figma.svg';
import githubIcon from '@/shared/assets/icons/github.svg';
import linkedinIcon from '@/shared/assets/icons/linkedin.svg';
import telegramIcon from '@/shared/assets/icons/telegram.svg';
import youtubeIcon from '@/shared/assets/icons/youtube.svg';
import logoIcon from '@/shared/assets/icons/logo.svg';
import styles from './Icon.module.scss';

const iconTypes: Record<string, string> = {
    figma: figmaIcon,
    github: githubIcon,
    linkedin: linkedinIcon,
    telegram: telegramIcon,
    youtube: youtubeIcon,
    logo: logoIcon,
};

export const Icon = ({ name, className = '', ...props }: { name: string; className?: string; [key: string]: unknown }) => {
    const SelectedIcon = iconTypes[name];
    const altText = `${name} icon`;

    if (!SelectedIcon) return null;

    return (
        <img
            src={SelectedIcon}
            alt={altText}
            loading="lazy"
            className={clsx(styles.icon, className)}
            {...props}
        />
    );
};
