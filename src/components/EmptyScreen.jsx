const EmptyScreen = ({ message }) => {
  return (
    <div className='page-wrapper  vh-100 d-flex justify-content-center align-items-center'>
      <p className='fs-5'>{message}</p>
    </div>
  );
};

export default EmptyScreen;
