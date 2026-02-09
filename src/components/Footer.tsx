interface IProps {
  children: React.ReactNode;
}

function Footer({ children }: IProps) {
  return <footer>{children}</footer>;
}

export { Footer };
