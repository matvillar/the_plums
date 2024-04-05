import Image from 'next/image';

const Logo = () => {
  return (
    <div className="hidden md:flex p-6 items-center gap-x-3">
      <Image
        className="object-contain"
        src={'/assets/logo2.png'}
        alt="Logo"
        width={60}
        height={50}
      />
      <p className="font-bold">
        PLUMS<span className="text-purple-800">APP</span>
      </p>
    </div>
  );
};

export default Logo;
