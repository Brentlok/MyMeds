import React from 'react';
import CalendarSection from 'organisms/CalendarSection/CalendarSection';
import TimeSection from 'organisms/TimeSection/TimeSection';
import ModalTaken from 'organisms/ModalTaken/ModalTaken';

const HomeView = () => {
  return (
    <>
      <CalendarSection />
      <TimeSection />
      <ModalTaken />
      {/* Modal taken must be at the end, otherwise its not working properly */}
    </>
  );
};

export default HomeView;
