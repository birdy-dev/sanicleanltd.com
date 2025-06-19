export function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className="leading-7 text-gray-700"
      {...props}
    >
      {props.children}
    </p>
  );
}
