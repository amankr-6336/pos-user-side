import PropTypes from "prop-types";
import classnames from "classnames";
import "./Button.scss";

const Button = ({
  type = "primary",
  variant,
  size = "medium",
  className,
  disabled = false,
  icon,
  iconPosition = "left",
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classnames("button", className, type, variant, size, {
        "button-disabled": disabled,
      })}
    >
      {icon && iconPosition === "left" && (
        <span className="icon-left">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="icon-right">{icon}</span>
      )}
    </button>
  );
};


Button.propTypes = {
    type: PropTypes.string, // 'type' prop should be a string
    variant: PropTypes.string, // 'variant' prop should be a string
    icon: PropTypes.node, // icon should be a valid React node (component or JSX)
    size: PropTypes.oneOf(["small", "medium", "large"]),
    iconPosition: PropTypes.oneOf(["left", "right"]), // Either "left" or "right"
    className: PropTypes.string, // 'className' prop should be a string
    disabled: PropTypes.bool, // 'disabled' prop should be a boolean
    fullWidth: PropTypes.bool, // 'fullWidth' prop should be a boolean
    onClick: PropTypes.func, // 'onClick' prop should be a function
    children: PropTypes.node // 'children' can be anything renderable
  };

  Button.defaultProps = {
    onClick: () => {}, // Default onClick is a no-op function
    size: "medium"
  };
  
  export default Button;