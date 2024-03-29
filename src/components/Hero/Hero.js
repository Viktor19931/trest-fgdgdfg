import React from 'react';
import * as styles from './Hero.module.css';
import Button from '../Button';
import { Link } from 'gatsby';
import { LocalizationContext } from '../../context/localizationContext';

const Hero = (props) => {
  const {
    title,
    subtitle,
    ctaText,
    ctaAction,
    image,
    maxWidth,
    ctaStyle,
    ctaLink,
    ctaTo,
    header,
    children,
  } = props;
  const { t } = React.useContext(LocalizationContext);

  return (
    <div className={styles.root} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.content} style={{ maxWidth: maxWidth }}>
        {header && <span className={styles.header}>{t(header)}</span>}
        {title && <h2 className={styles.title}>{t(title)}</h2>}
        {subtitle && <span className={styles.subtitle}>{t(subtitle)}</span>}
        {ctaText && (
          <Button
            className={`${styles.ctaButton} ${ctaStyle}`}
            level={'primary'}
            onClick={ctaAction}
          >
            {t(ctaText)}
          </Button>
        )}
        {ctaLink && (
          <Link className={styles.ctaLink} to={ctaTo}>
            {ctaLink}
          </Link>
        )}
      </div>
      {children}
    </div>
  );
};

export default Hero;
