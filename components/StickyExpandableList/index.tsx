"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { OrangeMouseIcon } from "../icons/OrangeMouseIcon";
import Link from "next/link";

export default function ExpandableItem() {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef(null);
  const contentRef = useRef(null);

  const toggle = () => {
    setIsOpen((prev) => !prev);

    gsap.to(contentRef.current, {
      height: isOpen ? 0 : "auto", // nội dung mở ra hoặc thu lại
      opacity: isOpen ? 0 : 1,
      duration: 0.2,
      ease: "power2.inOut",
    });

    gsap.to(itemRef.current, {
      height: isOpen ? 40 : 464, // item container tăng chiều cao khi mở
      boxShadow: isOpen
        ? "0 2px 6px rgba(0,0,0,0.1)"
        : "0 10px 20px rgba(0,0,0,0.15)", // nâng lên khi mở
      duration: 0.2,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={itemRef}
      onClick={toggle}
      className="fixed left-2.5 bottom-2.5 4xl:left-5 4xl:bottom-5 z-50"
      style={{
        width: 230,
        height: 40,
        background: "#fff",
        borderRadius: 8,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {/* Title luôn ở trên */}
      <div className="py-3 px-2 flex items-center justify-between overflow-hidden">
        <Image
          src="/images/login-io.png"
          alt="Login IO"
          width={84}
          height={27}
          sizes="(min-width:1200px) 84px, (min-width:810px) 84px, 84px"
        />
        {isOpen ? (
          <div
            className="w-4 h-0.5"
            style={{
              backgroundColor:
                "var(--token-f7cf9729-d08f-41d5-bfc8-5a8a7f945495, rgb(43, 48, 59))",
              borderRadius: 49,
              transform: "none",
              transformOrigin: "50% 50% 0px",
            }}
          ></div>
        ) : (
          <div className="w-4 h-4">
            <OrangeMouseIcon />
          </div>
        )}
      </div>

      {/* Nội dung ẩn */}
      <div
        ref={contentRef}
        style={{
          height: 0,
          overflow: "hidden",
          opacity: 0,
        }}
      >
        <Link href="https://xlogin.io" target="_blank">
          <Image
            src="/images/anonymous-browser.png"
            alt="Anonymous Browser"
            width={230}
            height={416}
            sizes="(min-width:1200px) 230px, (min-width:810px) 230px, 230px"
          />
        </Link>
      </div>
    </div>
  );
}
