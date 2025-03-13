/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me")
      setData(res.data)
      toast.success(res.data.message)
      console.log("Data:", res.data)
    } catch (error: any) {
      toast.error(error.response.data.error)
    }
  }

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      router.push("/login")
    } catch (error: any) {
      toast.error(error.response.data.error)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>Profile</h1>
      {/* <h2>{data}</h2> */}
      <Link href='/'>Home</Link>
      {data === "nothing" ? <h2>No Data</h2> : <h2>{data.message}</h2>}
      {data === "nothing" ? null : <Link href={`/profile/${data.data._id}`}>{data.data._id}</Link>}
      {data === "nothing" ? null : <h2>{data.data._id}</h2>}
      {data === "nothing" ? null : <h2>{data.data.username}</h2>}
      <button onClick={getUserDetails} className='p-3 bg-amber-200 cursor-pointer'>Get User Details</button>
      <button onClick={logout} className='p-3 bg-amber-200 cursor-pointer'>Logout</button>
    </div>
  )
}
