import QueryProvider from "./query-provider";
import ThemeProvider from "./theme-provider";

const Provider = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
};

export default Provider;
