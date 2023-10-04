import {
  registerDecorator,
  ValidationOptions,
  // ValidationArguments,
} from '@nestjs/class-validator';

export function IsFile(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isFile',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any /* , _: ValidationArguments*/) {
          // You can add your custom validation logic here
          // For example, check if value is of type 'File'
          return value && value.mimetype && value.size; // simple example
        },
        defaultMessage(/* args: ValidationArguments */) {
          // Create the default error message
          return 'Uploaded file is invalid!';
        },
      },
    });
  };
}
