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
          'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzc2NzYxMjIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Guía de viaje 2026',
        icon: 'globe',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHRyYXZlbHxlbnwxfHx8fDE3NzY3NjEyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Esenciales para empacar',
        icon: 'merch',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdWdnYWdlJTIwdHJhdmVsfGVufDF8fHx8MTc3Njc2MTIyMHww&ixlib=rb-4.1.0&q=80&w=1080',
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
          'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2R8ZW58MXx8fHwxNzc2NzYxMjIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Entradas de la gira',
        icon: 'ticket',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWN8ZW58MXx8fHwxNzc2NzYxMjIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Merch oficial',
        icon: 'merch',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBhcmVsfGVufDF8fHx8MTc3Njc2MTIyMXww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Detrás de cámaras',
        icon: 'youtube',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRpbmclMjBzdHVkaW98ZW58MXx8fHwxNzc2NzYxMjIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Playlist de Spotify',
        icon: 'spotify',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBsYXllcnxlbnwxfHx8fDE3NzY3NjEyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Club de fans',
        icon: 'heart',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHBhcnR5fGVufDF8fHx8MTc3Njc2MTIyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  },
  {
    id: 'malikswift',
    name: "Malik 'Swift' Davies",
    color: '#002147',
    accentColor: '#FF8200',
    image:
      'https://images.unsplash.com/photo-1749743823062-df9d9de55e94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwYXRobGV0ZSUyMHNwb3J0JTIwYXJlbmF8ZW58MXx8fHwxNzc2NzYwOTIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
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
          'https://images.unsplash.com/photo-1546519638-68e109498ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnR8ZW58MXx8fHwxNzc2NzYxMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Zapatillas exclusivas',
        icon: 'merch',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2Vyc3xlbnwxfHx8fDE3NzY3NjEyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Fundación',
        icon: 'heart',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwa2lkc3xlbnwxfHx8fDE3NzY3NjEyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
          'https://images.unsplash.com/photo-1583531172005-814191b8b6c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwZXBpc29kZXxlbnwxfHx8fDE3NzY3NjEyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Ep 141: Hábitos',
        icon: 'podcast',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1589903308904-1010c2294adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBtaWN8ZW58MXx8fHwxNzc2NzYxMjIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Ep 140: Sueño',
        icon: 'podcast',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpbyUyMHJlY29yZGluZ3xlbnwxfHx8fDE3NzY3NjEyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Ep 139: Rutina',
        icon: 'podcast',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiY2tncm91bmQlMjBhdWRpb3xlbnwxfHx8fDE3NzY3NjEyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Boletín',
        icon: 'mail',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMG5ld3NsZXR0ZXJ8ZW58MXx8fHwxNzc2NzYxMjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Únete a Patreon',
        icon: 'patreon',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzdXBwb3J0fGVufDF8fHx8MTc3Njc2MTIyNXww&ixlib=rb-4.1.0&q=80&w=1080',
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
          'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29rYm9va3xlbnwxfHx8fDE3NzY3NjEyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Masterclass',
        icon: 'youtube',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwY29va2luZ3xlbnwxfHx8fDE3NzY3NjEyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Equipo de cocina',
        icon: 'merch',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3Njc2MTIyNnww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Recetas secretas',
        icon: 'mail',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGxhdGluZ3xlbnwxfHx8fDE3NzY3NjEyMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
          'https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzdHJlYW18ZW58MXx8fHwxNzc2NzYxMjI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Equipo de eSports',
        icon: 'gamepad',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhlc3BvcnRzfGVufDF8fHx8MTc3Njc2MTIyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Mi club',
        icon: 'globe',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1775725181800-f55689a25857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0ZWFtJTIwY2x1YiUyMHN0YWRpdW18ZW58MXx8fHwxNzc2Nzc4MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Mejores jugadas',
        icon: 'youtube',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGdvYWx8ZW58MXx8fHwxNzc2NzYxMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
          'https://images.unsplash.com/photo-1498049794561-7780e7231661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZ2VhcnxlbnwxfHx8fDE3NzY3NjEyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Armados de PC',
        icon: 'gamepad',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYyUyMGJ1aWxkfGVufDF8fHx8MTc3Njc2MTIyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Servidor de Discord',
        icon: 'discord',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNjb3JkJTJMJTIwdGVjaHxlbnwxfHx8fDE3NzY3NjEyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Patrocinios',
        icon: 'mail',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc3xlbnwxfHx8fDE3NzY3NjEyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
          'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3hpbmclMjBnbG92ZXN8ZW58MXx8fHwxNzc2NzU0MjMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Plan de entrenamiento',
        icon: 'activity',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1647482272246-cd545777ad0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNTUElMjBmaWdodGVyJTIwd29ya291dCUyMHRyYWluaW5nJTIwaW50ZW5zaXR5fGVufDF8fHx8MTc3Njc3Mjg0NHww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Patrocinios',
        icon: 'mail',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1773682614225-c9b92727ce1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBicmFuZCUyMHNwb25zb3JzaGlwJTIwZGVhbCUyMGF0aGxldGV8ZW58MXx8fHwxNzc2NzcyODQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Próxima pelea PPV',
        icon: 'ticket',
        url: '#',
        image:
          'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWdodCUyMGFyZW5hfGVufDF8fHx8MTc3Njc2MTIzMHww&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  },
];
