import axios from 'axios';
import md5 from 'md5';

import { b64DecodeUnicode } from '../helpers/base64';

const PAYMENT = 'CC';
const SHOP_URL = 'https://amanitamuscariastore.online/shop/';
const KEY = process.env.GATSBY_VOSTOK_KEY!;
const PASS = process.env.GATSBY_VOSTOK_PASS!;

const useVostokPayment = () => {
  const handlePayVostok = async (name, email, amount, rate) => {
    const data = b64DecodeUnicode(
      JSON.stringify({
        amount: amount * rate, // 1000.00
        currency: 'UAH',
        destination: `Оплата за товар від ${name} (${email}).`,
      })
    );

    const sign = md5(
      KEY.split('').reverse().join('').toUpperCase() +
        PAYMENT.split('').reverse().join('').toUpperCase() +
        data.split('').reverse().join('').toUpperCase() +
        SHOP_URL.split('').reverse().join('').toUpperCase() +
        PASS.split('').reverse().join('').toUpperCase()
    );

    console.log('AAA ', {
      key: KEY,
      payment: PAYMENT,
      data,
      url: SHOP_URL,
      error_url: SHOP_URL,
      email,
      req_token: 'Y',
      sign,
    });

    const bankData = await axios.post(
      'https://secure.platononline.com/payment/auth',
      {
        key: KEY,
        payment: PAYMENT,
        data,
        url: SHOP_URL,
        error_url: SHOP_URL,
        email,
        req_token: 'Y',
        sign,
      }
    );

    if (bankData) console.log('DDD ', bankData);
  };

  return handlePayVostok;
};

export default useVostokPayment;
