import { Modal, Button } from "flowbite-react";

export default function SystemPromptModal({
  isModalOpen,
  closeModal,
  fullPrompt,
  setFullPrompt,
  setApplyPrompt,
}) {
  return (
    <Modal
      className="rounded-lg p-4"
      show={isModalOpen}
      onClose={() => closeModal()}
    >
      <div className="modal-header p-2">
        <h2 className="text-2xl font-bold">Language Learning Partner</h2>
      </div>
      <div className="modal-body p-2">
        <p className="text-lg font-medium">full prompt:</p>
        <textarea
          name=""
          id=""
          className="min-h-[300px] w-full"
          value={fullPrompt}
          onChange={(e) => setFullPrompt(e.target.value)}
        ></textarea>
      </div>
      <div className="modal-footer flex justify-between gap-2 p-2">
        <Button
          className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
          onClick={() => closeModal()}
        >
          Close
        </Button>
        <Button
          className="rounded-lg bg-gradient-to-tr from-indigo-500 to-indigo-300 p-2 text-white hover:from-indigo-600 hover:to-indigo-400"
          onClick={() => {
            setApplyPrompt();
            closeModal();
          }}
        >
          Save and apply
        </Button>
      </div>
    </Modal>
  );
}
