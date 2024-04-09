'use client';

const RightBar = () => {
  return (
    <section className="flex w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4  bg-light-1 text-dark-2 px-10 pb-6 pt-28 max-xl:hidden ">
      {/* <div className="flex flex-1 flex-col justify-start bg-light-1 p-10">
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </div> */}

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium">Suggested Courses</h3>
      </div>
    </section>
  );
};

export default RightBar;
