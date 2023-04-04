import React from "react";
import { useSelector } from "react-redux";
import "./UserProfile.css";

function UserProfile() {
  const user = useSelector((state) => state.user);

  return (
    <div className="user-profile">
      <div className="tag">
        <h2>User Profile</h2>
      </div>
      <form>
        <label>
          First Name:
          <input type="text" value={user.fname} disabled/>
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={user.lname} disabled />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={user.email} disabled />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={user.contact} disabled />
        </label>
        <br />
        <label>
          Country:
          <input type="text" value={user.country} disabled/>
        </label>
        <br />
        <label>
          Address:
          <textarea value={user.address} disabled/>
        </label>
      </form>
    </div>


  

  );
}

export default UserProfile;
