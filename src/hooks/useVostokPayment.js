import forge from 'node-forge';
import CryptoJS from 'crypto-js';

const ORDER_NUMBER = Date.now();
const MERCHANT_id = process.env.GATSBY_VOSTOK_MERCHANT_ID;
const AUTH_TYPE = 1;

const useVostokPayment = () => {
  const handlePayVostok = async (name, amount, email, rate) => {
    const amountToPay = (amount * rate).toFixed(2);

    // hash of private key
    // e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855

    const privateKeyPem = process.env.GATSBY_VOSTOK_PRIVATE_KEY;
    const privateKeyHash = CryptoJS.SHA256().toString(CryptoJS.enc.Hex);

    const data = `${ORDER_NUMBER}|${amountToPay}|${MERCHANT_id}|${AUTH_TYPE}`;

    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    const md = forge.md.sha256.create();
    md.update(data, 'utf8');
    const signature = privateKey.sign(md);

    const base64Signature = forge.util.encode64(signature);

    const eComPay = new window.EcomSDK.CheckoutPay();

    eComPay.phoneNumber = '+380981234567';
    eComPay.amount = amountToPay;
    eComPay.description = 'Тестовий платіж';
    eComPay.partnerOrderId = ORDER_NUMBER;
    eComPay.merchantId = MERCHANT_id;
    eComPay.authType = AUTH_TYPE;
    eComPay.successRedirectUrl = `https://elite-sport.netlify.app/orderConfirm?name=${name}&amount=${amount}`;
    eComPay.failureRedirectUrl = 'https://elite-sport.netlify.app/404';
    eComPay.cultureName = 'uk-UA'; // TODO use en
    eComPay.signature = base64Signature;
    eComPay.keyHash = privateKeyHash;
    eComPay.customParameters = {};

    eComPay.checkout();
  };

  return handlePayVostok;
};

export default useVostokPayment;
