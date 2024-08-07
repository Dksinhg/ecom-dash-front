import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMain } from "../../hook/useMain";


const Login = () => {
  const navigate = useNavigate();
  const { login } = useMain();
  const [formdata, setFromData] = useState({email:"", password:""});

  const handlechange = (e) => {
    // setFromData((predata) => ({
    //   ...predata,
    //   [e.target.value]: e.target.value,
    // }));
    const { name, value } = e.target;
    setFromData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Submitdata = async(e) => {
    e.preventDefault();
    // console.log(formdata)
    const {email, password} = formdata;

    const data = await login({email, password});
    if (data && data.token) {
      localStorage.setItem("ecomtoken", JSON.stringify({token:data.token}))
      console.log("login successfully", data)
      navigate("/")
    }
    else{
      console.log("login is failed")
    }
  };

  return (
    <>
      <div id="form-container">
        <div className="container">
          <div className="sub-container">
            <h2>Login Form</h2>
            <form action="" onClick={Submitdata}>
              <div id="">
                <div className="form-group">
                  <div>
                    <label htmlFor="email">
                      Email / name <span className="star">*</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handlechange}
                      value={formdata.email}
                      required
                    />
                  </div>
                </div>
              </div>
              <div id="">
                <div className="form-group">
                  <div>
                    <label htmlFor="conform_password">
                      Enter your password <span className="star">*</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="password"
                      id="conform_password"
                      name="password"
                      onChange={handlechange}
                      value={formdata.password}
                      required
                    />
                  </div>
                </div>
              </div>
              <div id="button">
                <div className="button">
                  <button type="submit">Login</button>
                </div>
              </div>
              <span id="spantag">
                Don't have an account?{" "}
                <Link to="/signup">
                  <span id="signlogin">Sign up</span>
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
