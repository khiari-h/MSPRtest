// PaginationControls.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const PaginationControls = ({ currentPage, totalPages, onNext, onPrev }) => {
  return (
    <div className="flex justify-between mt-4">
      <Button
        label="Précédent"
        onClick={onPrev}
        disabled={currentPage === 1}
      />
      <Text content={`Page ${currentPage} sur ${totalPages}`} type="span" />
      <Button
        label="Suivant"
        onClick={onNext}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default PaginationControls;
