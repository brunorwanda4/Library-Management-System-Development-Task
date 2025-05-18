import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";

const AddLoans = () => {
  const [members, setMembers] = useState([]);
  const [medias, setMedias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    mediaId: null,
    memberId: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [membersRes, mediasRes] = await Promise.all([
          axios.get("http://localhost:3012/members"),
          axios.get("http://localhost:3012/medias"),
        ]);

        if (membersRes.status === 200 && mediasRes.status === 200) {
          setMembers(membersRes.data);
          setMedias(mediasRes.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Server Error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const res = await axios.post("http://localhost:3012/loans", formData);
        if (res.status === 201 && res.data.message) {
          setSuccess(res.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Server Error");
      }
    });

    console.log(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (medias.length <= 0 && !error) return <div>There are no medias</div>;
  if (members.length <= 0 && !error) return <div>There are no members</div>;

  return (
    <div className="grid place-content-center h-screen">
      <form onSubmit={handleSubmit} className="c p-4 min-w-96 space-y-4">
        <h2 className="font-bold text-2xl text-center">Add Loan</h2>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">🌻 {success}</div>}

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="mediaId" className="label">
              Media
            </label>
            <select
              name="mediaId"
              id="mediaId"
              className="select w-full"
              onChange={handleChange}
              disabled={isPending}
            >
              <option value="">Select a media</option>
              {medias.map((media) => (
                <option key={media.mediaId} value={media.mediaId}>
                  {media.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="memberId" className="label">
              Member
            </label>
            <select
              name="memberId"
              id="memberId"
              className="select w-full"
              onChange={handleChange}
              disabled={isPending}
            >
              <option value="">Select a member</option>
              {members.map((member) => (
                <option key={member.memberId} value={member.memberId}>
                  {member.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-secondary"
          disabled={isPending}
        >
          Add Loan
          {isPending && <span className="loading loading-spinner ml-2" />}
        </button>
      </form>
    </div>
  );
};

export default AddLoans;
