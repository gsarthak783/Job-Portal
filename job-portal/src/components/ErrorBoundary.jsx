import React, {useState} from "react";
import ErrorPage from '../pages/ErrorPage';

const ErrorBoundry = ({children}) => {
    const [hasError, setHasError] = useState(false);

    const handleOnError = (error,info) => {
        setHasError(true);
        console.log(error);
    }

    if(hasError){
        return <ErrorPage />
    }

    return children;
}

export default ErrorBoundry;