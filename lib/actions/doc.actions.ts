'use server';

import { connect } from '@/lib/mongoose';
import Doc from '../models/doc.model';
import User from '../models/user.model';
import { CreateDocParams } from '@/constants/CreateDocParams';
import { revalidatePath } from 'next/cache';

export async function createDoc({
  title,
  content,
  userId,
  parentDocId,
  icon,
  coverImage,
  isArchived,
  path,
}: CreateDocParams) {
  const params = {
    title,
    content,
    userId,
    parentDocId,
    coverImage,
    isArchived,
    icon,
    path,
  };

  await connect();

  try {
    const doc = await Doc.create({ params });

    // Add doc to user's docs
    await User.findByIdAndUpdate(userId, {
      $push: { notes: doc._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log('Error creating doc:', error);
    throw new Error(`Error creating doc: ${error}`);
  }
}
