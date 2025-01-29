export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
}

interface Origin {
    name: string,
    url: string
}

interface Location {
    name: string,
    url: string
}

export interface CharacterState {
    character: Character[];
    loading?: boolean;
    error?: string;
};

export interface InfoCharacter {
    count?: number;
    pages?: number;
    next: string;
    prev?: string;
}

export interface EpisodeCharacter {
    episode: string;
    name: string;
    air_date: string;
}