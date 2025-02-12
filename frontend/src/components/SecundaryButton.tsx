interface SecundaryButton {
  text: string;
  onClick: () => void;
}

export default function PrimaryButton({ text, onClick }: SecundaryButton) {
  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onClick}
        className="block w-full rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {text}
      </button>
    </div>
  );
}
