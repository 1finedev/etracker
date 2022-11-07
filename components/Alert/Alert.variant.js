import { cva } from 'class-variance-authority';

const AlertDurationBarStyles = cva(
    "duration-bar h-20 w-2 bg-secondary",

    {
        /* variants */
        variants: {
            intent: {
                success: "bg-green-500",
                info: "bg-sky-500",
                error: "bg-red-500"
            }
        },

        /* default variants */
        defaultVariants: {
            intent: "info"
        }
    }
)

export { AlertDurationBarStyles };