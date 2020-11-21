// RULES
interface Rule {
  type: 'required' | 'length';
}

// REQUIRE RULE
interface Require extends Rule {
  type: 'required';
}

export function required(): Require {
  return {
    type: 'required',
  };
}

// LENGTH RULE
interface MinMaxOptions {
  min: number;
  max: number;
}

interface Length extends Rule {
  type: 'length';
  options: MinMaxOptions;
}

export function length(options: MinMaxOptions): Length {
  return {
    type: 'length',
    options,
  };
}

type Validator = Require | Length;

export interface Status {
  valid: boolean;
  message?: string;
}

//VALIDATE FUNCTION
export function validate(value: string, validators: Validator[]): Status {
  let status: Status = {
    valid: true,
  };

  validators.forEach((validator) => {
    if (validator.type === 'required' && (!value || !value.length)) {
      status = {
        valid: false,
        message: 'This field is required',
      };
    }

    if (
      validator.type === 'length' &&
      (value.length < validator.options.min ||
        value.length > validator.options.max)
    ) {
      status = {
        valid: false,
        message: `This field has a minimum length of ${validator.options.min} and a maximum length of ${validator.options.max}`,
      };
    }
  });

  return status;
}
