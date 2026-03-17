export default function Divider() {
    return (
      <svg width="100%" height="1" className="text-subtle-stroke block w-full">
        <line
          x1="0"
          y1="0.5"
          x2="100%"
          y2="0.5"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
    )
  }