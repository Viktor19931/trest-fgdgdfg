import { Link } from 'gatsby';
import React, { useContext, useState } from 'react';

import Accordion from '../Accordion';
import Container from '../Container';
import FormInputField from '../FormInputField/FormInputField';
import Icon from '../Icons/Icon';
import Config from '../../config.json';
import { LocalizationContext } from '../../context/localizationContext';

import * as styles from './Footer.module.css';

const Footer = (prop) => {
  const [email, setEmail] = useState('');

  const subscribeHandler = (e) => {
    e.preventDefault();
    setEmail('');
    console.log('Subscribe this email: ', email);
  };

  const handleSocialClick = (platform) => {
    window.open('https://www.instagram.com/elite_sport__lviv/');
  };

  const { t } = useContext(LocalizationContext);

  const renderLinks = (linkCollection) => {
    return (
      <ul className={styles.linkList}>
        {linkCollection.links.map((link, index) => {
          return (
            <li key={index}>
              <Link className={`${styles.link} fancy`} to={link.link}>
                {t(link.text)}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={styles.root}>
      <Container size={'large'} spacing={'min'}>
        <div className={styles.content}>
          <div className={styles.contentTop}>
            {Config.footerLinks.map((linkCollection, indexLink) => {
              return (
                <div className={styles.footerLinkContainer} key={indexLink}>
                  {/* for web version */}
                  <div className={styles.footerLinks}>
                    <span className={styles.linkTitle}>
                      {t(linkCollection.subTitle)}
                    </span>
                    {renderLinks(linkCollection)}
                  </div>
                  {/* for mobile version */}
                  <div className={styles.mobileFooterLinks}>
                    <Accordion
                      customStyle={styles}
                      type={'add'}
                      title={t(linkCollection.subTitle)}
                    >
                      {renderLinks(linkCollection)}
                    </Accordion>
                  </div>
                </div>
              );
            })}
            <div className={styles.newsLetter}>
              <div className={styles.newsLetterContent}>
                <span className={styles.linkTitle}>
                  {t('FOOTER.subscribe')}
                </span>
                <form
                  className={styles.newsLetterForm}
                  onSubmit={(e) => subscribeHandler(e)}
                >
                  <FormInputField
                    icon={'arrow'}
                    id={'newsLetterInput'}
                    value={email}
                    placeholder={'Email'}
                    handleChange={(_, e) => setEmail(e)}
                  />
                </form>
                <div className={styles.socialContainer}>
                  {Config.social.instagram && (
                    <div
                      onClick={() => handleSocialClick('instagram')}
                      role={'presentation'}
                      className={styles.socialIconContainer}
                    >
                      <Icon symbol={'instagram'}></Icon>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className={styles.contentBottomContainer}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.contentBottom}>
            <div className={styles.copyrightContainer}>
              <div className={styles.creditCardContainer}>
                {/* <img
                  className={styles.amexSize}
                  src={'/amex.png'}
                  alt={'amex'}
                ></img> */}
                <img
                  className={styles.masterSize}
                  src={'/master.png'}
                  alt={'mastercard'}
                ></img>
                <img
                  className={styles.visaSize}
                  src={'/visa.png'}
                  alt={'visa'}
                ></img>
                <img
                  className={styles.visaSize}
                  src={'/prostir.png'}
                  alt={'prostir'}
                ></img>
              </div>
              <span>{new Date().getFullYear()} (c) Elite Sport</span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
