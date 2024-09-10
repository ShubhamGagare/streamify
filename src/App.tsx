import React from "react";
import Dashboard from "./components/Dashboard";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <>
      <div className="flex h-screen">
      <Sidebar className="hidden lg:flex w-56 bg-purple-950 text-secondary rounded-r-2xl px-2 min-h-screen" />
      <Dashboard />
      </div>
    </>
  )
}