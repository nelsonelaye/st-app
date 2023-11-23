import CountUp from 'react-countup';
import { Dash1 } from '../../../EntryFile/imagePath';
import { formatCurrency } from '../../../../utils/helpers';

const Metric = ({ value, text, currency }) => {
  return (
    <div className='col-lg-3 col-sm-6 col-12'>
      <div className='dash-widget'>
        <div className='dash-widgetimg'>
          <span>
            <img src={Dash1} alt='img' />
          </span>
        </div>
        <div className='dash-widgetcontent'>
          <h5 className='counters'>
            {currency && '₦'}
            <CountUp
              formattingFn={(n) => (currency ? formatCurrency(n) : n)}
              end={value}
            />
          </h5>
          <h6>{text}</h6>
        </div>
      </div>
    </div>
  );
};

export default Metric;
