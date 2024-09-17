import styles from './filter-bracket-item.module.css';

export default function FilterBracketItem({ imageSrc, value, onChange, name }) {
    return (
        <div className={styles['bracket-item']} onClick={() => onChange(!value)}>
            {imageSrc ?
                <img className={value ? `${styles['bracket-img']} ${styles['bracket-img--selected']}` : styles['bracket-img']} src={imageSrc}></img> : undefined}
            <div>
                <span className={styles['item-text']}>{name}</span>
            </div>
        </div>
    );
};
