import '../styles/profile-card.css';
import data from "../data/profile-card-data.json";

const ProfileCard = () => {

  return (
    <div>
      <h1>Profile Card</h1>
    <div className='profile-card'>
      {
        data?.map((val: Data, index: number) => (
          <div className="card-container" key={index}>
            <span className={val.online ? "pro" : "pro offline"}>{val.online ? "online" : "offline"}</span>
            <img className='img' src={val.profile} alt="" />
            <h3>{val.name}</h3>
            <h3>{val.city}</h3>
            <p>{val.description}</p>
            <div className='buttons'>
              <button className='btn'>message</button>
              <button className='btn outline'>following</button>
            </div>
            <div className='skills'>
              <h6>Skills</h6>
              <ul>
                {
                  val.skills.map((skill: string,i: number)=>(
                    <li key={i}>{skill}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        ))
      }
    </div>
    </div>
  )
}

interface Data{
  name: string;
  city: string;
  description: string;
  skills: string[];
  profile: string;
  online: boolean;
}

export default ProfileCard