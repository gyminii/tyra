import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

const RouterLink = forwardRef(({ href, ...props }, ref) => (
	<Link ref={ref} to={href} {...props} />
));

export default RouterLink;
