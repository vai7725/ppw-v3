import React from 'react';
import { SyncLoader } from 'react-spinners';

const LoadingPage = () => {
  return (
    <section className="h-40  flex justify-center items-center">
      <SyncLoader color="#1f2937" />
    </section>
  );
};

export default LoadingPage;
