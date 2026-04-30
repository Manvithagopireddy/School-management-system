interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  children?: React.ReactNode;
}

const SectionHeader = ({ title, subtitle, highlight, children }: SectionHeaderProps) => (
  <div className="flex justify-between items-end">
    <div className="flex flex-col gap-1">
      <h2 className="text-4xl font-black font-serif tracking-tight text-white">{title}</h2>
      {subtitle && (
        <p className="text-muted font-medium">
          {subtitle}{highlight && (
            <> — <span className="text-primary font-bold">{highlight}</span></>
          )}
        </p>
      )}
    </div>
    {children && <div className="flex gap-3">{children}</div>}
  </div>
);

export default SectionHeader;
