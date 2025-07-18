import React from 'react';

const Modal = ({ text }) => {
  return (
    <dialog id="comment_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <p className="py-4">{text}</p>
      </div>
    </dialog>
  );
};

export default Modal;