const apps = [
  { name: 'Pinterest', bg: '#E60023', icon: '📌' },
  { name: 'Spotify', bg: '#1DB954', icon: '🎵' },
  { name: 'Reddit', bg: '#FF4500', icon: '🟠' },
  { name: 'Tumblr', bg: '#36465D', icon: 't' },
  { name: 'Snapchat', bg: '#FFFC00', icon: '👻' },
  { name: 'Foursquare', bg: '#F94877', icon: '📍' },
  { name: 'Yelp', bg: '#D32323', icon: '⭐' },
  { name: 'Clubhouse', bg: '#F2E8CF', icon: '🎙️' },
  { name: 'Figma', bg: '#A259FF', icon: '🎨' },
  { name: 'Podcasts', bg: '#8B5CF6', icon: '🎧' },
  { name: 'WhatsApp', bg: '#25D366', icon: '💬' },
  { name: 'Wattpad', bg: '#FF6122', icon: 'W' },
  { name: 'LINE', bg: '#00C300', icon: '💬' },
  { name: 'Messenger', bg: '#0099FF', icon: '💬' },
  { name: 'WeChat', bg: '#07C160', icon: '😊' },
  { name: 'Mastodon', bg: '#6364FF', icon: '🐘' },
  { name: 'iTunes', bg: '#FB5BC5', icon: '🎵' },
  { name: 'SoundCloud', bg: '#FF5500', icon: '☁️' },
  { name: 'Discord', bg: '#5865F2', icon: '🎮' },
  { name: 'VK', bg: '#4C75A3', icon: 'VK' },
  { name: 'Quora', bg: '#B92B27', icon: 'Q' },
  { name: 'Patreon', bg: '#FF424D', icon: '❤️' },
  { name: 'Twitch', bg: '#9146FF', icon: '🎮' },
  { name: 'Vimeo', bg: '#1AB7EA', icon: '▶' },
  { name: 'Medium', bg: '#000000', icon: 'M' },
  { name: 'Tinder', bg: '#FE3C72', icon: '🔥' },
  { name: 'Match', bg: '#0070C0', icon: 'match' },
  { name: 'Tumblr2', bg: '#36465D', icon: 't' },
  { name: '500px', bg: '#0099E5', icon: '500' },
  { name: 'DeviantArt', bg: '#05CC47', icon: '🎨' },
  { name: 'Behance', bg: '#1769FF', icon: 'Bē' },
  { name: 'Dribbble', bg: '#EA4C89', icon: '🏀' },
  { name: 'Facebook', bg: '#1877F2', icon: 'f' },
  { name: 'LinkedIn', bg: '#0A66C2', icon: 'in' },
  { name: 'GitHub', bg: '#333333', icon: '💻' },
  { name: 'Telegram', bg: '#0088CC', icon: '✈️' },
  { name: 'Signal', bg: '#3A76F0', icon: '🔒' },
  { name: 'Substack', bg: '#FF6719', icon: '📰' },
  { name: 'Notion', bg: '#000000', icon: 'N' },
  { name: 'Flickr', bg: '#FF0084', icon: '📷' },
  { name: 'Baidu', bg: '#2529D8', icon: 'B' },
  { name: 'StarMaker', bg: '#FFD700', icon: '⭐' },
  { name: 'Xing', bg: '#006567', icon: 'X' },
  { name: 'Deezer', bg: '#FF0092', icon: '🎵' },
  { name: 'Kuaishou', bg: '#FF6F00', icon: '📹' },
  { name: 'Douyin', bg: '#000000', icon: '♪' },
  { name: 'Bilibili', bg: '#00A1D6', icon: 'B' },
  { name: 'Pixiv', bg: '#0096FA', icon: 'P' },
];

export default function AppIconGrid() {
  const perRow = 12;
  const rows = [];
  for (let i = 0; i < apps.length; i += perRow) {
    rows.push(apps.slice(i, i + perRow));
  }

  return (
    <div className="relative overflow-hidden">
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      <div
        className="flex flex-col gap-5 py-6"
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 20%',
        }}
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center gap-4 md:gap-5"
            style={{
              transform: `rotateX(${6 + rowIndex * 3}deg) translateZ(${-rowIndex * 10}px)`,
              transformOrigin: 'center top',
              opacity: 1 - rowIndex * 0.08,
            }}
          >
            {row.map((app, i) => (
              <div
                key={i}
                className="w-14 h-14 md:w-[76px] md:h-[76px] rounded-[18px] flex items-center justify-center text-xl md:text-2xl shadow-lg shrink-0 hover:scale-110 hover:shadow-xl hover:z-20 transition-[box-shadow,transform] duration-300 cursor-pointer relative overflow-hidden"
                style={{ background: app.bg }}
                title={app.name}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-[18px]" />
                <span className="relative z-10 text-white font-bold" style={{ fontSize: typeof app.icon === 'string' && app.icon.length > 2 ? '10px' : undefined }}>
                  {app.icon}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
