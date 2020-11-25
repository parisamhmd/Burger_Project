import React from "react";

import Modal from "../../components/UI/Modal/Modal";
import Auxilary from "../Auxilary";
import useHtpClient from "../../hook/http-error-handler"

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError]= useHtpClient(axios)
    return (
        <Auxilary>
          <Modal show={error} modalClosed={clearError}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...props} />
        </Auxilary>
      );
  };
};
export default withErrorHandler;
