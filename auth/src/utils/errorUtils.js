export const handleErrorResponse = (error) => {
    if (error.response && error.response.status === 422) {
      error.response.data.status = error.response.data.status;
    } else if (error.response) {
      error.response.data = {
        status: error.response.data.status,
        message: error.response.data.message,
      };
    } else {
      error.response = {
        data: {
          status: false,
          message: 'server error [300]',
        },
      };
    }
    return error.response;
  };
  