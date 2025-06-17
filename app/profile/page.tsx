"use client";

import { useUser } from "@clerk/nextjs";
import { useSessionData } from "@/app/context/session-context";


export default function ProfilePage() {
  const { user } = useUser();
  const { sessionData } = useSessionData();
  const { addProject } = useSessionData();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 gap-6 p-4 rounded shadow bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}</h1>
      <p className="mb-4">Email: {user.emailAddresses[0].emailAddress}</p>
      <button className="flex items-center space-x-2 bg-[#34A85A] text-white px-4 py-2 rounded-lg hover:bg-[#2d9350] transition-colors" onClick={() => addProject("AI App")}>Add Project</button>
      <hr className="my-4" />
      <h2 className="text-xl font-semibold">Your Session Summary</h2>
      <ul className="list-disc pl-6 mt-2">
        <li>Total Projects: {sessionData.projects.length}</li>
        <li>Total Video Calls Joined: {sessionData.videoCalls.length}</li>
      </ul>
    </div>
  );
}
