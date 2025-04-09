import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime }, ref) {
  const dialogRef = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = ((remainingTime ?? 0) / 1000).toFixed(2);

  useImperativeHandle(ref, () => ({
    open() {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    },
  }));

  return (
    <dialog ref={dialogRef} className="result-modal">
      <h2>{userLost ? "You Lose!" : "You Win!"}</h2>
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
