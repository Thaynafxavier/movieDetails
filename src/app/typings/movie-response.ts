export interface MovieResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface CertificationData {
  iso_3166_1: string;
  certification: string;
  release_date: string;
}

export interface ReleaseDate {
  certification: string;
  release_date: string;
  type: number;
  // Outras propriedades, caso existam
}

export interface ReleaseInfo {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ApiResponse {
  id: number;
  results: ReleaseInfo[];
}

export interface Genre {
  id: number;
  name: string;
}


export interface CreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface TranslationData {
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}

interface MovieTranslation {
  iso_639_1: string;
  data: {
    overview: string;
    // outras propriedades
  };
}

export interface MovieResponse {
  translations?: MovieTranslation[];
  // outras propriedades
}
export interface MovieTranslationsResponse {
  id: number;
  translations: Translation[];
}

export interface Translation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: TranslationData;
}

export interface TranslationData {
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}
