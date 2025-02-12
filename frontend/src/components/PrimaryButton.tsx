interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
}

export default function PrimaryButton({ text, onClick }: PrimaryButtonProps) {
  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onClick}
        className="block w-full rounded-md bg-indigo-600 px-3 py-3 text-center text-sm sm:text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 "
      >
        {text}
      </button>
    </div>
  );
}
