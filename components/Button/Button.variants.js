import { cva } from "class-variance-authority";

const ButtonStyles = cva(
  /* button base style */
  "h-fit border-2 transition-colors duration-150 font-secondary text-sm md:text-base flex justify-center items-center disabled:hover:bg-gray-300 disabled:hover:text-gray-500 disabled:cursor-not-allowed capitalize rounded-lg flex  font-medium hover:font-semibold",
  {
    variants: {
      /* button colors */
      intent: {
        primary:
          "bg-primary border-primary text-white hover:bg-white hover:text-primary",
        secondary:
          "bg-secondary border-secondary text-white hover:bg-white hover:text-secondary hover:border-secondary",
        tertiary:
          "bg-white border-primary text-primary hover:bg-primary hover:text-white",
        default:
          "bg-secondary text-white hover:bg-white hover:text-secondary border-secondary",
      },

      /* button sizes */
      size: {
        full: "w-full",
        half: "w-1/2",
        fit: "w-fit",
      },

      /* button padding */
      padding: {
        tight: "p-1",
        normal: "p-2",
        wide: "p-4",
      },
    },

    // defaults
    defaultVariants: {
      intent: "default",
      size: "full",
      padding: "normal",
    },
  }
);

export default ButtonStyles;
