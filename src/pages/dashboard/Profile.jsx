import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isStyledComponent } from "styled-components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRow from "../../components/FormRow";
import { updateUser } from "../../feature/user/userSlice";

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    location: user?.location || "",
  });
  const { name, lastName, email, location } = userData;

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !lastName || !email || !location) {
      toast.error("Please Fill Out All Fields");
      return;
    }

    dispatch(updateUser(userData));
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
