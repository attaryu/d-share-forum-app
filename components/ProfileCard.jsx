import React from 'react';
import PropTypes from 'prop-types';

function ProfileCard({ data }) {
  return (
    <div className="flex items-center">
      <img src={data.avatar} alt={`${data.name} avatar`} className="w-28 rounded-full" />
      <div className="pl-10">
        <h1 className="text-5xl font-extrabold text-zinc-900">{data.name}</h1>
        <p className="text-xl font-medium text-zinc-700 mt-2">{data.email}</p>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  data: PropTypes.objectOf(Array).isRequired,
};

export default ProfileCard;
