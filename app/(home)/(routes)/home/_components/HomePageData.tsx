import React from 'react';
import Link from 'next/link';
import { fetchRecentFolders } from '@/lib/actions/folder.actions';
import FolderDesign from '@/components/shared/FolderDesign';
import { FaFolderPlus } from 'react-icons/fa6';

const HomePageData = async () => {
  const res = await fetchRecentFolders();
  return (
    <>
      <div className="flex head-text items-center gap-5 mb-10">
        <h2 className="text-2xl">Recent Folders</h2>
        <Link href="/new-folder">
          <FaFolderPlus
            className="cursor-pointer hover:text-purple-800 transition ease-in-out"
            size={28}
          />
        </Link>
      </div>
      <div className="flex flex-wrap ">
        {res.length > 0 &&
          res.map((folder) => (
            <FolderDesign
              key={folder._id}
              id={folder._id}
              title={folder.folderTitle}
              description={folder.folderDescription}
              image={folder.folderImage}
            />
          ))}
      </div>
    </>
  );
};

export default HomePageData;
