export const metadata = {
  title: "NetProxy Studio",
  description: "Sanity Studio for NetProxy blog content management",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {children}
    </div>
  );
}
