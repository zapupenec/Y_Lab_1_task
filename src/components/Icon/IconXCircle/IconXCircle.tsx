import React from 'react';

interface IconXCircleProps extends React.SVGProps<SVGSVGElement> {}

export const IconXCircle: React.FC<IconXCircleProps> = ({
  className,
  stroke = '#909090',
  width = '24',
  height = '24',
  fill = 'none',
  ...props
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="x-circle">
        <path
          id="Vector"
          d="M10.9395 11.6463L8.4651 9.17181L9.172 8.46492L11.6464 10.9394L12 11.2929L12.3535 10.9394L14.828 8.46492L15.5349 9.17181L13.0604 11.6463L12.7069 11.9998L13.0604 12.3534L15.5349 14.8278L14.828 15.5347L12.3535 13.0603L12 12.7067L11.6464 13.0603L9.172 15.5347L8.4651 14.8278L10.9395 12.3534L11.2931 11.9998L10.9395 11.6463Z"
          fill={stroke}
          stroke={stroke}
        />
        <path
          id="Vector_2"
          d="M21.5 12C21.5 17.2379 17.2379 21.5 12 21.5C6.76214 21.5 2.5 17.2379 2.5 12C2.5 6.76214 6.76214 2.5 12 2.5C17.2379 2.5 21.5 6.76214 21.5 12ZM20.5 12C20.5 7.31286 16.6871 3.5 12 3.5C7.31286 3.5 3.5 7.31286 3.5 12C3.5 16.6871 7.31286 20.5 12 20.5C16.6871 20.5 20.5 16.6871 20.5 12Z"
          fill={stroke}
          stroke={stroke}
        />
      </g>
    </svg>
  );
};
