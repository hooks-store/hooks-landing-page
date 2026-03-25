export function LinkmeIcon({ size = 32 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg text-white font-bold"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #F472B6, #FB923C)',
        fontSize: size * 0.38,
        borderRadius: size * 0.22,
      }}
    >
      me
    </div>
  );
}

export function LinkmeLogo() {
  return (
    <div className="flex items-center gap-2">
      <LinkmeIcon size={32} />
      <span className="text-white text-[22px] font-bold tracking-tight">Linkme</span>
    </div>
  );
}
