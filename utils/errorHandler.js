
export const ErrorHandler = (error) => {

  console.log(error)
  let message = ''

  if(error?.FirstName){
    message = error.FirstName[0]
  }else if (error?.LastName) {
    message = error.LastName[0];
  }else if (error?.AccessItems) {
    message = error.AccessItems[0];
  }else {
      message = 'Something went wrong'
  }

  return message;
}