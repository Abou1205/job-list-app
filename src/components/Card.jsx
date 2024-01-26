import React from "react";
import DeleteButton from "./DeleteButton";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaSuitcase } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/slices/jobSlice";
import { toast } from "react-toastify";

const Card = ({ job }) => {
  const dispatch = useDispatch();

  const color = {
    Ongoing: "green",
    Interview: "goldenrod",
    Denied: "red",
  };

  const handleDelete = () => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      // 1) api request
      axios
        .delete(`http://localhost:3050/jobs/${job.id}`)
        // 2) success store import
        .then(() => {
          toast.info("Silme işlemi başarılı");
          dispatch(deleteJob(job.id));
        })
        // 3) failed error message
        .catch(() => {
          toast.warn("Silme işlemi başarısız");
        });
    }
  };

  return (
    <div className="card">
      <div className="head">
        <div className="left">
          <div className="letter">
            <span>{job.company[0]} </span>
          </div>
          <div className="info">
            <p>{job.position} </p>
            <p>{job.company}</p>
          </div>
        </div>
        <div className="right">
          <DeleteButton handleDelete={handleDelete} />
        </div>
      </div>
      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p>{job.location}</p>
        </div>
        <div className="field">
          <FaSuitcase />
          <p>{job.type}</p>
        </div>
        <div className="field">
          <BsFillCalendarDateFill />
          <p>{job.date}</p>
        </div>
        <div className="status">
          <p style={{ backgroundColor: color[job.status] }}>{job.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
