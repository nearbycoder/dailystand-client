import React from 'react';
import { Transition } from '@headlessui/react';

export default function SlideOver({ open = false, children }) {
  return (
    <Transition show={open}>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <section
            className="absolute inset-y-0 pl-16 max-w-full right-0 flex"
            aria-labelledby="slide-over-heading">
            <Transition.Child
              show={open ? 'true' : 'false'}
              className="w-screen max-w-md"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full">
              {children}
            </Transition.Child>
          </section>
        </div>
      </div>
    </Transition>
  );
}
