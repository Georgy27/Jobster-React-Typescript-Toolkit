import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "./Job.styles";
import { useAppDispatch } from "../../hooks/redux";
import { JobsArray } from "../../Models/JobData";
import JobInfo from "../JobInfo/JobInfo";
import moment from "moment";
const Job = ({
  _id,
  position,
  company,
  jobLocation,
  createdAt,
  status,
  jobType,
}: JobsArray) => {
  const dispatch = useAppDispatch();

  const date = moment(createdAt).format("MMM Do, YYYY"); 
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => console.log("edit job")}
            >
              Edit
            </Link>
            <button
              className="btn delete-btn"
              type="button"
              onClick={() => console.log("delete job")}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
