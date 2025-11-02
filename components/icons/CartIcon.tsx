export const CartIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      focusable="false"
      color="var(--token-1e7ae411-f286-450c-a069-e9d414f4b713, rgb(5, 168, 230))"
      style={{
        userSelect: "none",
        width: "100%",
        height: "100%",
        display: "inline-block",
        fill: "var(--token-1e7ae411-f286-450c-a069-e9d414f4b713, rgb(5, 168, 230))",
        color:
          "var(--token-1e7ae411-f286-450c-a069-e9d414f4b713, rgb(5, 168, 230))",
        flexShrink: 0,
      }}
      {...props}
    >
      <g
        color="var(--token-1e7ae411-f286-450c-a069-e9d414f4b713, rgb(5, 168, 230))"
        // weight="duotone"
      >
        <path
          d="M224,56V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z"
          opacity="0.2"
        />
        <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z" />
      </g>
    </svg>
  );
};
