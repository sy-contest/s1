interface ConfirmationModalProps {
    choice: string
    onConfirm: () => void
    onCancel: () => void
  }
  
  export default function ConfirmationModal({ choice, onConfirm, onCancel }: ConfirmationModalProps) {
    return (
      <div className="bg-white p-6 rounded-lg">
        <p className="text-xl mb-4">Are you sure you want to choose {choice}?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    )
  }