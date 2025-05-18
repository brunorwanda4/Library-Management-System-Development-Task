import { useTransition } from "react";
import axios from "axios";

const DeleteMember = ({ member }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await axios.delete(`http://localhost:3012/members/${member.memberId}`);
      } catch (err) {
        console.log("Delete member error:", err);
      }
    });
  };

  return (
    <div>
      <label htmlFor="delete_modal" className="btn btn-sm btn-error">
        Delete
      </label>

      <input type="checkbox" id="delete_modal" className="modal-toggle" />
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Member</h3>
          <p className="py-4">
            Are you sure you want to delete
            <span className="font-semibold">
              {" "}
              {`${member.firstName} ${member.lastName}`}?
            </span>{" "}
            This will remove all associated data.
          </p>

          <div className="modal-action">
            <label htmlFor="delete_modal" className="btn">
              Cancel
            </label>
            <label
              htmlFor="delete_modal"
              onClick={handleDelete}
              className={`btn btn-error ${isPending ? "btn-disabled" : ""}`}
            >
              {isPending ? "Deleting..." : "Delete"}
            </label>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteMember;
