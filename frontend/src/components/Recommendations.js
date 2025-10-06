import React from 'react';
import { motion } from 'framer-motion';

const Recommendations = ({ predictions }) => {
  return (
    <div className="animated-card">
      {predictions.map(p => (
        <motion.p key={p.id} initial={{ x: -100 }} animate={{ x: 0 }}>{p.recommendation}</motion.p>
      ))}
    </div>
  );
};

export default Recommendations;