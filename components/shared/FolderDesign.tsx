import { FolderDesignParams } from '@/constants/FolderDesignParams';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const FolderDesign = ({
  id,
  title,
  description,
  image,
}: FolderDesignParams) => {
  return (
    <>
      <Link href={`/notes/${id}`}>
        <div className="flex flex-col w-64 h-64 bg-white rounded-lg shadow-lg my-10 mr-5 hover:opacity-70 transition-opacity">
          <div className="flex justify-center items-center w-full h-48">
            <Image
              src={image}
              alt="folder"
              width={100}
              height={100}
              objectFit="contain" // Set object-fit to cover
              className=" w-full p-4"
            />
          </div>

          <div className="flex items-center p-4 bg-light-2 rounded-lg">
            <div className="title-card flex-grow">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>

            <FaArrowAltCircleRight className="text-gray-500 ml-4" size={28} />
          </div>
        </div>
      </Link>
    </>
  );
};

export default FolderDesign;
