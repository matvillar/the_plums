'use server';

import { connect } from '@/lib/mongoose';
import User from '../models/user.model';
import { UpdateUserParams } from '@/constants/UpdateUserParams';
import { revalidatePath } from 'next/cache';

export async function updateUser({
  userId,
  username,
  name,
  userImg,
  path,
}: UpdateUserParams): Promise<void> {
  connect();
  // Update user
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        userImg,
        path,
        isOnboard: true,
      },
      { upsert: true } // create new user if it doesn't exist
    );

    if (path === '/profile/edit') {
      revalidatePath(path); // this is useful for scenarios where we want to revalidate the cache
    }
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
}

export async function fetchUserInfo(userId: string) {
  connect();
  try {
    const user = await User.findOne({ id: userId }).populate('folders').exec();
    return user;
  } catch (error) {
    throw new Error(`Error fetching user info: ${error}`);
  }
}
