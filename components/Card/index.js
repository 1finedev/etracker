import CardStyles from "./Card.variant";

/**
 * @component Reusable Card component.
 */
const Card = ({ children, flexDisplay, spacing, padding, shadow, isClickable, className = '', ...others }) => {
    return (
        <div
            {...others}
            className={CardStyles({ flexDisplay, spacing, padding, shadow, isClickable, class: className })}
        >
            {children}
        </div>
    );
}

export default Card;