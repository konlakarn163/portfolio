import { useLayoutEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  const ballRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });

    const ball = ballRef.current;
    
    const checkIsDesktop = () => window.innerWidth >= 1024;

    const onMouseMove = (e: MouseEvent) => {
      if (!checkIsDesktop()) {
        if (ball) ball.style.opacity = "0";
        return;
      }

      if (ball) {
        ball.style.opacity = "1";
        const xSetter = gsap.quickSetter(ball, "x", "px");
        const ySetter = gsap.quickSetter(ball, "y", "px");
        xSetter(e.clientX);
        ySetter(e.clientY);

        const target = e.target as HTMLElement;
        const isOverImage = target.tagName.toLowerCase() === "img" || target.closest("img") || target.closest(".no-blend-zone");
        const isHoverable = target.tagName.toLowerCase() === "a" || target.tagName.toLowerCase() === "button" || target.closest("a") || target.closest("button") || target.closest(".hover-scale");

        if (isOverImage) {
          gsap.to(ball, { mixBlendMode: "normal", backgroundColor: "rgba(255, 255, 255, 0.2)", scale: 0.8, duration: 0.3 });
        } else if (isHoverable) {
          gsap.to(ball, { mixBlendMode: "difference", backgroundColor: "rgb(255, 255, 255)", scale: 2.5, duration: 0.3 });
        } else {
          gsap.to(ball, { mixBlendMode: "difference", backgroundColor: "rgb(255, 255, 255)", scale: 1, duration: 0.3 });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      smoother.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={ballRef}
        className="fixed top-0 left-0 w-16 h-16 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ opacity: 0 }} 
      />

      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="min-h-screen relative flex flex-col">
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}