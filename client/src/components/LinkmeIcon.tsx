export function LinkmeIcon({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/favicon.png"
      alt="Hooks logo"
      width={size}
      height={size}
      className="object-contain shrink-0"
    />
  );
}

export function LinkmeLogo() {
  return (
    <div className="flex items-center gap-2">
      <LinkmeIcon size={32} />
      <span className="text-white text-[22px] font-bold tracking-tight">Hooks</span>
    </div>
  );
}
