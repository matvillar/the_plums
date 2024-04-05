'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { ProfileAccProps } from '@/constants/ProfileAccProps';
import { userValidation } from '@/lib/validations/userValidation';
import { Input } from '../ui/input';
import { useState } from 'react';
import { z } from 'zod';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { updateUser } from '@/lib/actions/user.actions';

const ProfileAcc = ({ user, btnTitle }: ProfileAccProps) => {
  // declare state
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('media');
  const router = useRouter();
  const pathname = usePathname();

  // declare form data
  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profileImg: user?.userImg || '',
      username: user?.username || '',
      name: user?.name || '',
    },
  });

  // handle image change
  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    e.preventDefault();

    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes('image')) {
        return;
      }

      fileReader.onload = async (e) => {
        const imageData = e.target?.result?.toString() || '';

        fieldChange(imageData);
      };

      fileReader.readAsDataURL(file);
    }
  }

  // handle submit
  const onSubmit = async (values: z.infer<typeof userValidation>) => {
    const imgValue = values.profileImg;

    const hasImageChanged = isBase64Image(imgValue);

    if (hasImageChanged) {
      const imgFileRes = await startUpload(files);
      if (imgFileRes && imgFileRes[0].url) {
        values.profileImg = imgFileRes[0].url;
      }
    }
    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      userImg: values.profileImg,
      path: pathname,
    });

    if (pathname === '/profile/edit') {
      router.back();
    } else {
      router.push('/home');
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profileImg"
          render={({ field }) => (
            <FormItem className="flex items-center gap-5">
              <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full bg-dark-4">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="Profile Image"
                    width={100}
                    height={100}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="Profile Image"
                    width={50}
                    height={50}
                    className="rounded-full object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-medium-bold text-gray-400">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a new profile image"
                  className="account-form_image-input"
                  onChange={(e) => handleImageChange(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-bold text-light-2">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-bold text-light-2">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary">
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileAcc;
