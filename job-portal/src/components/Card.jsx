
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  //  console.log(data);
  const { jobId, imageUrl, jobTitle, companyName, jobLocation, employmentType, minSalary, maxSalary, jobPostingDate, description } = data;
  return (
    <div>
      <section className="card">
        <Link to={`/jobs/${jobId}`} className="flex gap-4 flex-col sm:flex-row items-start">
          <img src={imageUrl} alt={jobTitle} className="w-16 h-16 mb-4" />
          <div className="card-details">
            <h4 className="text-primary mb-1">{companyName}</h4>
            <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>

            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2"><FiMapPin /> {jobLocation}</span>
              <span className="flex items-center gap-2"><FiClock /> {employmentType}</span>
              <span className="flex items-center gap-2"><MdCurrencyRupee /> {minSalary}-{maxSalary} LPA</span>
              <span className="flex items-center gap-2"><FiCalendar /> {jobPostingDate}</span>
            </div>

            <p className="text-base text-primary/70 ">{description}</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Card;
