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
      username: "",
      email: "",
      password: ""
    }
  );

  const [btndisabled, setBtndisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const signUp = async (e: any) => {
    e.preventDefault();
    console.log("User:", user);
    try {
      setLoading(true);
      const data = await axios.post("/api/users/signup", user);
      console.log("Data:", data);
      setLoading(false);
      console.log(data.data.error);
      console.log(data.data);
      router.push("/login");
    } catch (error:any) {
      toast.error(error.response.data.error);
      console.log(error.response.data.error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setBtndisabled(false);
    } else {
      setBtndisabled(true);
    }
  }, [user]);

  return (
    <div>
      <h2>{loading ? "Processing" : "Sign UP"}</h2>
      <form onSubmit={signUp}>
        <input type="text" placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
        <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input type="password" placeholder="Password"  value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <button type="submit" onClick={signUp} className=' p-3 bg-amber-200 cusor-pointer'>{btndisabled ? "No Sign Up" : "Sign Up"}</button>
      </form>
      <div><Link href="/login">Already have an account! Login now</Link></div>
    </div>
  )
}
