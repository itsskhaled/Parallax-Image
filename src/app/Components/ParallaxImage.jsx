"use client";
import Image from "next/image";
import KhaledImage from "@/app/Image/Khaled.jpg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
export default function ParallaxImage() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        const container = containerRef.current;
        const image = imageRef.current;

        gsap.from(image, {
            height: "0%",
            scale: 0,
            opacity: 0,
            duration: 2,
            ease: "power4.out",
        })
        const maxMove = 150;
        const maxRotate = 10;

        container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const progressX = mouseX / rect.width;
            const progressY = mouseY / rect.height;

            const mappedX = (progressX - 0.5) * 2;
            const mappedY = (progressY - 0.5) * 2;

            const finalX = mappedX * maxMove;
            const finalY = mappedY * maxMove;
            const rotate = mappedX * maxRotate;

            gsap.to(image, {
                x: finalX,
                y: finalY,
                rotate: rotate,
                duration: 0.6,
                ease: "power3.out"
            })
        })

    }, [])
    return (
        <section ref={containerRef} className="relative w-full h-screen flex justify-center items-center overflow-hidden">
            <div ref={imageRef} className="w-[400px] h-[500px]">
                <Image src={KhaledImage} alt="KHALED" className="w-full h-full object-cover rounded-xl" />
            </div>
        </section>
    );
}