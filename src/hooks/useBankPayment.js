import useMonoBankPayment from './useMonoBankPayment';
import useVostokPayment from './useVostokPayment';
import usePlatonPayment from './usePlatonPayment';

const useBankPayment = () => {
  const handlePayVostok = useVostokPayment();
  const handlePayMono = useMonoBankPayment();
  const handlePayPlaton = usePlatonPayment();

  const mapper = {
    MONO: handlePayMono,
    VOSTOK: handlePayVostok,
    PLATON: handlePayPlaton,
  };

  return mapper[process.env.GATSBY_PAYMENT_SYSTEM];
};

export default useBankPayment;
