import { useTransition } from "react";
import axios from "axios";

const DeleteMedia = ({ media }) => {
  const [isPending, startTransition] = useTransition();
  const modalId = `delete_modal_${media.mediaId}`;

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await axios.delete(`http://localhost:3012/medias/${media.mediaId}`);
      } catch (err) {
        console.error("Delete media error:", err);
      }
    });
  };

  return (
    <div>
      <label htmlFor={modalId} className="btn btn-sm btn-error">
        Delete
      </label>

      <input type="checkbox" id={modalId} className="modal-toggle" />

      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Media</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{media?.title}</span>?<br />
            This will remove all associated data.
          </p>

          <div className="modal-action">
            <label htmlFor={modalId} className="btn">
              Cancel
            </label>
            <label
              htmlFor={modalId}
              onClick={handleDelete}
              className={`btn btn-error ${isPending ? "btn-disabled" : ""}`}
            >
              {isPending ? "Deleting..." : "Confirm Delete"}
            </label>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteMedia;
