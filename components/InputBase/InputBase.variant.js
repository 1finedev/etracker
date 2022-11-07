import { cva } from "class-variance-authority";

const InputBaseStyles = cva(
  "p-1.5 flex items-center gap-4 rounded-lg border-2 transition-colors duration-150",

  {
    /* variants */
    variants: {
      intent: {
        primary: "bg-white border-gray-100",
        error: "bg-red-50 border-red-500"
      },

      width: {
        full: "w-full",
        half: "w-1/2",
        fit: "w-fit",
      },

      focus: {
        true: "!bg-gray-100 !border-gray-300",
      },
    },

    /* default variants */
    defaultVariants: {
      intent: "primary",
      width: "full",
    },
  }
);

export default InputBaseStyles;
