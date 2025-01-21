"use client"
import Container from "@/components/Container";
import Theme from "@/components/globals/Theme";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react"


const ModeToggle = () => {
  return (
    <>
    <header className="px-4 h-14 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
      <Container reverse>
        <div className="flex items-center justify-between h-full mx-auto md:max-w-screen-xl">
          <div className="flex items-start">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-medium">CodeBurst</span>
            </Link>
          </div>
          <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ul className="flex items-center justify-center gap-8">
              <Link href="/ide" className="hover:text-foreground/80 text-sm">
                IDE
              </Link>
              <Link
                href="https://github.com/apurvjha123"
                className="hover:text-foreground/80 text-sm"
              >
                About
              </Link>
              <Link href="/docs" className="hover:text-foreground/80 text-sm">
                Docs
              </Link>
              <Link
                href="https://github.com/Chit-Chat-Org/Chit-Chat-Nextjs"
                className="hover:text-foreground/80 text-sm"
              >
                Github
              </Link>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Login
              </Link>
              <Theme/>
            </>
          </div>
        </div>
      </Container>
    </header>
    </>
  )
}

export default ModeToggle;
