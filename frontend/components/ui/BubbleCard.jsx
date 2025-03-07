import * as React from "react";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";



// Define variants for the card container
const cardVariants = cva(
  "relative overflow-hidden rounded-lg shadow-md flex items-center justify-center ",
  {
    variants: {
      // These classes control the overall grid placement, height, and aspect ratio.
      cardSize: {
        large:
          "col-span-4 md:col-span-4 row-span-2 h-[300px] aspect-w-1 aspect-h-1",
        small:
          "col-span-2 md:col-span-2 row-span-2 h-[300px] aspect-w-1 aspect-h-1",
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
      bubbleVariant, // "default", "small", or "normal"
      title,
      BubbleColor = { background: "rgba(92, 149, 255, 0.3)" },
      subHeading,
      cardColor = { background: "rgba(92, 149, 255, 0.3)" },
      image, // image path
      bold = false,
      type="normal",
      discription,
      ...props
    },
    ref
  ) => {
    return (
      <Dialog className="w-full">
          <DialogTrigger asChild>

        
      <div
        ref={ref}
        className={cn(cardVariants({ cardSize, className }) ," ") }
        // style={{ background: "rgba(92, 149, 255, 0.3)" }}
        style={cardColor}
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
        {bubbleVariant === "normal" && (
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
        {type === 'resources' ? (
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
        <div
          className={"text-end absolute bottom-3 right-2 md:right-8 "}>
          {bold == true ? (
            <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
          ) : (
            <h1 className="text-lg leading-5 mb-1 md:text-xl">{title}</h1>
          )}
          <p className="text-sm leading-5">{subHeading}</p>
        </div>
      </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md md:w-full bg-red-50">
      <DialogHeader>
        <DialogTitle>
              { title }
        </DialogTitle>
        <DialogDescription>
            {discription}
        </DialogDescription>

      </DialogHeader>

      </DialogContent>

      </Dialog>
    );
  }
);
BubbleCard.displayName = "BubbleCard";

export { BubbleCard, cardVariants };
