export interface Image {
    id: number;
    title: string;
    price: number;
    author: string;
    created_at: string; // Podría ser Date si lo manejas como fecha
    main_attachment: {
      big: string;
      small: string;
    };
    likes_count: number;
    liked: boolean;
    links: {
      rel: string;
      uri: string;
      methods: string;
    }[];
  }