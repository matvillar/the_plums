'use client';

import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FolderValidation } from '@/lib/validations/folderValidation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { isBase64Image } from '@/lib/utils';
import { useState } from 'react';
import { useUploadThing } from '@/lib/uploadthing';
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';
import { createFolder } from '@/lib/actions/folder.actions';

interface UProps {
  userId: string;
}

function CreateFolderForm({ userId }: UProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('media');
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof FolderValidation>>({
    resolver: zodResolver(FolderValidation),
    defaultValues: {
      folderTitle: '',
      folderImage: '',
      folderDescription: '',
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof FolderValidation>) => {
    const imgValue = values.folderImage;

    const hasImageChanged = isBase64Image(imgValue);
    if (hasImageChanged) {
      const res = await startUpload(files);
      if (res && res[0].url) {
        values.folderImage = res[0].url;
      }
    } else {
      values.folderImage = imgValue;
    }
    await createFolder({
      folderTitle: values.folderTitle,
      folderImage: values.folderImage,
      folderDescription: values.folderDescription,
      author: userId,
      path: pathname,
    });

    router.push('/home');
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
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
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col justify-start gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="folderImage"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                {/* Adding container with banner-like appearance */}
                <div className="relative w-full h-48 bg-dark-4 rounded-t-md overflow-hidden">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="Folder Image"
                      layout="fill"
                      objectFit="cover" // Cover will make sure the image fills the container while maintaining aspect ratio
                      priority
                    />
                  ) : (
                    <Image
                      src="/assets/upload.jpg"
                      alt="Upload"
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  )}
                </div>
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
            name="folderTitle"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Folder Title
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input
                    type="text"
                    placeholder="Enter folder title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="folderDescription"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Folder Description
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-black hover:bg-purple-800 transition duration-300 text-white font-bold py-2 px-4 rounded"
          >
            Create Folder
          </Button>
        </form>
      </Form>
    </>
  );
}

export default CreateFolderForm;
