import { cva } from 'class-variance-authority';

const AlertStyles = cva(
    "alert flex items-center transform -translate-x-1/2 max-w-[30rem] w-screen pl-6 pr-3 py-3 bg-background rounded-md shadow-md overflow-hidden !z-[100000];",

    {
        /* variants */
        variants: {
            intent: {
                success: "bg-green-200 text-green-600",
                info: "bg-sky-200 text-sky-600",
                warning: "bg-yellow-200 text-yellow-600",
                error: "bg-red-200 text-red-600"
            }
        },

        /* default variants */
        defaultVariants: {
            intent: "info"
        }
    }
);

const AlertDurationBarStyles = cva(
    "duration-bar h-1 w-full bg-secondary absolute bottom-0 left-0",

    {
        /* variants */
        variants: {
            intent: {
                success: "bg-green-800",
                info: "bg-sky-800",
                warning: "bg-yellow-800",
                error: "bg-red-800"
            }
        },

        /* default variants */
        defaultVariants: {
            intent: "info"
        }
    }
)

export { AlertStyles, AlertDurationBarStyles };