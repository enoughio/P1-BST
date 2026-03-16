import * as React from "react";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BubbleCardDetails } from "./BubbleCardDetails";
import { Button } from "./button";
import Link from "next/link";

// Define variants for the card container
const cardVariants = cva(
  "relative overflow-hidden rounded-lg shadow-md flex items-center justify-center",
  {
    variants: {
      cardSize: {
        large:
          "col-span-4 md:col-span-4 row-span-2 h-[300px] aspect-w-1 aspect-h-1 hover:scale-105",
        small:
          "col-span-2 md:col-span-2 row-span-2 h-[300px] aspect-w-1 aspect-h-1 hover:scale-105",
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
      cardSize,
      bubbleVariant,
      title,
      BubbleColor = { background: "rgba(92, 149, 255, 0.3)" },
      subHeading,
      cardColor = { background: "rgba(92, 149, 255, 0.3)" },
      image,
      bold = false,
      type = "normal",
      details,
      ...props
    },
    ref
  ) => {
    return (
      <Dialog className="w-full">
        <DialogTrigger asChild>
          <div
            ref={ref}
            className={cn(
              cardVariants({ cardSize, className }),
              "hover:shadow-lg transition-transform duration-300 ease-out"
            )}
            style={cardColor}
            {...props}
          >
            {/* Render bubble elements based on the bubbleVariant prop */}
            {bubbleVariant === "default" && (
              <>
                <div
                  className="absolute right-16 top-3 w-20 h-20 rounded-full"
                  style={BubbleColor}
                ></div>
                <div
                  className="absolute top-15 right-16 w-32 h-32 rounded-full"
                  style={BubbleColor}
                ></div>
                <div
                  className="absolute -right-16 top-0 w-40 h-40 rounded-full"
                  style={BubbleColor}
                ></div>
                <div
                  className="absolute -right-2 -bottom-16 w-48 h-48 rounded-full"
                  style={BubbleColor}
                ></div>
              </>
            )}
            {bubbleVariant === "small" && (
              <>
                <div
                  className="absolute -right-14 -top-2 w-32 h-32 rounded-full"
                  style={BubbleColor}
                />
                <div
                  className="absolute -top-12 right-8 w-32 h-32 rounded-full"
                  style={BubbleColor}
                />
              </>
            )}
            {bubbleVariant === "normal" && (
              <>
                <div
                  className="absolute -right-16 top-0 w-40 h-40 rounded-full"
                  style={BubbleColor}
                />
                <div
                  className="absolute -top-12 right-6 w-40 h-40 rounded-full"
                  style={BubbleColor}
                />
              </>
            )}

            {/* Main image */}
            {type === "resources" ? (
              <Image
                src={image}
                alt={title}
                width={350}
                height={350}
                style={{ objectFit: "cover" }}
                className="absolute top-4 left-16"
              />
            ) : cardSize === "large" ? (
              <Image
                src={image}
                alt={title}
                width={150}
                height={150}
                style={{ objectFit: "cover" }}
                className="absolute top-4 left-16"
              />
            ) : (
              <Image
                src={image}
                alt={title}
                width={250}
                height={250}
                style={{ objectFit: "cover" }}
                className="absolute top-0 left-0"
              />
            )}

            {/* Title and SubHeading */}
            <div className="text-end absolute bottom-3 right-2 md:right-8">
              {bold ? (
                <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
              ) : (
                <h1 className="text-lg leading-5 mb-1 md:text-xl">{title}</h1>
              )}
              <p className="text-sm leading-5">{subHeading}</p>
            </div>
          </div>
        </DialogTrigger>

        {type !== "resources" && (
          <DialogContent className="sm:max-w-lg md:w-full h-screen bg-red-200 overscroll-auto">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {/* Render the BubbleCardDetails component */}
            <BubbleCardDetails details={details} />

            <Button
              asChild
              variant="outline"
              className="w-1/2 md:min-w-[150px] md:max-w-[150px] h-10 rounded-3xl relative overflow-hidden"
              size="lg"
              style={{
                backgroundColor: "rgba(92, 149, 255, .2)",
              }}
            >
              <div>
                {/* bubbles */}
                <>
                  <div
                    className="absolute -top-2 -right-8 w-16 h-16 rounded-full"
                    style={{
                      backgroundColor: "rgba(92, 149, 255, .2)",
                    }}
                  ></div>
                  <div
                    className="absolute -bottom-5 -right-2 w-16 h-16 rounded-full"
                    style={{
                      backgroundColor: "rgba(92, 149, 255, .2)",
                    }}
                  ></div>
                </>
                <Link href="/membership" className="md:text-md z-10">
                  Register Now
                </Link>
              </div>
            </Button>
          </DialogContent>
        )}
      </Dialog>
    );
  }
);
BubbleCard.displayName = "BubbleCard";

export { BubbleCard, cardVariants };
