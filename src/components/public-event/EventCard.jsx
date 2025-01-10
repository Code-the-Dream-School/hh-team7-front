import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const EventCard = ({ children, className }) => {
  return (
    <div className={classNames("bg-white rounded-lg shadow-md", className)}>
      {children}
    </div>
  );
};

EventCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default EventCard;

export const CardContent = ({ children, className }) => {
  return <div className={classNames("p-4", className)}>{children}</div>;
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

