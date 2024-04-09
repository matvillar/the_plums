'use client';
import { FolderDesignParams } from '@/constants/FolderDesignParams';
import { FaArrowAltCircleRight, FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { deleteFolderById } from '@/lib/actions/folder.actions';

const FolderDesign = ({
  id,
  title,
  description,
  image,
}: FolderDesignParams) => {
  const editFolder = () => {
    // Handle edit action
  };

  const deleteFolder = async () => {
    // Handle delete action
    await deleteFolderById(id);
    window.location.reload();
  };
  return (
    <>
      <div className="flex flex-col w-72 h-72 bg-white rounded-lg shadow-lg mr-5">
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
          <div className="flex gap-1">
            <Link href={`/notes/${id}`}>
              <FaArrowAltCircleRight
                className="text-gray-500 ml-4  hover:text-purple-700 cursor-pointer hover:opacity-100"
                size={28}
              />
            </Link>

            <FaTrash
              className="text-gray-500 ml-4 hover:text-red-700 cursor-pointer hover:opacity-100"
              size={28}
              onClick={deleteFolder}
            />

            <FaEdit
              className="text-gray-500 ml-4 hover:text-blue-700 cursor-pointer hover:opacity-100"
              size={28}
              onClick={editFolder}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FolderDesign;
