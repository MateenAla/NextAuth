/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
export default function page() {

  const router = useRouter();

  const [user, setUser] = useState(
    {
      email: "",
      password: ""
    }
  );

  const [btndisabled, setBtndisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const logIn = async (e: any) => {
    e.preventDefault();
    console.log("User:", user);
    try {
      setLoading(true);
      const data = await axios.post("/api/users/login", user);
      console.log("Data:", data);
      setLoading(false);
      console.log(data.data.error);
      console.log(data.data);
      router.push("/profile");
    } catch (error:any) {
      toast.error(error.response.data.error);
      console.log(error.response.data.error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 ) {
      setBtndisabled(false);
    } else {
      setBtndisabled(true);
    }
  }, [user]);

  return (
    <div>
      <h2>{loading ? "Processing" : "Sign IN"}</h2>
      <form onSubmit={logIn}>
        <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input type="password" placeholder="Password"  value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <button type="submit" onClick={logIn} className=' p-3 bg-amber-200 cusor-pointer'>{btndisabled ? "No Log in" : "Log In"}</button>
      </form>
      <div><Link href="/signup">Create an account! Sign Up now</Link></div>
    </div>
  )
}
