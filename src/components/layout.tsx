type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <main className="mt-20 h-[500px] w-full flex items-center justify-between gap-10">
      {children}
    </main>
  );
}

export default Layout;
