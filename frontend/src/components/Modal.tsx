interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-neutral-800 p-6 rounded-lg shadow-md lg:w-2/6 md:w-3/4 sm:w-1/3 xs:w-3/3">
        <p className="text-lg mb-4 text-wrap">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-700 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
