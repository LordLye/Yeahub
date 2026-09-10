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
import InfoMenu from '@/shared/assets/icons/infoMenu.svg?react';

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
    infoMenu: InfoMenu,
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
