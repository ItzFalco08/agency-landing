import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter, Linkedin, Mail, Phone, MapPin, Instagram } from "lucide-react"
import Image from "next/image";

function Footer() {
  return (
    <div className="w-full px-4 py-8 border-l-[1px] border-r-[1px] border-border z-[102]">
      <footer className="max-w-6xl mx-auto bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-border shadow-lg p-8 md:p-12">
        <div className="flex flex-col gap-12 md:gap-none md:flex-row justify-between mb-12">

          {/* Brand Section */}
          <div className="max-w-sm">
            <div className="flex items-center  mb-4">
              <Image src="/images/logo.png" width={36} height={36} alt="logo" />
              <span className="font-medium text-lg">Anovas</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crafting digital experiences that drive results and inspire growth for forward-thinking brands.
            </p>
          </div>


          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:anubhav@weanovas.in" className="hover:underline underline-offset-4 transition-all">anubhav@weanovas.in</a>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />

                <span className="flex flex-col">
                  <a
                    href="tel:+917992193730"
                    className="hover:underline underline-offset-4 transition-all"
                  >
                    +91 79921 93730
                  </a>
                  <a
                    href="tel:+919425478791"
                    className="hover:underline underline-offset-4 transition-all"
                  >
                    +91 94254 78791
                  </a>
                </span>
              </li>

            </ul>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Anovas. All rights reserved.</div>

          <div className="flex items-center space-x-6">
            <a className="text-sm text-muted-foreground" href="https://lordicon.com/">Animated icons by Lordicon.com</a>
            
            <Separator orientation="vertical" className="!h-6 " />

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/anovas.co.in/"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/anovas.co.in/"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>



          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;