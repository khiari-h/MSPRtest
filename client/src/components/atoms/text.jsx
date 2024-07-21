import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ content, type, className }) => {
  const Tag = type;
  return <Tag className={className}>{content}</Tag>;
};

Text.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Text.defaultProps = {
  className: '',
};

export default Text;
