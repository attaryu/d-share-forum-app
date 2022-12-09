import React from 'react';

import useSimpleState from '../hooks/useSimpleState';
import InputWithIcon from '../components/InputWithIcon';

export default {
  title: 'Input With Icon',
  component: InputWithIcon,
};

function Template(args) {
  const [value, formHandler] = useSimpleState('');
  const { type } = args;

  const argsManaged = {
    icon: '/asset/email.avif',
    name: type,
    placeholder: type.charAt(0).toUpperCase() + type.slice(1),
    value,
    formHandler,
    ...args,
  };

  return <InputWithIcon {...argsManaged} />;
}

const Origin = Template.bind();

Origin.args = {
  type: 'email',
  minLength: '5',
  maxLength: '10',
};

export {
  Origin,
};
