import React from 'react'
import Link from 'next/link'
import {
  ReactIcon,
  NextJSIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  VSCodeIcon,
  FigmaIcon,
  GitHubIcon,
  NotionIcon,
  TailwindIcon,
  VercelIcon,
  SlackIcon,
  HostingerIcon,
  GoogleIcon,
  DiscordIcon,
  WebflowIcon,
  DockerIcon,
  MongoDBIcon,
  AdobeIcon,
  WordPressIcon
} from '@/components/ui/icons'
import { OrbitIcon, OrbitRing, TechStackHeader, TechStackContainer } from '@/components/ui/orbit-components'

function TechStack() {
  const techLinks = [
    { href: "https://nextjs.com", text: "Next.js" },
    { href: "https://react.dev", text: "React" },
    { href: "https://tailwindcss.com", text: "Tailwind CSS" },
    { href: "https://www.typescriptlang.org", text: "TypeScript" }
  ]

  const description = (
    <>
      Our team leverages cutting-edge technologies like{' '}
      {techLinks.map((link, index) => (
        <span key={link.href}>
          <Link 
            href={link.href}
            className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-all duration-200 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.text}
          </Link>
          {index < techLinks.length - 2 ? ', ' : index === techLinks.length - 2 ? ', and ' : ''}
        </span>
      ))}
      {' '}to build exceptional digital experiences that drive results.
    </>
  )

  return (
    <section className="py-32 border-l-[1px] border-r-[1px] border-border">
      <div className="container">
        <TechStackHeader title="Our Tech Stack" description={description} />
        
        <TechStackContainer>
          {/* Inner orbit - 310px radius */}
          <OrbitRing radius={310}>
            <OrbitIcon Icon={NextJSIcon} radius={310} animationDuration={10} rotation={0} animationDelay={0} />
            <OrbitIcon Icon={ReactIcon} radius={310} animationDuration={10} rotation={72} animationDelay={-1.44} />
            <OrbitIcon Icon={JavaScriptIcon} radius={310} animationDuration={10} rotation={144} animationDelay={-2.88} />
            <OrbitIcon Icon={VSCodeIcon} radius={310} animationDuration={10} rotation={216} animationDelay={-4.32} />
            <OrbitIcon Icon={TailwindIcon} radius={310} animationDuration={10} rotation={288} animationDelay={-5.76} />
          </OrbitRing>

          {/* Middle orbit - 390px radius */}
          <OrbitRing radius={390}>
            <OrbitIcon Icon={TypeScriptIcon} radius={390} animationDuration={15} rotation={0} animationDelay={0} reverse />
            <OrbitIcon Icon={FigmaIcon} radius={390} animationDuration={15} rotation={90} animationDelay={-3.75} reverse />
            <OrbitIcon Icon={GitHubIcon} radius={390} animationDuration={15} rotation={180} animationDelay={-7.5} reverse />
            <OrbitIcon Icon={VercelIcon} radius={390} animationDuration={15} rotation={270} animationDelay={-11.25} reverse />
          </OrbitRing>

          {/* Third orbit - 470px radius */}
          <OrbitRing radius={470}>
            <OrbitIcon Icon={NotionIcon} radius={470} animationDuration={20} rotation={0} animationDelay={0} />
            <OrbitIcon Icon={SlackIcon} radius={470} animationDuration={20} rotation={72} animationDelay={-4} />
            <OrbitIcon Icon={WebflowIcon} radius={470} animationDuration={20} rotation={144} animationDelay={-8} />
            <OrbitIcon Icon={DockerIcon} radius={470} animationDuration={20} rotation={216} animationDelay={-12} />
            <OrbitIcon Icon={MongoDBIcon} radius={470} animationDuration={20} rotation={288} animationDelay={-16} />
          </OrbitRing>

          {/* Outer orbit - 550px radius */}
          <OrbitRing radius={550}>
            <OrbitIcon Icon={DiscordIcon} radius={550} animationDuration={25} rotation={0} animationDelay={0} reverse />
            <OrbitIcon Icon={HostingerIcon} radius={550} animationDuration={25} rotation={60} animationDelay={-4.17} reverse />
            <OrbitIcon Icon={GoogleIcon} radius={550} animationDuration={25} rotation={120} animationDelay={-8.33} reverse />
            <OrbitIcon Icon={AdobeIcon} radius={550} animationDuration={25} rotation={180} animationDelay={-12.5} reverse />
            <OrbitIcon Icon={WordPressIcon} radius={550} animationDuration={25} rotation={240} animationDelay={-16.67} reverse />
            <OrbitIcon Icon={ReactIcon} radius={550} animationDuration={25} rotation={300} animationDelay={-20.83} reverse />
          </OrbitRing>
        </TechStackContainer>
      </div>
    </section>
  )
}

export default TechStack