/* import clsx from "clsx";
import figmaIcon from '@/shared/assets/icons/figma.svg';
import githubIcon from '@/shared/assets/icons/github.svg';
import linkedinIcon from '@/shared/assets/icons/linkedin.svg';
import telegramIcon from '@/shared/assets/icons/telegram.svg';
import youtubeIcon from '@/shared/assets/icons/youtube.svg';
import logoIcon from '@/shared/assets/icons/logo.svg';
import styles from './Icon.module.scss';
import yeahubIcon from '@/shared/assets/icons/yeahub.svg';

const iconTypes: Record<string, string> = {
    figma: figmaIcon,
    github: githubIcon,
    linkedin: linkedinIcon,
    telegram: telegramIcon,
    youtube: youtubeIcon,
    logo: logoIcon,
    yeahub: yeahubIcon,
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
 */

import clsx from "clsx";
// Добавляем ?react к каждому импорту, чтобы Vite отдавал их как компоненты
import FigmaIcon from '@/shared/assets/icons/figma.svg?react';
import GithubIcon from '@/shared/assets/icons/github.svg?react';
import LinkedinIcon from '@/shared/assets/icons/linkedin.svg?react';
import TelegramIcon from '@/shared/assets/icons/telegram.svg?react';
import YoutubeIcon from '@/shared/assets/icons/youtube.svg?react';
import LogoIcon from '@/shared/assets/icons/logo.svg?react';
import YeahubIcon from '@/shared/assets/icons/yeahub.svg?react';
import styles from './Icon.module.scss';
import FilterIcon from '@/shared/assets/icons/filterIcon.svg?react';

// Типизируем как массив React-компонентов, принимающих SVG-пропсы
const iconTypes: Record<string, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
    figma: FigmaIcon,
    github: GithubIcon,
    linkedin: LinkedinIcon,
    telegram: TelegramIcon,
    youtube: YoutubeIcon,
    logo: LogoIcon,
    yeahub: YeahubIcon,
    filterIcon: FilterIcon,
};

export const Icon = ({ name, className = '', ...props }: { name: string; className?: string; [key: string]: unknown }) => {
    const SelectedIcon = iconTypes[name];

    if (!SelectedIcon) return null;

    // Рендерим SVG как полноценный компонент, теперь currentColor из SCSS сработает!
    return (
        <SelectedIcon
            className={clsx(styles.icon, className)}
            {...props}
        />
    );
};
