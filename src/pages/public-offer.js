import React, { useEffect } from 'react';
import * as styles from './contact-us.module.css';

import Banner from '../components/Banner';
import Container from '../components/Container';
import PublicOffer from '../components/PublicOffer';

const PublicOfferPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className={styles.root}>
        <Banner
          maxWidth={'650px'}
          name={'OFFER_PAGE.title'}
          bgImage={'/support.png'}
          color={'var(--standard-white)'}
          height={'350px'}
        />

        <div className={styles.pageContainer}>
          <Container size={'large'} spacing={'min'}>
            <PublicOffer />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default PublicOfferPage;
