"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { login } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login.module.css";
import logo from "/public/assets/images/logo.png";
import image from "/public/assets/images/dashboard.png";
import emailIcon from "/public/assets/icons/mail.svg";
import lockIcon from "/public/assets/icons/lock.svg";
import eyeIconClosed from "/public/assets/icons/eye-closed.svg";
import 'bootstrap/dist/css/bootstrap.css';
import  eyeIconOpen from "/public/assets/icons/eye-open.svg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize useRouter
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Convert form data to plain object
    const formData = {
      email,
      password,
    };

    const result = await login(formData);
    console.log(result);
    if (result === 'Success') {
      router.push("/map");
    } else {
      setError(result);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.loginLogo}>
          <Image src={logo} alt="Logo" />
        </div>
        <div className={styles.loginForm}>
          <div className={styles.signIn}>
            <h2>Sign In</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputWithIcon}>
                <Image
                  src={emailIcon}
                  alt="Email Icon"
                  width={17}
                  height={17}
                  className={styles.leftIcon}
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWithIcon}>
                <Image
                  src={lockIcon}
                  alt="Password Icon"
                  width={17}
                  height={17}
                  className={styles.leftIcon}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                <Image
                  src={showPassword ? eyeIconOpen : eyeIconClosed}
                  alt="Eye Icon"
                  width={17}
                  height={17}
                  className={styles.rightIcon}
                />
                </button>
              </div>
            </div>
            {error != "" && (
              <div className="alert alert-dark" role="alert">
                {error}
              </div>
            )}
            <div className={styles.options}>
              {/* <label>
                <input type="checkbox" />
                <span>Remember me</span>
              </label> */}
              <Link href="/forgot-password">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className={styles.loginButton}
              // formAction={login}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className={styles.loginImage}>
        <Image src={image} alt="dashboard-img" className={styles.dashImg} />
        <div className={styles.signText}>
          <h2>Sign in to your Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
