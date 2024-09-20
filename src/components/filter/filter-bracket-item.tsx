import styles from './filter-bracket-item.module.css';

export default function FilterBracketItem({ imageSrc, value, onChange, name }) {
    let textClass = styles['item-text'];
    if (!imageSrc && !!value) {
        textClass = `${textClass} ${styles['item-text--selected']}`;
    }
    return (
        <div className={styles['bracket-item']} onClick={() => onChange(!value)}>
            {imageSrc ?
                <img className={value ? `${styles['bracket-img']} ${styles['bracket-img--selected']}` : styles['bracket-img']} src={imageSrc}></img> : undefined}
            <div>
                <span className={textClass}>{name}</span>
            </div>
        </div>
    );
};
