import React from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width, height, borderRadius = '6px', className = ''
}) => {
    return (
        <div
            className={`${styles.skeleton} ${className}`}
            style={{ width, height, borderRadius }}
        />
    );
};
