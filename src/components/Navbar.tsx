import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
        },
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={navRef} className="fixed top-0 z-[999] w-full bg-base-dark">
      <div className="mx-auto container px-4 h-16 flex items-center justify-between">
        <div
          className="font-extrabold text-lg space-x-1 font-header cursor-pointer hover-scale"
          onClick={() => navigate("/")}
        >
          <span className="tracking-widest text-cyan-500">Bas</span>
          <span className="text-base-white">Portfolio</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
