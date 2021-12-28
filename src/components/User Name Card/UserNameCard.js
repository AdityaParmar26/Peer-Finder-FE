import React from "react";
import './UserNameCard.css';
import profileImage from '../../Images/user-profile-image.png';

const UserNameCard = (props) => {

  return (
    <div className="user_card_wrapper">
        <div className="user_card">
            <div className="user_image">
                <img src={profileImage} alt="ProfileImage" />
            </div>

            <div className="user_info1">
                <div className="user_name">
                    {props.user.first_name} {props.user.last_name}
                </div>

                <div className="user_bio">
                    {props.user.bio}
                </div>

                <div className="user_sub_section">
                    {props.user.email}
                </div>

                <div className="user_sub_section">
                    Passing Year - {props.user.year_of_passing}
                </div>


            </div>
        </div>
    </div>
    
  );
};

export default UserNameCard;
