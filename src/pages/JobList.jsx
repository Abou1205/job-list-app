import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";
import axios from "axios";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Filter from "../components/Filter";

const JobList = () => {
  const dispatch = useDispatch();

  const jobState = useSelector((store) => store.jobSlice);

  // ! api den verileri alıp store'a aktarma
  const fetchData = () => {
    // ? 1) yüklenme durumunu güncelleme
    dispatch(setLoading());

    // ? 2) veri gelirse store' a aktarma
    axios
      .get("http://localhost:3050/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      // ? 3) hata olursa store'u güncelleme
      .catch((err) => dispatch(setError(err)));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list-page">
      <Filter jobs={jobState.jobs}/>
      {/* Yüklenme varsa loader bas */}
      {jobState.isLoading ? (
        <Loader />
      ) : jobState.isError ? (
        <div className="error">
          <p>
            Üzgünüz verilere erişirken hata oluştu
            <span>{jobState.isError.message}</span>
          </p>
          <button onClick={fetchData}>Tekrar Dene</button>
        </div>
      ) : (
        <div className="job-list">
          {jobState.jobs.map((job) => (
            <Card job={job} key={job.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
