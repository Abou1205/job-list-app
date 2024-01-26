import React, { useEffect } from "react";
import { statusOptions, typeOptions } from "../constant";
import { v4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createJob,
  setError,
  setJobs,
  setLoading,
} from "../redux/slices/jobSlice";
import { useNavigate } from "react-router-dom";

export const AddJob = () => {
  const state = useSelector((store) => store.jobSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // ? 1) yüklenme durumunu güncelleme
    dispatch(setLoading());

    // ? 2) veri gelirse store' a aktarma
    axios
      .get("http://localhost:3050/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      // ? 3) hata olursa store'u güncelleme
      .catch((err) => dispatch(setError(err)));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newJob = Object.fromEntries(formData.entries());

    // date and id
    newJob.id = v4();
    newJob.date = new Date().toISOString().substring(0, 10);

    // api data
    axios
      .post("http://localhost:3050/jobs", newJob)
      // success
      .then(() => {
        toast.success("Yeni iş eklendi");
        dispatch(createJob(newJob));
        navigate("/");
      })
      // failed
      .catch(() => {
        toast.warn("Ekleme işlemi başarısız");
      });
  };

  const removeDuplicates = (key) => {
    const arr = state.jobs.map((i) => i[key]);

    const filtered = arr.filter((value, index) => arr.indexOf(value) === index);

    return filtered;
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Position</label>
            <input type="text" list="positions" required name="position" />

            <datalist id="positions">
              {removeDuplicates("position").map((i, index) => (
                <option key={index} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Company</label>
            <input list="companies" type="text" required name="company" />

            <datalist id="companies">
              {removeDuplicates("company").map((i, index) => (
                <option key={index} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Location</label>
            <input list="locations" type="text" required name="location" />

            <datalist id="locations">
              {removeDuplicates("location").map((i, index) => (
                <option key={index} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Status</label>
            <select required name="status">
              <option hidden>Pick</option>
              {statusOptions.map((i, index) => (
                <option key={index}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Type</label>
            <select required name="type">
              <option hidden>Pick</option>
              {typeOptions.map((i, index) => (
                <option key={index}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <button class="btn">Add Job</button>
          </div>
        </form>
      </section>
    </div>
  );
};
