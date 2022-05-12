import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import {
  clearValues,
  createJob,
  editJob,
  handleChange,
} from "../../feature/job/jobSlice";

const AddJobs = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  }

  function handleJobInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  }

  return (
    <Wrapper>
      <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
      <div className="form-center">
        {/* position */}
        <FormRow
          type="text"
          name="position"
          value={position}
          handleChange={handleJobInput}
        />
        {/* company */}
        <FormRow
          type="text"
          name="company"
          value={company}
          handleChange={handleJobInput}
        />
        {/* location */}
        <FormRow
          type="text"
          name="jobLocation"
          labelText="Job Location"
          value={jobLocation}
          handleChange={handleJobInput}
        />
        {/* status */}
        <FormRowSelect
          name="status"
          value={status}
          handleChange={handleJobInput}
          list={statusOptions}
        />
        {/* job type */}
        <FormRowSelect
          labelText="Job Type"
          name="jobType"
          value={jobType}
          handleChange={handleJobInput}
          list={jobTypeOptions}
        />
        <div className="btn-container">
          <button
            type="button"
            className="btn btn-block clear-btn"
            onClick={() => dispatch(clearValues())}
          >
            Clear
          </button>
          <button
            type="submit"
            className="btn btn-block submit-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddJobs;
