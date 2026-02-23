interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`px-4 py-6 pb-24 max-w-[900px] mx-auto ${className}`}>
      {children}
    </div>
  );
}
