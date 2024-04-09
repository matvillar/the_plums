'use client';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

const RightBar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <section className="flex w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4  bg-light-1 text-dark-2 px-10 pb-6 pt-28 max-xl:hidden ">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium">Latest Note</h3>
      </div>
    </section>
  );
};

export default RightBar;
