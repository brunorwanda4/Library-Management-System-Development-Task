import axios from "axios";
import React, { useEffect, useState, useTransition } from "react";

const AddLoans = () => {
  const [members, setMembers] = useState([]);
  const [medias, setMedias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const [fD, setFD] = useState({
    mediaId: null,
    memberId: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFD((p) => ({ ...p, [name]: value }));
    setError(fD.mediaId)
  };

  useEffect(() => {
    const fetData = async () => {
      setIsLoading(true);
      try {
        const [users, books] = await Promise.all([
          await axios.get("http://localhost:3012/members"),
          await axios.get("http://localhost:3012/medias"),
        ]);
        if (users.status === 200 && books.status === 200) {
          setMedias(books.data);
          setMembers(users.data);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Server Error");
      } finally {
        setIsLoading(false);
      }
    };
    fetData();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (medias.length <= 0 && !error) return <div>They are no medias </div>;
  if (members.length <= 0 && !error) return <div>They are no members </div>;

  const handSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const req = await axios.post("http://localhost:3012/loans", fD);
        if (req.status === 201 && req.data.message) {
          setSuccess(req.data.message);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Sever Error");
      }
    });

    console.log(fD);
  };

  return (
    <div className=" grid place-content-center h-screen">
      <form onSubmit={handSubmit} className="c p-4 min-w-96 space-y-4">
        <h2 className=" font-bold text-2xl text-center">Add Loan</h2>
        {error && <div className=" alert alert-error">{error}</div>}
        {success && <div className=" alert alert-success">{error}</div>}
        <div className=" space-y-4">
          <div className=" space-y-2">
            <label className=" label" htmlFor="mediaId">
              Media
            </label>
            <select
              onChange={handleChange}
              disabled={isPending}
              className=" w-full select"
              name="mediaId"
              id="mediaId"
            >
              {medias.map((item) => {
                return <option key={item.mediaId} value={item.mediaId}>{item.title}</option>;
              })}
            </select>
          </div>
          <div className=" space-y-2">
            <label className=" label" htmlFor="memberId">
              Member
            </label>
            <select
              onChange={handleChange}
              disabled={isPending}
              className=" w-full select"
              name="memberId"
              id="media"
            >
              {members.map((item) => {
                return <option key={item.memberId} value={item.memberId}>{item.email}</option>;
              })}
            </select>
          </div>
        </div>
        <button disabled={isPending} className=" btn-secondary btn">
          Add Loan {isLoading && <span className=" loading loading-spinner" />}
        </button>
      </form>
    </div>
  );
};

export default AddLoans;
