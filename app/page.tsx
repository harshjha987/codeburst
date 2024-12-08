"use client"

import { Button } from "@/components/ui/button";

export default function Home() {
  function handleClick(){
    alert('Arun is gadh!')
  }

  return (
    <Button onClick={handleClick}>Hello</Button>
  );
}
