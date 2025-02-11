import * as React from "react";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define variants for the card container
const cardVariants = cva(
  "relative overflow-hidden rounded-lg shadow-md flex items-center justify-center",
  {
    variants: {
      // These classes control the overall grid placement, height, and aspect ratio.
      cardSize: {
        large: "col-span-2 md:col-span-4 row-span-2 h-[300px] aspect-w-1 aspect-h-1",
        small: "col-span-4 md:col-span-2 row-span-2 h-[300px] aspect-w-1 aspect-h-1",
      },
    },
    defaultVariants: {
      cardSize: "large",
    },
  }
);

const BubbleCard = React.forwardRef(
  (
    {
      className,
      cardSize, // "large" or "small"
      bubbleVariant, // "default", "small", or "smallWithBubbles"
      title,
      BubbleColor= { background: "rgba(92, 149, 255, 0.3)" },
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
        className={cn(cardVariants({ cardSize, className }))}
        // style={{ background: "rgba(92, 149, 255, 0.3)" }}    
        style={ cardColor }    
        {...props}
      >
        {/* Render bubble elements based on the bubbleVariant prop */}
        {bubbleVariant === "default" && (
          <>

            {/* small circle */}
            <div
                    className="absolute right-16 top-3 w-20 h-20 rounded-full  "
                    // style={{
                    //   background: "rgba(92, 149, 255, .3)",
                    // }}
                    style={BubbleColor}

                  ></div>

                  {/* medium circle */}
                  <div
                    className="absolute top-15 right-16 w-32 h-32 rounded-full  "
                    // style={{
                    //   background: "rgba(92, 149, 255, .3)",
                    // }}
                    style={BubbleColor}

                  ></div>

                  {/* large circle */}
                  <div
                    className="absolute -right-16 top-0 w-40 h-40 rounded-full  "
                    // style={{
                    //   background: "rgba(92, 149, 255, .3)",
                    // }}
                    style={BubbleColor}

                  ></div>

                  {/* bottom circle */}
                  <div
                    className="absolute -right-2 -bottom-16 w-48 h-48 rounded-full  "
                        // style={{
                        // background: "rgba(92, 149, 255, .3)",
                        // }}
                    style={BubbleColor}
                  ></div>

          </>
        )}
        {bubbleVariant === "small" && (
          <>
            upp
            <div
              className="absolute -right-14 -top-2 w-32 h-32 rounded-full"
            //   style={{ background: "rgba(92, 149, 255, 0.3)" }}
            style={BubbleColor}
            />
            <div
              className="absolute -top-12 right-8 w-32 h-32 rounded-full"
            //   style={{ background: "rgba(92, 149, 255, 0.3)" }}
            style={BubbleColor}
            />
          </>
        )}
        {bubbleVariant === "smallWithBubbles" && (
          <>
            <div
              className="absolute -right-16 top-0 w-40 h-40 rounded-full"
            //   style={{ background: "rgba(92, 149, 255, 0.3)" }}
            style={BubbleColor}
            />
            <div
              className="absolute -top-12 right-6 w-40 h-40 rounded-full"
            //   style={{ background: "rgba(92, 149, 255, 0.3)" }}
            style={BubbleColor}
            />
          </>
        )}

        {/* Main image */}
        <div
          className={
            cardSize === "large"
              ? "w-60 h-60 absolute top-0 left-1"
              : "w-44 h-48 absolute top-4 -left-4"
          }
        >
          <Image src={image} alt={title} layout="fill" />
        </div>

        {/* Title and SubHeading */}
        <div
          className={
            cardSize === "large"
              ? "absolute bottom-4 right-16 text-end"
              : "absolute bottom-4 right-8 text-end"
          }
        >
          <h1 className="text-xl">{title}</h1>
          <p className="text-sm">{subHeading}</p>
        </div>
      </div>
    );
  }
);
BubbleCard.displayName = "BubbleCard";

export { BubbleCard, cardVariants };
