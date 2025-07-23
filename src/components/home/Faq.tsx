import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function Faq() {
  return (
    <div className="w-full px-6 lg:px-0 min-h-screen relative border-l-[1px] border-r-[1px] border-border py-12">
        <div id='title' className='w-full py-8 flex justify-center'>
            <h2 className="font-semibold text-center mb-6 relative z-20 py-6 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white">
            Have Questions? <br /> We got Answers
            </h2>
        </div>

        <Accordion
            type="single"
            collapsible
            className="w-full max-w-4xl mx-auto"
            defaultValue="item-1"
        >
        <AccordionItem value="item-1">
            <AccordionTrigger className="!text-lg">What services do you offer?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-neutral-900 dark:text-neutral-400">
                We specialize in web development, mobile app creation, digital marketing, 
                and custom software development. Our team delivers modern, scalable solutions 
                tailored to your business needs.
            </p>
            <p className="text-neutral-900 dark:text-neutral-400">
                From startup launches to enterprise-level projects, we handle everything 
                from design and development to deployment and ongoing support.
            </p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger className="!text-lg">How long does a typical project take?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-neutral-900 dark:text-neutral-400">
                Project timelines vary based on complexity and scope. Simple websites 
                typically take 2-4 weeks, while complex web applications or mobile apps 
                can take 8-16 weeks.
            </p>
            <p className="text-neutral-900 dark:text-neutral-400">
                We provide detailed project timelines during consultation and keep you 
                updated throughout the development process with regular milestones and progress reports.
            </p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
            <AccordionTrigger className="!text-lg">What&apos;s your pricing structure?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-neutral-900 dark:text-neutral-400">
                Our pricing depends on project scope, complexity, and timeline. We offer 
                both fixed-price packages for standard projects and hourly rates for 
                custom development work.
            </p>
            <p className="text-neutral-900 dark:text-neutral-400">
                We provide transparent quotes with no hidden fees and offer flexible 
                payment plans to accommodate different budgets and business needs.
            </p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
            <AccordionTrigger className="!text-lg">Do you provide ongoing support after project completion?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-neutral-900 dark:text-neutral-400">
                Yes, we offer comprehensive post-launch support including bug fixes, 
                security updates, and feature enhancements. Our maintenance packages 
                ensure your digital assets stay current and secure.
            </p>
            <p className="text-neutral-900 dark:text-neutral-400">
                We also provide training sessions for your team and documentation 
                to help you manage your new system effectively.
            </p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
            <AccordionTrigger className="!text-lg">What technologies do you work with?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-neutral-900 dark:text-neutral-400">
                We work with modern technologies including React, Next.js, Node.js, 
                React Native, and various databases. We stay updated with the latest 
                trends to deliver cutting-edge solutions.
            </p>
            <p className="text-neutral-900 dark:text-neutral-400">
                Our tech stack is chosen based on your project requirements to ensure 
                optimal performance, scalability, and maintainability.
            </p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
            <AccordionTrigger className="!text-lg">How do we get started with a project?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-neutral-900 dark:text-neutral-400">
                Getting started is simple - contact us for a free consultation where 
                we&apos;ll discuss your project goals, requirements, and timeline. We&apos;ll 
                then provide a detailed proposal and project roadmap.
            </p>
            <p className="text-neutral-900 dark:text-neutral-400">
                Once approved, we begin with discovery and planning phases, followed 
                by design mockups and development sprints with regular check-ins.
            </p>
            </AccordionContent>
        </AccordionItem>
        </Accordion>
    </div>
  )
}

export default Faq;