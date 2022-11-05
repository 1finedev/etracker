import { cva } from "class-variance-authority";

const CardStyles = cva(
    'flex bg-white transition-all duration-150 rounded-lg',
    {
        variants: {
            //flex direction
            flexDisplay: {
                row: 'flex-row',
                col: 'flex-col'
            },

            //children spacing
            spacing: {
                compact: 'gap-2',
                normal: 'gap-4',
                wide: 'gap-8'
            },

            //padding
            padding: {
                compact: 'p-1 md:p-2 lg:p-4',
                normal: 'p-2 md:p-4 lg:p-6',
                wide: '@apply p-4 md:p-6 lg:p-8'
            },

            // shadows
            hasShadow: {
                true: 'border-gray-100 border-[1px]'
            },
            shadow: {
                null: 'shadow-none',
                small: 'shadow-sm',
                normal: 'shadow-md'
            },

            // is clickable 
            isClickableCard: {
                true: 'hover:cursor-pointer hover:border-primary border-2'
            }
        },
        defaultVariants: {
            flexDisplay: "row",
            spacing: "normal",
            padding: "normal",
            shadow: "normal",
            isClickable: false,
        }
    },
);

export default CardStyles;