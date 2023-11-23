export const Loading = () => {
  return (
    <div
      id='global-loader'
      className='page-wrapper  vh-100 d-flex justify-content-center align-items-center'>
      <div className='whirly-loader w-10'></div>
    </div>
  );
};

export const LoadingAbsolute = () => {
  return (
    <div
      id='global-loader'
      className='position-fixed bg-white bg-opacity-25 top-0 bottom-0
       right-0 left-0 w-100 d-flex justify-content-center align-items-center h-100 w-100'
      style={{ zIndex: 1500 }}>
      <div className='whirly-loader w-10'></div>
    </div>
  );
};
