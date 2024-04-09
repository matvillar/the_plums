import HeadersInit from './_components/headersInit';

const InitialPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center pb-10 px-6 z-50">
        <HeadersInit />
      </div>
    </div>
  );
};

export default InitialPage;
