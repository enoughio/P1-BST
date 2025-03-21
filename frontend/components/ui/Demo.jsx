import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Image from "next/image";

const CardVar = cva(
  "relative overflow-hidden rounded-lg shadow-md flex items-center justify-center",
  {
    variants: {
      cardSize: {
        large:
          "col-span-2 md:col-span-4 row-span-2 h-[300px] aspect-w-1 aspect-h-1",
        small:
          "col-span-4 md:col-span-2 row-span-2 h-[300px] aspect-w-1 aspect-h-1",
      },
    },

    defaultVariants: {
      cardSize: "large",
    },
  }
);

const DemoCard = React.forwardRef(
  (
    {
      className,
      cardSize, // "large" or "small"
      bubbleVariant, // "default", "small", or "smallWithBubbles"
      title,
      BubbleColor = { background: "rgba(92, 149, 255, 0.3)" },
      subHeading,
      cardColor = { background: "rgba(92, 149, 255, 0.3)" },
      image, // image path
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(CardVar({ cardSize, className }))}
        style={cardColor}
        {...props}
      >

        {bubbleVariant == "smallWithBubbles" && (
          <>
            <div
              className="absolute -right-16 top-0 w-40 h-40 rounded-full  "
              style={{
                background: "rgba(92, 149, 255, .3)",
              }}
            ></div>
            <div
              className="absolute -top-12 right-6  w-40 h-40 rounded-full  "
              style={{
                background: "rgba(92, 149, 255, .3)",
              }}
            ></div>
          </>
        )}

        {bubbleVariant === "small" && (
          <>
            <div
              className="absolute -right-14 -top-2 w-32 h-32 rounded-full    "
              style={BubbleColor}
            ></div>
            <div
              className="absolute -top-12 right-8  w-32 h-32 rounded-full  "
              //   style={{
              //     background: "rgba(92, 149, 255, .3)",
              //   }}
              style={BubbleColor}
            ></div>
          </>
        )}


        {
            bubbleVariant == 'defult' && (
                 <>
                                  {/* small circle */}
                                  <div
                                    className="absolute right-16 top-3 w-20 h-20 rounded-full  "
                                    style={{
                                      background: "rgba(92, 149, 255, .3)",
                                    }}
                                  ></div>
                
                                  {/* medium circle */}
                                  <div
                                    className="absolute top-15 right-16 w-32 h-32 rounded-full  "
                                    style={{
                                      background: "rgba(92, 149, 255, .3)",
                                    }}
                                  ></div>
                
                                  {/* large circle */}
                                  <div
                                    className="absolute -right-16 top-0 w-40 h-40 rounded-full  "
                                    style={{
                                      background: "rgba(92, 149, 255, .3)",
                                    }}
                                  ></div>
                
                                  {/* bottom circle */}
                                  <div
                                    className="absolute -right-2 -bottom-16 w-48 h-48 rounded-full  "
                                    style={{
                                      background: "rgba(92, 149, 255, .3)",
                                    }}
                                  ></div>
                                </>
            )
        }



        <div className={
            cardSize === "large" ? "w-44 h-48 absolute top-4 -left-4 " : "w-44 h-48 absolute top-4 -left-4"
        }>
          <Image
            src={image}
            alt="Bhopal Storytellers"
            layout="fill"
            className=""
          />
        </div>

        <div className={
            cardSize === "large"
              ? "absolute bottom-4 right-16 text-end"
              : "absolute bottom-4 right-8 text-end"
          }>
          <h1 className="text-xl ">{title}</h1>
          <p className="text-sm">{subHeading}</p>
        </div>
      </div>
    );
  }
);

DemoCard.displayName = "DemoCard";

export { DemoCard, CardVar };