import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import { FADE_APPEAR_DELAYED_ANIMATION_VARIANTS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Card({
  title,
  description,
  demo,
  large,
}: {
  title: string;
  description: string;
  demo: ReactNode;
  large?: boolean;
}) {
  return (
    <div
      className={`card animate__animated animate__fadeIn animate__delay-2s relative col-span-1 h-60 overflow-hidden rounded-xl border border-gray-200 bg-amber-50 p-10 shadow-md ${
        large ? "md:col-span-2" : ""
      }`}
    >
      <div className="mx-auto max-w-md text-center">
        <h2 className="mx-auto bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
          <Balancer>{title}</Balancer>
        </h2>
        <div className="prose-sm -mt-2 leading-normal text-gray-500 md:prose">
          <Balancer>
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                    className="font-medium text-gray-800 underline transition-colors"
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    {...props}
                    // @ts-ignore (to fix "Received `true` for a non-boolean attribute `inline`." warning)
                    inline="true"
                    className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800"
                  />
                ),
              }}
            >
              {description}
            </ReactMarkdown>
          </Balancer>
        </div>
        <div className="flex h-20 items-center justify-center">{demo}</div>
      </div>
    </div>
  );
}
