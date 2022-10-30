import axios from "axios";

const Register = () => {
  // temp function for testing please change
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formEntries = Object.fromEntries(formData.entries());
    const res = await axios.post("/api/createUser", formEntries);
    console.log(res);
  };
  return (
    <div>
      {/* just to test Register and stuff you can delete */}
      <form onSubmit={handleSubmit} className="">
        <input type="text" name="displayName" placeholder="display name" />
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
