import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  //count down to redirect:
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history.push("/");

    //cleanup:
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
