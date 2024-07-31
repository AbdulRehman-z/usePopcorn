export function Err({ message }: { message: string }) {
  return (
    <div className="bg-red-500 text-white p-4 rounded-md">
      {message}
    </div>
  );
}

export function Loading() {
  return <div className="p-4 rounded-md text-xl">Loading...</div>;
}
