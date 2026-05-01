export interface CreatorLink {
  title: string;
  icon: string;
  url: string;
  image?: string;
}

export interface CreatorSocial {
  icon: string;
  url: string;
}

export interface Creator {
  id: string;
  name: string;
  color: string;
  accentColor: string;
  image: string;
  imagePosition?: string;
  imageScale?: number;
  imageOffsetY?: string;
  title: string;
  followers: string;
  gridStyle:
    | 'single-wide'
    | 'mixed-stack'
    | '1x2-featured'
    | 'balanced'
    | 'quad'
    | 'mixed-media'
    | 'lead-gen'
    | 'carousel';
  socials: CreatorSocial[];
  links: CreatorLink[];
}

export const CREATORS: Creator[] = [
  {
    id: 'anyajensen',
    name: 'Anya Jensen',
    color: '#007FFF',
    accentColor: '#FFFFFF',
    image: '/images/creator-profiles/anya-jensen.jpg',
    imagePosition: '55% center',
    imageScale: 1.16,
    imageOffsetY: '-5%',
    title: 'Explorando las 7 maravillas.',
    followers: '1.1M',
    gridStyle: 'single-wide',
    socials: [
      { icon: 'instagram', url: '#' },
      { icon: 'youtube', url: '#' },
      { icon: 'tiktok', url: '#' },
    ],
    links: [
      {
        title: 'Mi vlog más reciente',
        icon: 'youtube',
        url: '#',
        image:
          '/images/local-photos/photo-1476514525535-07fb3b4ae5f1-640-26b3228e.jpg',
      },
      {
        title: 'Guía de viaje 2026',
        icon: 'globe',
        url: '#',
        image:
          '/images/local-photos/photo-1507525428034-b723cf961d3e-640-f229e17b.jpg',
      },
      {
        title: 'Esenciales para empacar',
        icon: 'merch',
        url: '#',
        image:
          '/images/local-photos/photo-1551698618-1dfe5d97d256-640-4a5cf4d4.jpg',
      },
    ],
  },
  {
    id: 'quinnbrax',
    name: 'Quinn Brax',
    color: '#BF00FF',
    accentColor: '#7DF9FF',
    image: '/images/creator-profiles/quinn-brax.jpg',
    imagePosition: '50% center',
    imageScale: 1.08,
    imageOffsetY: '-4%',
    title: 'Himnos del futuro, ahora. Nuevo sencillo.',
    followers: '530K',
    gridStyle: 'mixed-stack',
    socials: [
      { icon: 'spotify', url: '#' },
      { icon: 'instagram', url: '#' },
      { icon: 'tiktok', url: '#' },
    ],
    links: [
      {
        title: 'Escucha el nuevo sencillo',
        icon: 'music',
        url: '#',
        image:
          '/images/local-photos/photo-1514525253161-7a46d19cd819-640-7319d345.jpg',
      },
      {
        title: 'Entradas de la gira',
        icon: 'ticket',
        url: '#',
        image:
          '/images/local-photos/photo-1470229722913-7c0e2dbbafd3-640-75a7a8db.jpg',
      },
      {
        title: 'Merch oficial',
        icon: 'merch',
        url: '#',
        image:
          '/images/local-photos/photo-1523381210434-271e8be1f52b-640-91671088.jpg',
      },
      {
        title: 'Detrás de cámaras',
        icon: 'youtube',
        url: '#',
        image:
          '/images/local-photos/photo-1598488035139-bdbb2231ce04-640-005d4e0a.jpg',
      },
      {
        title: 'Playlist de Spotify',
        icon: 'spotify',
        url: '#',
        image:
          '/images/local-photos/photo-1614680376573-df3480f0c6ff-640-f02ad2a6.jpg',
      },
      {
        title: 'Club de fans',
        icon: 'heart',
        url: '#',
        image:
          '/images/local-photos/photo-1501281668745-f7f57925c3b4-640-33cfe168.jpg',
      },
    ],
  },
  {
    id: 'malikswift',
    name: "Malik 'Swift' Davies",
    color: '#002147',
    accentColor: '#FF8200',
    image:
      '/images/local-photos/photo-1749743823062-df9d9de55e94-640-ac8b9464.jpg',
    title: 'Baloncesto. Negocios. Construyendo un legado.',
    followers: '4.3M',
    gridStyle: '1x2-featured',
    socials: [
      { icon: 'instagram', url: '#' },
      { icon: 'tiktok', url: '#' },
      { icon: 'youtube', url: '#' },
    ],
    links: [
      {
        title: 'Mejores jugadas',
        icon: 'youtube',
        url: '#',
        image:
          '/images/local-photos/photo-1546519638-68e109498ffc-640-6858135f.jpg',
      },
      {
        title: 'Zapatillas exclusivas',
        icon: 'merch',
        url: '#',
        image:
          '/images/local-photos/photo-1542291026-7eec264c27ff-640-ffb2ffb2.jpg',
      },
      {
        title: 'Fundación',
        icon: 'heart',
        url: '#',
        image:
          '/images/local-photos/photo-1488521787991-ed7bbaae773c-640-2f346e6a.jpg',
      },
    ],
  },
  {
    id: 'mindsetpod',
    name: 'The Mindset Podcast',
    color: '#1A1A1A',
    accentColor: '#F3E5DC',
    image: '/images/creator-profiles/mindset-podcast.jpg',
    imagePosition: '50% center',
    imageScale: 1,
    imageOffsetY: '-6%',
    title: 'Análisis profundos sobre rendimiento. Todos mis links aquí abajo.',
    followers: '100K',
    gridStyle: 'balanced',
    socials: [
      { icon: 'podcast', url: '#' },
      { icon: 'spotify', url: '#' },
      { icon: 'tiktok', url: '#' },
      { icon: 'youtube', url: '#' },
    ],
    links: [
      {
        title: 'Ep 142: Enfoque',
        icon: 'podcast',
        url: '#',
        image:
          '/images/local-photos/photo-1583531172005-814191b8b6c0-640-b1baada5.jpg',
      },
      {
        title: 'Ep 141: Hábitos',
        icon: 'podcast',
        url: '#',
        image:
          '/images/local-photos/photo-1589903308904-1010c2294adc-640-335f47f2.jpg',
      },
      {
        title: 'Ep 140: Sueño',
        icon: 'podcast',
        url: '#',
        image:
          '/images/local-photos/photo-1590602847861-f357a9332bbc-640-726894e3.jpg',
      },
      {
        title: 'Ep 139: Rutina',
        icon: 'podcast',
        url: '#',
        image:
          '/images/local-photos/photo-1478737270239-2f02b77fc618-640-75827163.jpg',
      },
      {
        title: 'Boletín',
        icon: 'mail',
        url: '#',
        image:
          '/images/local-photos/photo-1596526131083-e8c633c948d2-640-4a40c1f9.jpg',
      },
      {
        title: 'Únete a Patreon',
        icon: 'patreon',
        url: '#',
        image:
          '/images/digital-products/vip-community.png',
      },
    ],
  },
  {
    id: 'eliasthorne',
    name: 'Elias Thorne',
    color: '#E2725B',
    accentColor: '#B2AC88',
    image: '/images/creator-profiles/elias-thorne.jpg',
    imagePosition: '48% center',
    imageScale: 1.12,
    imageOffsetY: '-13%',
    title: 'Recetas gourmet y accesibles. Links aquí abajo.',
    followers: '12.4M',
    gridStyle: 'quad',
    socials: [
      { icon: 'instagram', url: '#' },
      { icon: 'tiktok', url: '#' },
      { icon: 'youtube', url: '#' },
    ],
    links: [
      {
        title: 'Nuevo libro de recetas',
        icon: 'merch',
        url: '#',
        image:
          '/images/local-photos/photo-1589156229687-496a31ad1d1f-640-bc99c4d3.jpg',
      },
      {
        title: 'Masterclass',
        icon: 'youtube',
        url: '#',
        image:
          '/images/local-photos/photo-1556910103-1c02745aae4d-640-e5e3d51f.jpg',
      },
      {
        title: 'Equipo de cocina',
        icon: 'merch',
        url: '#',
        image:
          '/images/local-photos/photo-1581622558667-3419a8dc5f83-640-d70190ad.jpg',
      },
      {
        title: 'Recetas secretas',
        icon: 'mail',
        url: '#',
        image:
          '/images/local-photos/photo-1504674900247-0877df9cc836-640-43efc7d9.jpg',
      },
    ],
  },
  {
    id: 'kunalvarez',
    name: 'Kun Alvarez',
    color: '#75AADB',
    accentColor: '#FFFFFF',
    image: '/images/creator-profiles/kun-alvarez.jpg',
    imagePosition: '67% center',
    imageScale: 1,
    imageOffsetY: '0%',
    title: 'Gamer y streamer competitivo de Valorant. Ranked, scrims y torneos aquí.',
    followers: '280K',
    gridStyle: 'mixed-media',
    socials: [
      { icon: 'instagram', url: '#' },
      { icon: 'tiktok', url: '#' },
      { icon: 'twitch', url: '#' },
    ],
    links: [
      {
        title: 'Streams en Twitch',
        icon: 'twitch',
        url: '#',
        image:
          '/images/local-photos/photo-1542751371-adc38448a05e-640-6e76632d.jpg',
      },
      {
        title: 'Equipo de eSports',
        icon: 'gamepad',
        url: '#',
        image:
          '/images/local-photos/photo-1511512578047-dfb367046420-640-abdca219.jpg',
      },
      {
        title: 'Mi club',
        icon: 'globe',
        url: '#',
        image:
          '/images/local-photos/photo-1775725181800-f55689a25857-640-bdeac775.jpg',
      },
      {
        title: 'Mejores jugadas',
        icon: 'youtube',
        url: '#',
        image:
          '/images/local-photos/photo-1553778263-73a83bab9b0c-640-c80dfab6.jpg',
      },
    ],
  },
  {
    id: 'techreviewhq',
    name: 'TechReview HQ',
    color: '#708090',
    accentColor: '#008080',
    image: '/images/creator-profiles/techreview-hq.jpg',
    imagePosition: '50% center',
    imageScale: 1,
    imageOffsetY: '-14%',
    title: 'Datos honestos. Sin sesgos. Tu correo abajo.',
    followers: '21.3M',
    gridStyle: 'lead-gen',
    socials: [
      { icon: 'youtube', url: '#' },
      { icon: 'tiktok', url: '#' },
      { icon: 'discord', url: '#' },
    ],
    links: [
      {
        title: 'Mi lista de equipo',
        icon: 'merch',
        url: '#',
        image:
          '/images/local-photos/photo-1498049794561-7780e7231661-640-bef56bf8.jpg',
      },
      {
        title: 'Armados de PC',
        icon: 'gamepad',
        url: '#',
        image:
          '/images/local-photos/photo-1587202372634-32705e3bf49c-640-382babe8.jpg',
      },
      {
        title: 'Servidor de Discord',
        icon: 'discord',
        url: '#',
        image:
          '/images/local-photos/photo-1614680376408-81e91ffe3db7-640-a589057e.jpg',
      },
      {
        title: 'Patrocinios',
        icon: 'mail',
        url: '#',
        image:
          '/images/digital-products/vip-community.png',
      },
    ],
  },
  {
    id: 'kaylaharris',
    name: 'Kayla Harris',
    color: '#36454F',
    accentColor: '#EA4335',
    image: '/images/creator-profiles/kayla-harris.jpg',
    imagePosition: '24% center',
    imageScale: 1,
    imageOffsetY: '-3%',
    title: 'Peleadora. Campeona. Leyenda. Links aquí abajo.',
    followers: '190K',
    gridStyle: 'carousel',
    socials: [
      { icon: 'instagram', url: '#' },
      { icon: 'tiktok', url: '#' },
      { icon: 'youtube', url: '#' },
    ],
    links: [
      {
        title: 'Merch del campamento',
        icon: 'merch',
        url: '#',
        image:
          '/images/local-photos/photo-1549719386-74dfcbf7dbed-640-62a2739c.jpg',
      },
      {
        title: 'Plan de entrenamiento',
        icon: 'activity',
        url: '#',
        image:
          '/images/local-photos/photo-1647482272246-cd545777ad0c-640-1a2c7fb4.jpg',
      },
      {
        title: 'Patrocinios',
        icon: 'mail',
        url: '#',
        image:
          '/images/local-photos/photo-1773682614225-c9b92727ce1a-640-bab9bd61.jpg',
      },
      {
        title: 'Próxima pelea PPV',
        icon: 'ticket',
        url: '#',
        image:
          '/images/local-photos/photo-1518459031867-a89b944bffe4-640-f4c313d0.jpg',
      },
    ],
  },
];
