// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import axios from 'axios';
// import Link from 'next/link';
// // import { useRouter } from 'next/router';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react'

// export default function page() {

//     const router = useRouter();
//     const [token, setToken] = useState("");
//     const [verfied, setVerified] = useState(false);
//     const [error, setError] = useState(false);

//     const verifyEmail = async () => {
//         try {
//             await axios.post(`/api/users/verifyemail`,{token});
//             console.log("Response:",);
//             // setVerified(true);
//         } catch (error: any) {
//             console.log("Error:", error.response.data.error);
//             setError(true);
//         }
//     }

//     useEffect(() => {
//         // const token = router.query.token as string;
//         const token = window.location.search.split("=")[1];
//         setToken(token || "");
//         // verifyEmail();
//     }, []);

//     useEffect(() => {
//         if (verfied) {
//             setTimeout(() => {
//                 router.push("/login");
//             }, 3000);
//         }
//     }, [verfied]);
//     useEffect(() => {
//         if (token.length > 0) {
//             verifyEmail();
//         }
//     }, [token]);
//   return (
//     <div>
//       <h2>Verify Email</h2>
//       <p>Check your email to verify your account</p>
//       {token ? `${token}` : <p>Token not found</p>}
//       {token && <p>Verifying...</p>}
//         {error && <p>Something went wrong. Please try again</p>}
//         {verfied && <p>Your email has been verified successfully</p>}
//         {verfied && <Link href="/login">Login Now</Link>}
//     </div>
//   )
// }


/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  // Function to verify email
  const verifyEmail = async (token: string) => {
    try {
      await axios.get(`/api/users/verifyemail?token=${token}`);
      setVerified(true);
      setError(false);
    } catch (err: any) {
      console.error("Error:", err?.response?.data?.error || err.message);
      setError(true);
    }
  };

  // Extract token from URL and verify email
  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    setToken(tokenFromUrl);

    if (tokenFromUrl) {
      verifyEmail(tokenFromUrl);
    }
  }, []);

  // Redirect after successful verification
  useEffect(() => {
    if (verified) {
    //   setTimeout(() => {
    //     router.push("/login");
    //   }, 3000);
    }
  }, [verified, router]);

  return (
    <div>
      <h2>Verify Email</h2>
      <p>Check your email to verify your account</p>
      {token ? <p>Token: {token}</p> : <p>Token not found</p>}
      {token && <p>Verifying...</p>}
      {error && <p>Something went wrong. Please try again.</p>}
      {verified && <p>Your email has been verified successfully!</p>}
      {verified && <Link href="/login">Login Now</Link>}
    </div>
  );
}
