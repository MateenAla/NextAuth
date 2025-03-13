import React from "react";

export default function page({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1>Profile</h1>
      <h2 className="p-3 rounded-2xl bg-emerald-700">{params.id}</h2>
    </div>
  );
}
