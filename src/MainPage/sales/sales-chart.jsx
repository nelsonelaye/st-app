import { Link } from 'react-router-dom';
import { useGetSalesChart } from '../../../hooks/useGetSale';
import { Dropdown } from '../../EntryFile/imagePath';
import Chart from 'react-apexcharts';

const state = (data) => {
  const sold = data?.map((x) => x?.totalSalesQuantity);
  const purchased = data?.map((x) => x?.totalInventoryQuantity);
  const productNames = data?.map((x) => x?.productName);

  return {
    series: [
      {
        name: 'Sold',
        data: sold,
      },
      {
        name: 'Purchased',
        data: purchased,
      },
    ],
    options: {
      colors: ['#28C76F', '#EA5455'],
      chart: {
        type: 'bar',
        height: 400,
        stacked: true,

        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 280,
          options: {
            legend: {
              position: 'bottom',
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          borderRadius: 5,
          borderRadiusTop: 5,
        },
      },
      xaxis: {
        categories: productNames,
      },
      legend: {
        position: 'top',
      },
      fill: {
        opacity: 1,
      },
    },
  };
};

const SalesChart = () => {
  const { sale_chart } = useGetSalesChart();
  const data = sale_chart?.data || [];
  const chartData = state(data);

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='col-lg-12 col-sm-12 col-12 d-flex'>
          <div className='card flex-fill'>
            <div className='card-header pb-0 d-flex justify-content-between align-items-center'>
              <h5 className='card-title mb-0'>
                Quantity Sold vs Quantity Sold Purchased
              </h5>
              <div className='graph-sets'>
                <div className='dropdown'>
                  <button
                    className='btn btn-white btn-sm dropdown-toggle'
                    type='button'
                    id='dropdownMenuButton'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'>
                    2022
                    <img src={Dropdown} alt='img' className='ms-2' />
                  </button>
                  <ul
                    className='dropdown-menu'
                    aria-labelledby='dropdownMenuButton'>
                    <li>
                      <Link to='#' className='dropdown-item'>
                        2022
                      </Link>
                    </li>
                    <li>
                      <Link to='#' className='dropdown-item'>
                        2021
                      </Link>
                    </li>
                    <li>
                      <Link to='#' className='dropdown-item'>
                        2020
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='card-body'>
              <Chart
                options={chartData.options}
                series={chartData.series}
                type='bar'
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
