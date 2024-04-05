import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { TiArrowRightThick } from 'react-icons/ti';
import { currentUser } from '@clerk/nextjs';
const HeadersInit = async () => {
  const user = await currentUser();
  return (
    <div className="max-w-3xl space-y-4 text-center">
      <h1 className="text-4xl font-bold sm:text-6xl">The PlumsApp</h1>
      <h3 className="text-3xl">A fun way to create Notes.</h3>
      <p className=" text-xl sm:text-base">
        The <span className="text-purple-800 font-semibold">PlumsApp</span> is a
        fun way to create notes. It is a simple note-taking app.
      </p>

      {user ? (
        <Link href="/home">
          <Button className="mt-4">
            Go to Home <TiArrowRightThick className="ml-1 text-xl" />
          </Button>
        </Link>
      ) : (
        <Link href="/sign-in" className="flex justify-center w-full">
          <Button className="text-center">
            It's Free! <TiArrowRightThick className="ml-1 text-xl" />
          </Button>
        </Link>
      )}

      <Image
        src="/assets/notes-bro.svg"
        alt="Notes Bro PlumsApp"
        width={400}
        height={400}
        className="mx-auto"
      />
    </div>
  );
};

export default HeadersInit;
